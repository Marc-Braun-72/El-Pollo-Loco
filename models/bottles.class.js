/**
 * Represents a bottle object in the game that can animate between states 
 * (e.g., on the ground, in rotation, and splash effects).
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Bottles extends MoveableObject {

    /**
     * The vertical position of the bottle on the canvas.
     * @type {number}
     */
    y = 330;

    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 60;

    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 60;

    /**
     * Array of image paths for bottles lying on the ground.
     * @type {string[]}
     */
    IMAGES_BOTTLES = [
        'images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'images/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Array of image paths for splash animation frames.
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
     * Array of image paths for bottle rotation animation frames.
     * @type {string[]}
     */
    IMAGES_BOTTLES_ROTATION = [
        'images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * The index of the current image being displayed in the animation.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The interval (in milliseconds) between animation frames.
     * @type {number}
     */
    animationInterval = 200;

    /**
     * Timestamp of the last animation update.
     * @type {number}
     */
    lastAnimationTime = 0;

    /**
     * Array of active animation intervals for the bottle.
     * @type {number[]}
     */
    intervals = [];

    /**
     * Creates a new bottle instance and initializes its images and position.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_BOTTLES_ROTATION);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = 200 + Math.random() * 1500;
        this.y = 360;
        this.setImage(this.IMAGES_BOTTLES[0]);
        this.animate();
    }
    
    /**
     * Sets the current image for the bottle object.
     * @param {string} path - The path to the image to be displayed.
     */
    setImage(path) {
        this.img = this.imageCache[path];
    }

    /**
     * Starts the bottle animation by cycling through images at a set interval.
     */
    animate() {
        let bottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, this.animationInterval);
        this.intervals.push(bottleInterval);
    }

    /**
     * Stops the animation by clearing the interval.
     */
    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    /**
     * Plays the animation by cycling through the given image array.
     * @param {string[]} images - An array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastAnimationTime > this.animationInterval) {
            this.currentImage = (this.currentImage + 1) % images.length;
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.lastAnimationTime = currentTime;
        }
    }
}
