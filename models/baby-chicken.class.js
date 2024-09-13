
class Babychicken extends MoveableObject {
    y = 390;
    width = 30;
    height = 30;
    speed = 0.5 + Math.random() * 0.15;
    direction = 1; 

    IMAGES_WALKING = [
        './images/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './images/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './images/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 1500;

        this.animate();
    }

    animate() {
        let movementInterval = setInterval(() => {
            this.x += this.speed * this.direction;
            if (Math.random() < 0.001) { 
                this.direction *= -1;  
            }
        }, 1000 / 60);

        let animationInterval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            if (this.direction === -1) {
                this.otherDirection = false;  
            } else {
                this.otherDirection = true;  
            }
        }, 200);

        this.intervals.push(movementInterval, animationInterval); 
    }

    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }
}
