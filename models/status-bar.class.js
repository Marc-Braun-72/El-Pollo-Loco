/**
 * Represents the health status bar for the player character.
 * Extends the DrawableObject class.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    /**
     * Array of image paths for the health status bar, showing different health levels.
     * @type {string[]}
     */
    IMAGES_HEART = [
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', 
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png' 
    ];

    /**
     * The current health percentage of the player.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new StatusBar instance, initializes the position and size,
     * loads the images for each health level, and sets the initial health percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEART);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage of the player and updates the displayed image accordingly.
     * @param {number} percentage - The current health percentage of the player.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEART[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the current health percentage.
     * @returns {number} The index of the image to display based on the health level.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
