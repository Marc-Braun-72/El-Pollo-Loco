/**
 * Represents a chicken enemy that moves left and can die upon being hit.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
    /**
     * Indicates whether the chicken is in the dying state.
     * @type {boolean}
     */
    isDying = false;

    /**
     * The vertical position of the chicken on the canvas.
     * @type {number}
     */
    y = 350;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 70;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 70;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Image path for the dead state.
     * @type {string[]}
     */
    IMAGES_DEAD = ['images/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Array of intervals used for animations, allowing them to be cleared.
     * @type {number[]}
     */
    intervals = [];  

    /**
     * Creates a new Chicken instance with randomized position and speed.
     * Loads the walking images and starts the animation.
     */
    constructor() {
        super().loadImage('./images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.offset = {
            top: 10,
            bottom: 5,
            left: 5,
            right: 5
        };
        this.loadImages(this.IMAGES_WALKING);
        this.x = 350 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 0.25;
        this.energy = 1;
        this.animate();
    }

    /**
     * Animates the chicken's movement and walking animation.
     * Moves the chicken to the left and cycles through walking frames.
     */
    animate() {
        this.moveLeft();

        let animationInterval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
        this.intervals.push(animationInterval); 
    }

    /**
     * Stops all active animation intervals for the chicken.
     */
    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }

    /**
     * Sets the chicken's state to dying, removes it from the screen, and displays the dead image.
     * After a delay, moves the chicken off-screen.
     */
    die() {
        if (!this.isDying) {
            this.isDying = true;
            this.energy = 0;
            this.speed = 0;
            this.stopAnimation();
            this.loadImage(this.IMAGES_DEAD[0]);
            setTimeout(() => {
                this.y = 1000; 
            }, 500);
        }
    } 
}
