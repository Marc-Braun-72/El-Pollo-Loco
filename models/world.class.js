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
 
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coins = this.createCoins();
        this.bottles = this.createBottles();
        this.statusBarBottles = new StatusBarBottles();
        this.draw();
        this.setWorld();
        this.run();
        this.gameOverImage = new Image();
        this.gameOverImage.src = 'images/9_intro_outro_screens/game_over/game over.png';
        this.gameOverImage.onload = () => {
            console.log('Game over image loaded successfully');
            this.gameOverImageLoaded = true;
        };
        this.gameOverImage.onerror = (e) => {
            console.error('Error loading game over image:', e);
        };
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions(); 
        }, 200);
    }

    createCoins() {
        let coins = [];
        for (let i = 0; i < 10; i++) { 
            let coin = new Coins(); 
            coins.push(coin);
        }
        return coins;
    }

    createBottles() {
        let bottles = []; 
        for (let i = 0; i < 5; i++) { 
            let bottle = new Bottles(); 
            bottles.push(bottle); 
        }
        return bottles;
    }
    
    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.bottleCount > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.bottleCount--;
            this.statusBarBottles.setPercentage(this.statusBarBottles.bottleCount * 20);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision with Charakter, energy ', this.character.energy);
            }
        });
    }    

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1); 
                this.statusBarBottles.addBottle(); 
            }
        });
    }

    update() {
        console.log('Updating game state, isGameOver:', this.isGameOver);
        if (this.isGameOver) {
            console.log('Game is over, drawing game over screen.');
            this.drawGameOverScreen();
            this.stopGameLoop();
        } else {

            if (Array.isArray(this.bottles)) {
                this.bottles.forEach(bottle => {
                    bottle.playAnimation(bottle.IMAGES_BOTTLES);
                });
            }
            if (Array.isArray(this.coins)) {
                this.coins.forEach(coin => {
                    coin.playAnimation(coin.IMAGES_COINS);
                });
            }
        }
    }

    draw() {
        if (this.isGameOver) {
            this.drawGameOverScreen();
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        
        if (this.coins) {
            this.coins.forEach(coin => {
                coin.drawImage(this.ctx);
            });
        }

        this.addObjectsToMap(this.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);        
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });   
    }

    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1); 
                this.score += 10;
                this.statusBarCoins.addCoin(); 
                console.log('Coin collected! Current score:', this.score);
            }
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { // mo: moveable object
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawImage(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    gameOver() {
        console.log('Game over triggered in World');
        this.isGameOver = true;
        this.character.stopAllAnimations();
        this.stopAllIntervals();
        this.drawGameOverScreen();
    }
    
    drawGameOverScreen() {
        console.log('Drawing game over screen');
        if (!this.ctx) {
            console.error('Canvas context not found');
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.gameOverImageLoaded) {
            this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
            console.log('Game over image drawn');
        } else {
            console.error("Game over image not loaded, using fallback");
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    stopAllIntervals() {
        clearInterval(this.gameLoopId);
        
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
