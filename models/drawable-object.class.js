/**
 * Represents a drawable object on the canvas with basic properties and methods for handling images.
 */
class DrawableObject {
    /**
     * The horizontal position of the object on the canvas.
     * @type {number}
     */
    x = 120;

    /**
     * The vertical position of the object on the canvas.
     * @type {number}
     */
    y = 280;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * The current image being displayed for this object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * A cache of loaded images for this object, allowing for efficient switching between images.
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index of the current image in the sequence, if the object has multiple images.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Draws the current image of the object on the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the image.
     */
    drawImage(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads a single image for the object and sets it as the current image.
     * @param {string} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and caches them for later use, applying transformations if needed.
     * @param {string[]} arr - Array of image paths to be loaded and cached.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)'; // Applies a horizontal flip to the image
            this.imageCache[path] = img;
        });
    }
}
