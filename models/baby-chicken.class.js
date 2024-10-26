/**
 * Represents a baby chicken enemy that moves horizontally and animates its walking.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Babychicken extends MoveableObject {
    /**
     * The vertical position of the baby chicken on the canvas.
     * @type {number}
     */
    y = 390;

    /**
     * The width of the baby chicken.
     * @type {number}
     */
    width = 30;

    /**
     * The height of the baby chicken.
     * @type {number}
     */
    height = 30;

    /**
     * The speed at which the baby chicken moves, randomized slightly for variation.
     * @type {number}
     */
    speed = 0.5 + Math.random() * 0.15;

    /**
     * The direction of movement. 1 is right, -1 is left.
     * @type {number}
     */
    direction = 1;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './images/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './images/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './images/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Initializes the baby chicken with a random horizontal position and loads the walking images.
     */
    constructor() {
        super().loadImage('./images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 1500;
        this.animate();
    }

    /**
     * Animates the baby chicken's movement and walking frames. The chicken moves back and forth
     * and changes direction randomly.
     */
    animate() {
        let movementInterval = setInterval(() => {
            this.x += this.speed * this.direction;
            if (Math.random() < 0.001) { 
                this.direction *= -1;
            }
        }, 1000 / 60);

        let animationInterval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            this.otherDirection = this.direction !== -1;
        }, 200);

        this.intervals.push(movementInterval, animationInterval);
    }

    /**
     * Stops all animation intervals, clearing them to avoid memory leaks.
     */
    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}
