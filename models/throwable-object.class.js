/**
 * Represents a throwable object, such as a bottle, which can be thrown, rotate, and splash on impact.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
    /**
     * Array of image paths for the bottle splash animation.
     * @type {string[]}
     */
    IMAGES_BOTTLES_SPLASH = [
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Array of image paths for the bottle rotation animation.
     * @type {string[]}
     */
    IMAGES_BOTTLES_ROTATION = [
        'images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of intervals used for animations, allowing them to be cleared.
     * @type {number[]}
     */
    intervals = []; 

    /**
     * Indicates if the bottle has already splashed on impact.
     * @type {boolean}
     */
    hasSplashed = false;

    /**
     * Indicates if the bottle is currently in the splashing state.
     * @type {boolean}
     */
    isSplashing = false; 

    /**
     * The ground level at which the bottle will splash.
     * @type {number}
     * @static
     * @constant
     */
    static GROUND_LEVEL = 380;

    /**
     * Creates a new ThrowableObject instance, initializes its position and size,
     * loads the images for rotation and splash animations, and initiates the throw.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLES_ROTATION[0]);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.loadImages(this.IMAGES_BOTTLES_ROTATION);
        this.throw();
    }

    /**
     * Initiates the throw by setting speed values and applying gravity.
     * Adds intervals for rotation and movement along the x-axis.
     */
    throw() {
        this.speedY = -20; 
        this.speedX = 10; 
        this.applyGravity();

        let rotationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES_ROTATION);
        }, 100); 
        this.intervals.push(rotationInterval); 

        let throwInterval = setInterval(() => {
            this.x += this.speedX;
        }, 25);
        this.intervals.push(throwInterval);  
    }

    /**
     * Executes the splash animation when the bottle hits the ground.
     * Stops all active intervals and cycles through the splash images.
     */
    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
    
        this.stopAllIntervals(); 
        
        this.height = 60;
        this.width = 60;
        this.y = ThrowableObject.GROUND_LEVEL - this.height;
    
        let splashIndex = 0;
        const splashInterval = setInterval(() => {
            if (splashIndex < this.IMAGES_BOTTLES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_BOTTLES_SPLASH[splashIndex]];
                splashIndex++;
            } else {
                clearInterval(splashInterval);
                this.isSplashing = false;
                this.clearAllIntervals();
            }
        }, 200);
    }

    /**
     * Applies gravity to the bottle, making it fall until it hits the ground.
     * Once it reaches the ground level, it triggers the splash animation.
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.y + this.height < ThrowableObject.GROUND_LEVEL) { 
                this.y += this.speedY;
                this.speedY += 1; 
            } else {
                this.y = ThrowableObject.GROUND_LEVEL - this.height; 
                this.splash();
                clearInterval(gravityInterval); 
            }
        }, 25);
        this.intervals.push(gravityInterval);
    }
    
    /**
     * Clears all active intervals associated with the object's throw and splash animations.
     */
    clearAllIntervals() {
        this.stopAllIntervals();
        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
            this.gravityInterval = null;
        }
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
    }

    /**
     * Stops all active intervals for the object's animations and movements.
     */
    stopAllIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}
