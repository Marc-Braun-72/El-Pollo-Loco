/**
 * Represents a background object in the game, such as scenery.
 * Extends the MoveableObject class.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {

    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new BackgroundObject instance with a specified image path and x-coordinate.
     * @param {string} imagePath - The path to the image file for the background object.
     * @param {number} x - The x-coordinate where the background object is placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Positions the object at the bottom of the canvas
    }

    /**
     * Draws the background object on the canvas at its current position.
     */
    draw() {
        this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
