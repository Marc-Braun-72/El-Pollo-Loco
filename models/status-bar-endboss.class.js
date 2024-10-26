/**
 * Represents the status bar for displaying the health level of the end boss.
 * Extends the DrawableObject class.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {

    /**
     * The current health percentage of the end boss.
     * @type {number}
     */
    percentage = 100;

    /**
     * Array of image paths for the end boss status bar, showing different health levels.
     * @type {string[]}
     */
    IMAGES = [
        'images/7_statusbars/2_statusbar_endboss/orange/orange0.png', 
        'images/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange100.png' 
    ];

    /**
     * Creates a new StatusBarEndboss instance, initializes the position and size,
     * loads the images for each health level, and sets the initial health percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage of the end boss and updates the displayed image accordingly.
     * @param {number} percentage - The current health percentage of the end boss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
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
