class Chicken extends MoveableObject {
    y = 350;
    width = 70;
    height = 70;
    IMAGES_WALKING = [
        './images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = ['images/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    intervals = [];  

    constructor() {
        super().loadImage('./images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.offset = {
            top: 10,
            bottom: 5,
            left: 5,
            right: 5
        };
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        this.moveLeft();

        let animationInterval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
        this.intervals.push(animationInterval); 
    }

    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }

    die() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.y = 1000; 
        }, 500);
    }
}
