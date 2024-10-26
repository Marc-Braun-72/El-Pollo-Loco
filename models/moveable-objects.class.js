/**
 * Represents a moveable object with properties and behaviors for movement, gravity, and collisions.
 * Extends the DrawableObject class.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    /**
     * The horizontal speed of the object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Determines the direction the object is facing.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object, used for jumping and falling.
     * @type {number}
     */
    speedY = 0;

    /**
     * The gravitational acceleration applied to the object.
     * @type {number}
     */
    accelleration = 0.5;

    /**
     * The current energy level of the object, representing health.
     * @type {number}
     */
    energy = 100;

    /**
     * The number of coins collected by the object.
     * @type {number}
     */
    coinsCollected = 0;

    /**
     * The number of bottles collected by the object.
     * @type {number}
     */
    bottlesCollected = 0;

    /**
     * The timestamp of the last time the object was hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Array of intervals used for animations and movements, allowing them to be cleared.
     * @type {number[]}
     */
    intervals = []; 

    /**
     * Applies gravity to the object, making it fall when not on the ground.
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
            }
            this.speedY -= this.accelleration;
        }, 1000 / 25);
        this.intervals.push(gravityInterval); 
    }

    /**
     * Moves the object to the right by increasing the x-coordinate.
     */
    moveRight() {
        let moveRightInterval = setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
        this.intervals.push(moveRightInterval);  
    }

    /**
     * Moves the object to the left by decreasing the x-coordinate.
     */
    moveLeft() {
        let moveLeftInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        this.intervals.push(moveLeftInterval);  
    }

    /**
     * Stops all intervals associated with the object, including movements and animations.
     */
    stopAllIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = [];  
    }
    
    /**
     * Checks if the object is above ground level.
     * @returns {boolean} True if the object is above the ground, or if it's a throwable object.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if the object is colliding with another moveable object.
     * @param {MoveableObject} mo - The moveable object to check for collision.
     * @returns {boolean} True if this object is colliding with the other object.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x && 
               this.y + this.height > mo.y &&
               this.x < mo.x &&
               this.y < mo.y + mo.height;
    }
    
    /**
     * Reduces the object's energy when hit and updates the last hit timestamp.
     */
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is in a hurt state based on the last hit time.
     * @returns {boolean} True if the object was hit within the last second.
     */
    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (i.e., has no energy left).
     * @returns {boolean} True if the object's energy is zero, indicating death.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Plays an animation by cycling through a sequence of images.
     * Updates the current image based on the provided image array.
     * @param {string[]} images - Array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
