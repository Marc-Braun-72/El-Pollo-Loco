/**
 * Represents the main character in the game with various animations and states.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Character extends MoveableObject {

    /**
     * Height of the character.
     * @type {number}
     */
    height = 250;

    /**
     * Width of the character.
     * @type {number}
     */
    width = 125;

    /**
     * Vertical position of the character on the canvas.
     * @type {number}
     */
    y = 180;

    /**
     * Movement speed of the character.
     * @type {number}
     */
    speed = 10;

    /**
     * Array of image paths for the idle animation sequence.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'images/2_character_pepe/1_idle/idle/I-1.png',
        'images/2_character_pepe/1_idle/idle/I-2.png',
        'images/2_character_pepe/1_idle/idle/I-3.png',
        'images/2_character_pepe/1_idle/idle/I-4.png',
        'images/2_character_pepe/1_idle/idle/I-5.png',
        'images/2_character_pepe/1_idle/idle/I-6.png',
        'images/2_character_pepe/1_idle/idle/I-7.png',
        'images/2_character_pepe/1_idle/idle/I-8.png',
        'images/2_character_pepe/1_idle/idle/I-9.png',
        'images/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of image paths for the long idle animation sequence.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'images/2_character_pepe/1_idle/long_idle/I-11.png',
        'images/2_character_pepe/1_idle/long_idle/I-12.png',
        'images/2_character_pepe/1_idle/long_idle/I-13.png',
        'images/2_character_pepe/1_idle/long_idle/I-14.png',
        'images/2_character_pepe/1_idle/long_idle/I-15.png',
        'images/2_character_pepe/1_idle/long_idle/I-16.png',
        'images/2_character_pepe/1_idle/long_idle/I-17.png',
        'images/2_character_pepe/1_idle/long_idle/I-18.png',
        'images/2_character_pepe/1_idle/long_idle/I-19.png',
        'images/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Array of image paths for the walking animation sequence.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'images/2_character_pepe/2_walk/W-21.png',
        'images/2_character_pepe/2_walk/W-22.png',
        'images/2_character_pepe/2_walk/W-23.png',
        'images/2_character_pepe/2_walk/W-24.png',
        'images/2_character_pepe/2_walk/W-25.png',
        'images/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for the jumping animation sequence.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'images/2_character_pepe/3_jump/J-31.png',
        'images/2_character_pepe/3_jump/J-32.png',
        'images/2_character_pepe/3_jump/J-33.png',
        'images/2_character_pepe/3_jump/J-34.png',
        'images/2_character_pepe/3_jump/J-35.png',
        'images/2_character_pepe/3_jump/J-36.png',
        'images/2_character_pepe/3_jump/J-37.png',
        'images/2_character_pepe/3_jump/J-38.png',
        'images/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths for the death animation sequence.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'images/2_character_pepe/5_dead/D-51.png',
        'images/2_character_pepe/5_dead/D-52.png',
        'images/2_character_pepe/5_dead/D-53.png',
        'images/2_character_pepe/5_dead/D-54.png',
        'images/2_character_pepe/5_dead/D-55.png',
        'images/2_character_pepe/5_dead/D-56.png',
        'images/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of image paths for the hurt animation sequence.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'images/2_character_pepe/4_hurt/H-41.png',
        'images/2_character_pepe/4_hurt/H-42.png',
        'images/2_character_pepe/4_hurt/H-43.png'
    ];


    /**
     * Reference to the game world, allowing the character to interact with other objects.
     * @type {World}
     */
    world;

    /**
     * Audio for the walking sound effect.
     * @type {Audio}
     */
    walking_sound = new Audio('./audio/running.mp3'); 

    /**
     * Audio for the jump sound effect.
     * @type {Audio}
     */
    jump_sound = new Audio('./audio/jump_short.mp3');

    /**
     * Indicates whether the character is currently jumping.
     * @type {boolean}
     */
    isJumping = false;

    /**
     * The original vertical position of the character, used for resetting position and jumping calculations.
     * @type {number}
     */
    originalY = this.y;

    /**
     * The current vertical speed of the character, used in jumping and falling calculations.
     * @type {number}
     */
    speedY = 0;

    /**
     * The gravitational acceleration applied to the character.
     * @type {number}
     */
    accelleration = 2.5;

    /**
     * The character's energy level, reducing upon taking damage.
     * Drops to zero when the character dies.
     * @type {number}
     */
    energy = 100;

    /**
     * Indicates if the game has ended for the character.
     * @type {boolean}
     */
    isGameOver = false;

    /**
     * The force applied to the character when jumping.
     * @type {number}
     */
    jumpForce = -20;

    /**
     * The gravitational pull acting on the character to bring it back to the ground.
     * @type {number}
     */
    gravity = 1;

    /**
     * Indicates if the character is currently in a bouncing state.
     * Used to manage the bounce effect after jumping on enemies.
     * @type {boolean}
     */
    isBouncing = false;

    /**
     * Determines if the character can bounce again, with a cooldown after each bounce.
     * @type {boolean}
     */
    canBounce = true;

    /**
     * Creates an instance of the character, loading images and initializing properties.
     * Sets up the character's position, sounds, animations, and image references.
     */
    constructor() {
        super().loadImage('./images/2_character_pepe/2_walk/W-21.png');
        this.offset = {
            top: 20,
            bottom: 10,
            left: 15,
            right: 15
        };
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        // Load game over and win images
        this.gameOverImage = new Image();
        this.gameOverImage.src = 'images/9_intro_outro_screens/game_over/game over.png';
        this.winImage = new Image();
        this.winImage.src = 'images/9_intro_outro_screens/win/win_2.png';

        this.gameOverImage.onload = () => {
            this.gameOverImageLoaded = true;
        };
        this.winImage.onload = () => {
            this.winImageLoaded = true;
        };

        this.applyGravity();
        this.energy = 100; 
        this.currentImage = 0;
        this.isGameOver = false;
        this.isHurt = false; 
        this.gameLoopId = null; 
        this.animationIntervals = [];
        this.animate();
        this.inactivityTime = 0;
        this.startGameLoop();
        this.bottles = [];
        this.coins = [];
    }


    /**
     * Resets the character's position, energy, and animations to initial values.
     * Useful for restarting the character's state after a game reset.
     */
    resetCharacter() {
        this.x = 100;  
        this.y = 180;  
        this.energy = 100;  
        this.inactivityTime = 0; 
        this.isJumping = false;  
        this.lastHit = 0;  
        this.currentImage = 0;  
        this.loadImage(this.IMAGES_IDLE[0]); 
    }

    /**
     * Checks if the character is colliding with another moveable object.
     * @param {MoveableObject} mo - The moveable object to check for collision.
     * @returns {boolean} True if the character is colliding with the object, false otherwise.
     */
    isColliding(mo) {
        if (!mo.offset) mo.offset = { top: 0, bottom: 0, left: 0, right: 0 };  
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
    /**
     * Starts the main game loop for the character, updating its state at 60 frames per second.
     */
    startGameLoop() {
        this.gameLoopId = setInterval(() => {
            this.update();
        }, 1000 / 60); 
    }

    /**
     * Stops the main game loop for the character by clearing the interval.
     */
    stopGameLoop() {
        if (this.gameLoopId !== null) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    /**
     * Updates the character's state. Typically overridden by subclass implementations.
     */
    update() {
    }

    /**
     * Updates the character's animation based on its current state.
     * Typically handles transitions between animations (e.g., walking, jumping).
     */
    updateAnimation() {
    }

    /**
     * Checks for collisions between the character and enemies in the level.
     * Applies actions based on the collision type (e.g., bouncing off enemies or taking damage).
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.isColliding(enemy)) {
                if (this.isFallingOn(enemy)) {
                    enemy.hit();
                    this.bounce();
                } else {
                    this.hit();
                }
            }
        });
    }

    /**
     * Determines if the character is falling onto another moveable object from above.
     * @param {MoveableObject} mo - The object to check for falling onto.
     * @returns {boolean} True if the character is falling onto the object, false otherwise.
     */
    isFallingOn(mo) {
        return this.speedY > 0 &&  
               this.y + this.height - this.offset.bottom < mo.y + mo.offset.top &&  
               this.y + this.height > mo.y &&  
               this.x + this.width > mo.x + mo.offset.left && 
               this.x < mo.x + mo.width - mo.offset.right;
    }


    /**
     * Causes the character to bounce upward after landing on an enemy.
     * Temporarily disables further bounces to prevent repeated bouncing.
     */
    bounce() {
        if (this.canBounce) {
            this.speedY = -15;
            this.isJumping = true;
            this.canBounce = false;
            setTimeout(() => {
                this.canBounce = true;
            }, 1000); 
        }
    }

    /**
     * Reduces the character's energy by a fixed amount when hit.
     * Sets the character to a hurt state temporarily, and triggers death if energy reaches zero.
     */
    hit() {
        this.energy -= 2; 
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        } else {
            this.isHurt = true;  
            setTimeout(() => {
                this.isHurt = false; 
            }, 1000);  
        }
    }
    
    /**
     * Checks if the character is dead by evaluating if the energy has dropped to zero.
     * @returns {boolean} True if the character's energy is zero, indicating death.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Initiates the character's death sequence, preventing repeated death triggers.
     * Calls the death animation and flags the character as dead.
     */
    die() {
        if (this.alreadyDead) return;
        this.alreadyDead = true;
        this.playDeathAnimation();
    }
    
    /**
     * Plays the death animation for the character by cycling through death frames.
     * Ends the game when the animation completes, triggering the game over screen.
     */
    playDeathAnimation() {
        let currentFrame = 0;
        const deathAnimationInterval = setInterval(() => {
            if (currentFrame < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[currentFrame]];
                currentFrame++;
            } else {
                clearInterval(deathAnimationInterval);
                if (this.world && !this.world.isGameOver) {
                    this.world.gameOver('Game Over', false);
                }
            }
        }, 200);
    }

    /**
     * Ends the game and displays the game over or win screen.
     * Stops all animations and the game loop after a delay.
     * @param {string} [message='Spiel ist vorbei!'] - The message to display upon game over.
     * @param {boolean} [isWin=false] - If true, displays the win screen instead of game over.
     */
    gameOver(message = 'Spiel ist vorbei!', isWin = false) {
        if (this.isGameOver) return;
        this.isGameOver = true;
    
        setTimeout(() => {
            if (!isWin) {
                this.drawGameOverScreen();
            }
            this.stopGameLoop();
            this.stopAllAnimations();
        }, 500); 
    }

    /**
     * Draws the end screen, displaying either a win or game over image on the canvas.
     * Clears the canvas and draws the appropriate image based on the win condition.
     * @param {boolean} isWin - If true, displays the win image; otherwise, displays the game over image.
     */
    drawEndScreen(isWin) {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (isWin && this.winImageLoaded) {
            ctx.drawImage(this.winImage, 0, 0, canvas.width, canvas.height);
        } else if (!isWin && this.gameOverImageLoaded) {
            ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
        } 
    }

    /**
     * Draws the game over screen on the canvas.
     * Clears the canvas and displays the game over image.
     */
    drawGameOverScreen() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.gameOverImageLoaded) {
            ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
        } 
    }
    
    /**
     * Plays an animation by cycling through a sequence of images.
     * Updates the character's image property to display the next frame.
     * @param {string[]} images - Array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i]; 
        this.img = this.imageCache[path]; 
        this.currentImage++; 
    }

    /**
     * Stops all ongoing animations and resets the character's state.
     * Clears animation and gravity intervals, pauses sounds, and resets the character's image.
     */
    stopAllAnimations() {
        if (this.animateInterval) {
            clearInterval(this.animateInterval);
            this.animateInterval = null;
        }
    
        this.animationIntervals.forEach(interval => clearInterval(interval));
        this.animationIntervals = [];
    
        if (this.gravityIntervalId) {
            clearInterval(this.gravityIntervalId);
            this.gravityIntervalId = null;
        }
    
        this.walking_sound.pause();
        this.jump_sound.pause();
    
        this.currentImage = 0;
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }

    /**
     * Loads an array of images into the character's image cache.
     * Preloads each image to ensure smooth animation during gameplay.
     * @param {string[]} images - Array of image paths to be loaded and cached.
     */
    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Applies gravity to the character, making it fall to the ground or maintain jump height.
     * Updates the character's vertical position based on gravitational acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if (!this.isOnGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY += this.accelleration;
            } else {
                this.y = 180; 
                this.speedY = 0;
                this.isJumping = false;
                this.canBounce = true; 
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the character is above ground level.
     * @returns {boolean} True if the character is above ground level, false otherwise.
     */
    isAboveGround() {
        return this.y < 180;
    }

    /**
     * Loads a set of images into the character's image cache.
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) { 
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Checks if the character is colliding with an enemy while in the air.
     * Used to determine if the character is jumping onto an enemy.
     * @param {MoveableObject} enemy - The enemy object to check for collision.
     * @returns {boolean} True if the character is colliding with the enemy and above ground.
     */
    jumpCollision(enemy) {
        return this.isColliding(enemy) && this.isAboveGround();
    }

    /**
     * Makes the character bounce by applying an upward force.
     */
    bounce() {
        this.speedY = -15; 
    }

    /**
     * Checks if the character is jumping on top of a chicken enemy.
     * Used for collision detection with specific enemy types.
     * @param {MoveableObject} chicken - The chicken enemy to check against.
     * @returns {boolean} True if the character is jumping on the chicken, false otherwise.
     */
    isJumpingOn(chicken) {
        return this.isAboveGround() && 
               this.x < chicken.x + chicken.width &&
               this.x + this.width > chicken.x &&
               this.y + this.height > chicken.y &&
               this.y + this.height < chicken.y + chicken.height / 2;
    }
    
    /**
     * Animates the character's movements and states based on user input and game state.
     * Handles walking, jumping, idle animations, and updates the camera position.
     */
    animate() {
        let moveInterval = setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
                this.inactivityTime = 0;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
                this.inactivityTime = 0;
            }
            this.world.camera_x = -this.x + 100;
    
            if (this.world.keyboard.SPACE && !this.isJumping) {
                this.jump();
                this.inactivityTime = 0;
            } else {
                this.walking_sound.pause();
                this.inactivityTime += 180 / 60; 
            }
        }, 1000 / 60);
        
        this.animationIntervals.push(moveInterval); 
        
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) { 
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isJumping) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.inactivityTime > 1000) { 
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 50);
        
        this.animationIntervals.push(animationInterval);  
    }

    /**
     * Moves the character to the right by increasing the x-coordinate.
     * Sets the character's direction to face right and plays the walking sound.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }
    
    /**
     * Moves the character to the left by decreasing the x-coordinate.
     * Sets the character's direction to face left and plays the walking sound.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
    }
    
    /**
     * Initiates the character's jump action, setting it to a jumping state.
     * Plays the jump sound if sound is not muted.
     */
    startJump() {
        this.isJumping = true;
    
        if (!isMuted) {
            this.jump_sound.play();
        }
        this.jump();
    }
    
    /**
     * Checks if the character is currently moving left or right.
     * @returns {boolean} True if the character is moving, false otherwise.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }
    
    /**
     * Makes the character jump by setting a negative vertical speed.
     * Prevents jumping if the character is already in the air.
     */
    jump() {
        if (!this.isJumping && this.isOnGround()) {
            this.speedY = -25; 
            this.isJumping = true;
    
            if (!isMuted) {
                this.jump_sound.play();
            }
        }
    }
    
    /**
     * Checks if the character is on the ground level.
     * @returns {boolean} True if the character is on the ground, false otherwise.
     */
    isOnGround() {
        return this.y >= 180; 
    }

    /**
     * Throws a bottle if available, creating a throwable object and reducing the bottle count.
     * Adds the new throwable object to the world's throwableObjects array.
     */
    throw() {
        if (this.bottles > 0) {
            let bottle = new ThrowableObject(this.x + 100, this.y + 100);
            this.world.throwableObjects.push(bottle);
            this.bottles--;
        }
    }

    /**
     * Updates the state of a specific key in the game's keyboard controls.
     * This allows the character to respond to key presses and releases.
     * @param {string} key - The key to update (e.g., 'RIGHT', 'LEFT', 'SPACE').
     * @param {boolean} state - The new state of the key (true for pressed, false for released).
     */
    updateKeyboardState(key, state) {
        if (this.world && this.world.keyboard) {
            this.world.keyboard[key] = state;
        }
    }
}
    