/**
 * Represents the end boss enemy in the game with multiple states and animations.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
    /**
     * The initial energy level of the end boss.
     * @type {number}
     */
    INITIAL_ENERGY = 100;

    /**
     * Current energy level of the end boss.
     * @type {number}
     */
    energy = this.INITIAL_ENERGY;

    /**
     * Array of intervals used for animations, allowing them to be cleared.
     * @type {number[]}
     */
    intervals = [];  

    /**
     * Interval ID for attack animations.
     * @type {number}
     */
    attackInterval; 

    /**
     * The normal speed of the end boss during movement.
     * @type {number}
     */
    NORMAL_SPEED = 50; 

    /**
     * The speed of the end boss during an attack.
     * @type {number}
     */
    ATTACK_SPEED = 80;  

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'images/4_enemie_boss_chicken/1_walk/G1.png',
        'images/4_enemie_boss_chicken/1_walk/G2.png',
        'images/4_enemie_boss_chicken/1_walk/G3.png',
        'images/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'images/4_enemie_boss_chicken/2_alert/G5.png',
        'images/4_enemie_boss_chicken/2_alert/G6.png',
        'images/4_enemie_boss_chicken/2_alert/G7.png',
        'images/4_enemie_boss_chicken/2_alert/G8.png',
        'images/4_enemie_boss_chicken/2_alert/G9.png',
        'images/4_enemie_boss_chicken/2_alert/G10.png',
        'images/4_enemie_boss_chicken/2_alert/G11.png',
        'images/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'images/4_enemie_boss_chicken/3_attack/G13.png',
        'images/4_enemie_boss_chicken/3_attack/G14.png',
        'images/4_enemie_boss_chicken/3_attack/G15.png',
        'images/4_enemie_boss_chicken/3_attack/G16.png',
        'images/4_enemie_boss_chicken/3_attack/G17.png',
        'images/4_enemie_boss_chicken/3_attack/G18.png',
        'images/4_enemie_boss_chicken/3_attack/G19.png',
        'images/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'images/4_enemie_boss_chicken/4_hurt/G21.png',
        'images/4_enemie_boss_chicken/4_hurt/G22.png',
        'images/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array of image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD= [
        'images/4_enemie_boss_chicken/5_dead/G24.png',
        'images/4_enemie_boss_chicken/5_dead/G25.png',
        'images/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an Endboss instance, sets the initial position and size, and loads animations.
     * Initializes the boss with a default walking state.
     */
    constructor() {
        super().loadImage('images/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = 2000;
        this.y = 50;
        this.height = 400;
        this.width = 300;
        this.speed = 2.5;
        this.energy = 100; 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.state = 'idle';
        this.animate();
        this.speed = this.NORMAL_SPEED; 
    }

    /**
     * Loads multiple images for the end boss and caches them.
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
     * Reduces the boss's energy by a set amount when hit.
     * Updates the health bar, and if energy is zero, initiates the death sequence.
     */
    hit() {
        if (this.isDying) return;
        this.energy -= 20;
        this.energy = Math.max(0, this.energy);
        if (this.world && this.world.statusBarEndboss) {
            this.world.statusBarEndboss.setPercentage(this.energy / this.INITIAL_ENERGY * 100);
        }
    
        if (this.energy === 0 && !this.isDying) {
            this.isDying = true;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.die();
            }, 1000);
        } else {
            this.playAnimation(this.IMAGES_HURT);
        }
    }
    
    /**
     * Triggers the hurt animation and temporarily changes the boss's state to 'hurt'.
     * Resets to 'walking' after a short delay.
     */
    showHurtAnimation() {
        this.state = 'hurt';
        setTimeout(() => {
            this.state = 'walking';
        }, 500);
    }
    
    /**
     * Executes the death sequence for the boss.
     * Sets the boss's energy to zero, plays the death animation, and checks the game state.
     */
    die() {
        if (this.isDead()) return;
        this.isDying = false;
        this.energy = 0;
        this.playAnimation(this.IMAGES_DEAD);
        if (this.world) {
            this.world.checkGameState();
        }
    }
    
    /**
     * Checks if the boss is dead by evaluating if its energy is zero or less.
     * @returns {boolean} True if the boss has no energy left, indicating death.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Sets the boss to an alert state and initiates the attack interval.
     * Plays the alert animation and starts the attack sequence after a delay.
     */
    becomeAlert() {
        this.state = 'alert';
        this.playAnimation(this.IMAGES_ALERT);
        clearInterval(this.attackInterval); 

        if (this.world) {
            setTimeout(() => {
                this.attackInterval = setInterval(() => {
                    this.attack();
                }, 2000);
            }, 1000);
        }
    }

    /**
     * Executes an attack by moving toward the character with increased speed.
     * Plays the attack animation and resets the boss to normal speed and walking state after a delay.
     */
    attack() {
        this.state = 'attack';
        this.speed = this.ATTACK_SPEED; 
        this.playAnimation(this.IMAGES_ATTACK);

        if (this.world && this.world.character) {
            if (this.world.character.x < this.x) {
                this.moveLeft();
            }
        }

        setTimeout(() => {
            this.speed = this.NORMAL_SPEED;  
            this.state = 'walking';  
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000); 
    }

    /**
     * Stops the ongoing attack by clearing the attack interval.
     */
    stopAttack() {
        clearInterval(this.attackInterval);
    }

    /**
     * Animates the boss's actions and states based on its current state.
     * Handles state-based animations and movements.
     */
    animate() {
        let animationInterval = setInterval(() => {
            if (this.state === 'idle') {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.state === 'alert') {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.state === 'walking') {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.state === 'hurt') {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.state === 'dead') {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
        this.intervals.push(animationInterval); 
    }

    /**
     * Stops all active animations for the boss by clearing animation intervals.
     */
    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }

    /**
     * Plays an animation by cycling through a sequence of images.
     * Updates the current image based on the provided image array.
     * @param {string[]} images - Array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the boss to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}
