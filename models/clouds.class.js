/**
 * Represents a cloud in the game's background that moves slowly to the left.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    /**
     * The vertical position of the cloud on the canvas.
     * @type {number}
     */
    y = 20;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * Array of intervals used for animations, allowing them to be cleared.
     * @type {number[]}
     */
    intervals = [];  

    /**
     * Creates a new Cloud instance with a random initial horizontal position.
     * Loads the cloud image and starts the animation.
     */
    constructor() {
        super().loadImage('./images/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Animates the cloud by moving it slowly to the left across the screen.
     * Updates the x-coordinate periodically.
     */
    animate() {
        let moveInterval = setInterval(() => {
            this.x -= 0.3;  
        }, 1000 / 60); 
        this.intervals.push(moveInterval);  
    }
    
    /**
     * Stops all active movement intervals for the cloud.
     */
    stopMoving() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }

    /**
     * Stops all active animation intervals for the cloud.
     */
    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}
