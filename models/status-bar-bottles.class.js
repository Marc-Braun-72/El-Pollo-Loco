/**
 * Represents the status bar for displaying the number of bottles collected.
 * Extends the DrawableObject class.
 * @extends DrawableObject
 */
class StatusBarBottles extends DrawableObject {

    /**
     * The current count of bottles collected.
     * @type {number}
     */
    bottleCount = 0;

    /**
     * Array of image paths for the bottle status bar, showing different fill levels.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png', 
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png' 
    ];

    /**
     * The percentage level of the status bar, based on the number of bottles collected.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new StatusBarBottles instance, initializes the position and size,
     * loads the images for each level, and sets the initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the fill percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage of bottles collected.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} The index of the image to display.
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

    /**
     * Increases the bottle count by one and updates the status bar percentage accordingly.
     */
    addBottle() {
        this.bottleCount++;
        this.setPercentage(this.bottleCount * 20); 
    }
}
