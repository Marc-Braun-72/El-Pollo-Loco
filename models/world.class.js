class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    coins = [];
    bottles = [];
    score = 0;
    damageSound = new Audio('audio/damage.mp3');

    constructor(canvas, keyboard) {
        this.initializeCanvas(canvas);
        this.keyboard = keyboard;
        this.lastThrowTime = 0;
        this.throwCooldown = 500;
        this.endbossAlerted = false;
    
        this.initializeGameObjects();
        this.initializeImages();
        this.initializeWorld();
    }
    
    initializeCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    
    initializeGameObjects() {
        this.coins = this.createCoins();
        this.bottles = this.createBottles();
        this.statusBarBottles = new StatusBarBottles();
        this.statusBarCoins = new StatusBarCoins();
        this.statusBarEndboss = new StatusBarEndboss();
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }
    
    initializeImages() {
        this.gameOverImage = this.loadImage('images/9_intro_outro_screens/game_over/game over.png');
        this.winImage = this.loadImage('images/9_intro_outro_screens/win/win_2.png');
    }
    
    initializeWorld() {
        this.setWorld();
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
                enemy.energy = enemy.INITIAL_ENERGY || 100;  
            }
        });
    }
    
    start() {
        this.run();
        this.draw();
    }
    
    loadImage(src, onload = null) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            this[`${src.split('/').pop().split('.')[0]}Loaded`] = true;
            if (onload) onload();
        };
        return img;
    }

    assignWorldToEnemies() {
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.world = this;
                }
            });
        }
    }
    
    stop() {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId); 
            this.gameLoopId = null;  
        }
        this.character.stopAllAnimations();
    }

    stopAnimationLoop() {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
    }
    
    stopAllAnimations() {
        this.stopAnimationLoop();
        if (this.character && typeof this.character.stopAllAnimations === 'function') {
            this.character.stopAllAnimations();
        }
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof MoveableObject && typeof enemy.stopAnimation === 'function') {
                enemy.stopAnimation();
            }
        });
        if (Array.isArray(this.bottles)) {
            this.bottles.forEach(bottle => {
                if (typeof bottle.stopAnimation === 'function') {
                    bottle.stopAnimation();
                }
            });
        }
        if (Array.isArray(this.coins)) {
            this.coins.forEach(coin => {
                if (typeof coin.stopAnimation === 'function') {
                    coin.stopAnimation();
                }
            });
        }
        this.throwableObjects.forEach(obj => {
            if (obj instanceof ThrowableObject) {
                obj.stopAllIntervals();
            }
        });
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    setWorld() {
        this.character.world = this;
    }

    checkEndbossAlert() {
        if (this.character.x > 500 && !this.endbossAlerted) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.world = this; 
                    enemy.becomeAlert();
                }
            });
            this.endbossAlerted = true;
        }
    }
    
    run() {
        this.gameLoopId = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottlePickup();
            this.checkBottleHits();
            this.checkEndbossAlert();
            this.checkGameState();
        }, 1000 / 60);
    }
     
    checkGameState() {
        if (this.isGameOver) return;
        if (this.character.energy <= 0) {
            this.gameOver('Game Over - Du hast verloren!', false);
        } else if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy <= 0)) {
            this.gameOver('Gratulation! Du hast gewonnen!', true);
        }
    }
    
    checkBottleHits() {
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            const bottle = this.throwableObjects[i];
            for (const enemy of this.level.enemies) {
                if (enemy instanceof Endboss && this.isColliding(bottle, enemy)) {
                    enemy.hit();
                    bottle.splash();
                    this.throwableObjects.splice(i, 1);
                    this.updateEndbossStatusBar();
                    
                    let damageSound = new Audio('audio/alarm.mp3');
                    damageSound.volume = 0.9;
                    damageSound.play();
                    break;
                }
            }
        }
    }

    checkBottlePickup() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1);
                this.statusBarBottles.addBottle();
                
                let bottleSound = new Audio('audio/bottle.mp3');
                bottleSound.play();
            }
        });
    }
    
    updateEndbossStatusBar() {
        if (this.level.enemies.some(enemy => enemy instanceof Endboss)) {
            const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            const percentage = (endboss.energy / endboss.INITIAL_ENERGY) * 100;
            this.statusBarEndboss.setPercentage(percentage);
        }
    }

    createCoins() {
        return this.createObjectPool(Coins, 10);
    }
    
    createBottles() {
        return this.createObjectPool(Bottles, 5);
    }
    
    createObjectPool(ObjectClass, count) {
        const pool = [];
        for (let i = 0; i < count; i++) {
            const obj = new ObjectClass();
            obj.active = false;
            pool.push(obj);
        }
        return pool;
    }
    
    getObjectFromPool(pool) {
        return pool.find(obj => !obj.active);
    }
    
    returnObjectToPool(obj) {
        obj.active = false;
        obj.reset();
    }
    
    checkThrowObjects() {
        const currentTime = new Date().getTime();
        if (this.keyboard.D && 
            this.statusBarBottles.bottleCount > 0 && 
            currentTime - this.lastThrowTime > this.throwCooldown) {
            
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.bottleCount--;
            this.statusBarBottles.setPercentage(this.statusBarBottles.bottleCount * 20);
            
            this.lastThrowTime = currentTime;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Chicken && !enemy.isDying) {
                if (this.character.isFallingOn(enemy)) {
                    enemy.die();
                    this.playChickenDeathSound();
                    this.character.bounce();
                    setTimeout(() => {
                        const chickenIndex = this.level.enemies.findIndex(e => e === enemy);
                        if (chickenIndex !== -1) {
                            this.level.enemies.splice(chickenIndex, 1);
                        }
                    }, 200);
                } else if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            } else if (enemy instanceof Endboss && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.throwableObjects.splice(bottleIndex, 1);
                    
                    if (enemy.isDead()) {
                        this.character.gameOver('Win', true);
                    }
                }
            });
        });
    }
    
    playChickenDeathSound() {
        let chickenDeathSound = new Audio('audio/chickenDeathSound.mp3');
        chickenDeathSound.play();
        chickenDeathSound.loop = false;
        chickenDeathSound.volume = 0.3;
    }

    isColliding(obj1, obj2) {
        return (
            obj1.x + obj1.width > obj2.x &&
            obj1.y + obj1.height > obj2.y &&
            obj1.x < obj2.x + obj2.width &&
            obj1.y < obj2.y + obj2.height
        );
    }

    stopGameLoop() {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    update() {
        if (this.isGameOver) {
            this.stopGameLoop();
            return;
        }
    
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkCoinCollisions();
        this.checkBottlePickup();
        this.checkBottleHits();
        this.checkEndbossAlert();
        this.checkGameState();
    
        this.updateAnimations(this.bottles, 'IMAGES_BOTTLES');
        this.updateAnimations(this.coins, 'IMAGES_COINS');
        this.updateEndbossAnimation();
    
        this.draw();
    }
    
    updateAnimations(objects, imagesKey) {
        objects.forEach(obj => {
            if (obj.active) {
                obj.playAnimation(obj[imagesKey]);
            }
        });
    }
    
    updateEndbossAnimation() {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.playAnimation(endboss.getCurrentAnimationImages());
        }
    }

    gameOver(message = 'Spiel ist vorbei!', isWin = false) {
        if (this.isGameOver) return;
        this.isGameOver = true;
        this.isWin = isWin;
        this.stopAnimationLoop();
        setTimeout(() => {
          this.draw();
          this.stopAllAnimations();
          document.getElementById('restartButton').style.display = 'block';
        }, 50);
      }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
    
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    
        this.ctx.restore();
    
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
    
        if (this.coins) {
            this.coins.forEach(coin => coin.drawImage(this.ctx));
        }
    
        if (this.isGameOver) {
            this.isWin ? this.drawWinScreen() : this.drawGameOverScreen();
        } else {
            requestAnimationFrame(() => this.draw());
        }
    }

    drawGameOverScreen() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const imgWidth = canvas.width * 0.6;  
        const imgHeight = canvas.height * 0.4;  
        const imgX = (canvas.width - imgWidth) / 2;
        const imgY = (canvas.height - imgHeight) / 2;
        
        ctx.globalAlpha = 0.8;  
        ctx.drawImage(this.gameOverImage, imgX, imgY, imgWidth, imgHeight);
        ctx.globalAlpha = 1.0;  
    }
    
    drawWinScreen() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const imgWidth = canvas.width * 0.6; 
        const imgHeight = canvas.height * 0.4; 
        const imgX = (canvas.width - imgWidth) / 2;
        const imgY = (canvas.height - imgHeight) / 2;
        
        ctx.globalAlpha = 0.8; 
        ctx.drawImage(this.winImage, imgX, imgY, imgWidth, imgHeight);
        ctx.globalAlpha = 1.0; 
    }

    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.score += 10;
                this.statusBarCoins.addCoin();
                
                let coinSound = new Audio('audio/coin.mp3');
                coinSound.play();
            }
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { 
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawImage(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
 
    stopAllIntervals() {
        clearInterval(this.gameLoopId);
        this.character.stopAllAnimations();
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof MoveableObject) {
                enemy.stopAllIntervals();
            }
        });
        this.bottles.forEach(bottle => {
            bottle.stopAnimation();
        });
        this.coins.forEach(coin => {
            coin.stopAnimation();
        });
    }
    
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
