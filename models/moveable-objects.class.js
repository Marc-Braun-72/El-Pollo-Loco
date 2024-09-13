class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelleration = 0.5;
    energy = 100;
    coinsCollected = 0;
    bottlesCollected = 0;
    lastHit = 0;
    intervals = []; 

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
            }
            this.speedY -= this.accelleration;
        }, 1000 / 25);
        this.intervals.push(gravityInterval); 
    }

    moveRight() {
        let moveRightInterval = setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
        this.intervals.push(moveRightInterval);  
    }

    moveLeft() {
        let moveLeftInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        this.intervals.push(moveLeftInterval);  
    }

    stopAllIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = [];  
    }
    
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x && 
               this.y + this.height > mo.y &&
               this.x < mo.x &&
               this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy === 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
