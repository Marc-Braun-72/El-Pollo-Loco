/**
 * Represents a coin in the game that can animate between different frames.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class Coins extends MoveableObject {
    /**
     * The width of the coin.
     * @type {number}
     */
    width = 60;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 60;

    /**
     * Array of image paths for the coin animation frames.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'images/8_coin/coin_1.png',
        'images/8_coin/coin_2.png'
    ];

    /**
     * Index of the current image in the animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Interval (in milliseconds) between animation frames.
     * @type {number}
     */
    animationInterval = 100; 

    /**
     * Timestamp of the last animation update.
     * @type {number}
     */
    lastAnimationTime = 0;

    /**
     * Array of intervals used for animations, allowing them to be cleared.
     * @type {number[]}
     */
    intervals = [];  

    /**
     * Creates a new Coins instance with random position and initializes animations.
     * Loads the coin images and sets the initial image for display.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1500; 
        this.y = 150 + Math.random() * 250; 
        this.setImage(this.IMAGES_COINS[0]); 
        this.animate();
    }
    
    /**
     * Sets the image for the coin based on the specified path.
     * @param {string} path - The path to the image to be displayed.
     */
    setImage(path) {
        this.img = this.imageCache[path];
    }

    /**
     * Animates the coin by cycling through its image frames.
     * Repeatedly updates the image at a set interval.
     */
    animate() {
        let coinInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, this.animationInterval);
        this.intervals.push(coinInterval);  
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
     * Changes the displayed image at each interval.
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
