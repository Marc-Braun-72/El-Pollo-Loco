/**
 * Represents the status bar for displaying the number of coins collected.
 * Extends the DrawableObject class.
 * @extends DrawableObject
 */
class StatusBarCoins extends DrawableObject {
    /**
     * Array of image paths for the coin status bar, showing different fill levels.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',  
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png' 
    ];

    /**
     * The current count of coins collected.
     * @type {number}
     */
    coinCount = 0; 

    /**
     * Creates a new StatusBarCoins instance, initializes the position and size,
     * loads the images for each level, and sets the initial display based on coin count.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.updateDisplay();
    }

    /**
     * Increases the coin count by one, up to a maximum of ten, and updates the status bar display.
     */
    addCoin() {
        if (this.coinCount < 10) {
            this.coinCount++;
            this.updateDisplay();
        }
    }

    /**
     * Updates the displayed image based on the current coin count.
     * Sets the appropriate image from IMAGES_COINS to reflect the coin level.
     */
    updateDisplay() {
        let index = Math.floor(this.coinCount / 2); 
        let path = this.IMAGES_COINS[index];
        this.img = this.imageCache[path];
    }
}
