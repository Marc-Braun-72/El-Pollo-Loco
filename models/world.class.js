/**
 * Represents the game world, containing the character, levels, status bars, and all interactable objects.
 */
class World {
    /**
     * The main character in the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * The current level in the game.
     * @type {Level}
     */
    level = level1;

    /**
     * The canvas element for rendering the game.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input object for controlling the character.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The camera's x-coordinate, used to control the visible area of the game.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The player's health status bar.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * The player's bottle count status bar.
     * @type {StatusBarBottles}
     */
    statusBarBottles = new StatusBarBottles();

    /**
     * The player's coin count status bar.
     * @type {StatusBarCoins}
     */
    statusBarCoins = new StatusBarCoins();

    /**
     * The end boss's health status bar.
     * @type {StatusBarEndboss}
     */
    statusBarEndboss = new StatusBarEndboss();

    /**
     * Array of throwable objects in the game.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Array of coin objects in the game.
     * @type {Coin[]}
     */
    coins = [];

    /**
     * Array of bottle objects in the game.
     * @type {Bottle[]}
     */
    bottles = [];

    /**
     * The player's current score.
     * @type {number}
     */
    score = 0;

    /**
     * The sound effect for when the character takes damage.
     * @type {Audio}
     */
    damageSound = new Audio('audio/damage.mp3');

    /**
     * Initializes a new World instance, setting up the canvas, keyboard, and game objects.
     * @param {HTMLCanvasElement} canvas - The canvas on which to render the game.
     * @param {Keyboard} keyboard - The keyboard input for controlling the character.
     */
    constructor(canvas, keyboard) {
        this.initializeCanvas(canvas);
        this.keyboard = keyboard;
        this.lastThrowTime = 0;
        this.throwCooldown = 500;
        this.endbossAlerted = false;

        this.initializeGameObjects();
        this.initializeImages();
        this.initializeWorld();
        this.addObjectsToMap(this.coins);
    }

    /**
     * Sets up the canvas and its rendering context.
     * @param {HTMLCanvasElement} canvas - The canvas on which to render the game.
     */
    initializeCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    /**
     * Initializes all game objects like coins, bottles, and status bars.
     */
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

    /**
     * Loads and initializes images for the game world.
     */
    initializeImages() {
        this.gameOverImage = this.loadImage('images/9_intro_outro_screens/game_over/game over.png');
        this.winImage = this.loadImage('images/9_intro_outro_screens/win/win_2.png');
    }

    /**
     * Initializes the world by assigning the world context to the character and enemies.
     */
    initializeWorld() {
        this.setWorld();
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
                enemy.energy = enemy.INITIAL_ENERGY || 100;  
            }
        });
    }

    /**
     * Starts the game by running the main loop and drawing the world.
     */
    start() {
        this.run();
        this.draw();
    }

    /**
     * Loads an image and optionally calls a callback when the image is loaded.
     * @param {string} src - The source path of the image.
     * @param {function} [onload] - Optional callback to execute when the image is loaded.
     * @returns {HTMLImageElement} The loaded image.
     */
    loadImage(src, onload = null) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            this[`${src.split('/').pop().split('.')[0]}Loaded`] = true;
            if (onload) onload();
        };
        return img;
    }

    /**
     * Assigns the world context to all enemies in the level.
     */
    assignWorldToEnemies() {
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.world = this;
                }
            });
        }
    }

    /**
     * Stops the game by clearing the main game loop and stopping all character animations.
     */
    stop() {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId); 
            this.gameLoopId = null;  
        }
        this.character.stopAllAnimations();
    }

    /**
     * Stops the animation frame loop for the game.
     */
    stopAnimationLoop() {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
    }
    
    /**
     * Stops all animations for the character, enemies, bottles, and coins.
     */
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

    /**
     * Sets the world context for the main character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Checks if the end boss should be alerted based on the character's position.
     * Alerts the end boss and changes its behavior if necessary.
     */
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

    /**
     * Runs the main game loop, checking for collisions, object throws, coin pickups, bottle pickups, and the game state.
     * Executes at a rate of 60 frames per second.
     */
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

    /**
     * Checks the game state to determine if the game is over or won.
     * Ends the game if the character's energy reaches zero or if the end boss's energy reaches zero.
     */
    checkGameState() {
        if (this.isGameOver || this.throwableObjects.some(bottle => bottle.isSplashing)) return;

        if (this.character.energy <= 0) {
            this.gameOver('Game Over - Du hast verloren!', false);
        } else if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy <= 0)) {
            this.gameOver('Gratulation! Du hast gewonnen!', true);
        }
    }

    /**
     * Checks if any thrown bottles collide with enemies, particularly the end boss.
     * If a collision occurs, the bottle splashes and damages the end boss.
     */
    checkBottleHits() {
        const bottlesToRemove = [];
        
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            
            for (const enemy of this.level.enemies) {
                if (enemy instanceof Endboss && this.isColliding(bottle, enemy)) {
                    enemy.hit();
                    bottle.splash(); 
                    bottlesToRemove.push(bottle); 
                    
                    this.updateEndbossStatusBar();
                    
                    if (!isMuted) { 
                        let damageSound = new Audio('audio/ouch.mp3');
                        damageSound.volume = 0.9;
                        damageSound.play();
                    }
                    break;
                }
            }
        }

        this.throwableObjects = this.throwableObjects.filter(bottle => !bottlesToRemove.includes(bottle));
    }

    /**
     * Checks if the character collides with bottles in the level, picking them up if so.
     * Increases the bottle count and updates the status bar if a bottle is collected.
     */
    checkBottlePickup() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1);
                this.statusBarBottles.addBottle();
                
                if (!isMuted) { 
                    let bottleSound = new Audio('audio/bottle.mp3');
                    bottleSound.play();
                }
            }
        });
    }
    
    /**
     * Updates the end boss status bar based on the end boss's current energy.
     */
    updateEndbossStatusBar() {
        if (this.level.enemies.some(enemy => enemy instanceof Endboss)) {
            const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            const percentage = (endboss.energy / endboss.INITIAL_ENERGY) * 100;
            this.statusBarEndboss.setPercentage(percentage);
        }
    }

    /**
     * Creates an array of coin objects for the level.
     * @returns {Coins[]} Array of coin objects.
     */
    createCoins() {
        let coins = [];
        for (let i = 0; i < 10; i++) { 
            let coin = new Coins(); 
            coins.push(coin);
        }
        return coins;
    }

    /**
     * Creates an array of bottle objects for the level.
     * @returns {Bottles[]} Array of bottle objects.
     */
    createBottles() {
        let bottles = []; 
        for (let i = 0; i < 5; i++) { 
            let bottle = new Bottles(); 
            bottles.push(bottle); 
        }
        return bottles;
    }
    
    /**
     * Creates a pool of reusable game objects.
     * @param {Function} ObjectClass - The class of the objects to create in the pool.
     * @param {number} count - The number of objects to create in the pool.
     * @returns {Object[]} Array of pooled objects.
     */
    createObjectPool(ObjectClass, count) {
        const pool = [];
        for (let i = 0; i < count; i++) {
            const obj = new ObjectClass();
            obj.active = false;
            pool.push(obj);
        }
        return pool;
    }
    
    /**
     * Retrieves an inactive object from the object pool.
     * @param {Object[]} pool - The pool of objects to retrieve from.
     * @returns {Object} The first inactive object in the pool.
     */
    getObjectFromPool(pool) {
        return pool.find(obj => !obj.active);
    }
    
    /**
     * Returns an object to the pool, marking it as inactive and resetting its properties.
     * @param {Object} obj - The object to return to the pool.
     */
    returnObjectToPool(obj) {
        obj.active = false;
        obj.reset();
    }
    
    /**
     * Checks if the player has thrown a bottle and if the throw cooldown has passed.
     * If a bottle is thrown, it is added to the throwableObjects array and the bottle count is decreased.
     */
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

    /**
     * Checks for collisions between the character and enemies.
     * Handles enemy deaths, damage to the character, and updates the status bar.
     */
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
                if (enemy instanceof Endboss && typeof bottle.isColliding === "function" && bottle.isColliding(enemy)) {  
                    enemy.hit();
                    this.throwableObjects.splice(bottleIndex, 1);
    
                    if (enemy.isDead()) {
                        this.character.gameOver('Win', true);
                    }
                }
            });
        });
    }
    
    /**
     * Plays the sound for a chicken's death if sound is not muted.
     */
    playChickenDeathSound() {
        if (!isMuted) { 
            let chickenDeathSound = new Audio('audio/chickenDeathSound.mp3');
            chickenDeathSound.play();
            chickenDeathSound.loop = false;
            chickenDeathSound.volume = 0.3;
        }
    }

    /**
     * Checks if two objects are colliding based on their coordinates and dimensions.
     * @param {Object} obj1 - The first object to check.
     * @param {Object} obj2 - The second object to check.
     * @returns {boolean} True if obj1 and obj2 are colliding, false otherwise.
     */
    isColliding(obj1, obj2) {
        return (
            obj1.x + obj1.width > obj2.x &&
            obj1.y + obj1.height > obj2.y &&
            obj1.x < obj2.x + obj2.width &&
            obj1.y < obj2.y + obj2.height
        );
    }

    /**
     * Stops the main game loop by clearing its interval.
     */
    stopGameLoop() {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    /**
     * Updates the game state and checks for collisions, object throws, and end boss alert.
     * Handles animations, draws the game frame, and calls end screens if game is over.
     */
    update() {
        if (this.isGameOver) {
            this.stopGameLoop();
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
    
    /**
     * Updates animations for a set of objects based on the provided image key.
     * @param {Object[]} objects - Array of game objects.
     * @param {string} imagesKey - Key for the images to animate.
     */
    updateAnimations(objects, imagesKey) {
        objects.forEach(obj => {
            if (obj.active) {
                obj.playAnimation(obj[imagesKey]);
            }
        });
    }
    
    /**
     * Updates the end boss's animation based on its current state.
     */
    updateEndbossAnimation() {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.playAnimation(endboss.getCurrentAnimationImages());
        }
    }

    /**
     * Ends the game with a win or loss message, stops animations, and displays the game over screen.
     * @param {string} message - The message to display on game over.
     * @param {boolean} isWin - Whether the game ended in a win.
     */
    gameOver(message = 'Spiel ist vorbei!', isWin = false) {
        if (this.isGameOver) return;
        this.isGameOver = true;
        this.isWin = isWin;
        this.stopAnimationLoop();
        setTimeout(() => {
            this.draw();
            this.stopAllAnimations();
        }, 50);
    }

    /**
     * Draws the entire game frame, including background objects, characters, items, and status bars.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
    
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    
        this.throwableObjects.forEach(obj => {
            if (obj.isSplashing) {
                this.ctx.drawImage(obj.img, obj.x - this.camera_x, obj.y, obj.width, obj.height);
            } else {
                this.addToMap(obj);
            }
        });

        this.ctx.restore();
    
        this.coins.forEach((coin) => {
            this.ctx.save();
            this.ctx.translate(coin.x - this.camera_x, coin.y);  
            coin.drawImage(this.ctx);
            this.ctx.restore();
        });
    
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
    
        if (this.isGameOver) {
            this.isWin ? this.drawWinScreen() : this.drawGameOverScreen();
        } else {
            requestAnimationFrame(() => this.draw());
        }
    }

    /**
     * Draws the game over screen with a transparent overlay and a centered image.
     */
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
    
    /**
     * Draws the win screen with a transparent overlay and a centered image.
     */
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

    /**
     * Checks for collisions between the character and coins, adding to the score if collected.
     */
    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.score += 10;
                this.statusBarCoins.addCoin();
                if (!isMuted) {
                    let coinSound = new Audio('audio/coin.mp3');
                    coinSound.play();
                }
            }
        });
    }
    
    /**
     * Adds an array of objects to the map by drawing them.
     * @param {Object[]} objects - Array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map, flipping it if it faces the opposite direction.
     * @param {Object} mo - The moveable object to add to the map.
     */
    addToMap(mo) { 
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawImage(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Stops all active intervals in the game, including character animations.
     */
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
    
    /**
     * Flips an image horizontally.
     * @param {Object} mo - The moveable object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image back to its original orientation.
     * @param {Object} mo - The moveable object whose image to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
