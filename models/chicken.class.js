class Chicken extends MoveableObject {
    y = 350;
    width = 70;
    height = 70;
    IMAGES_WALKING = [
        './images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',

    ];

    constructor() {
        super().loadImage('./images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.25;

        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

}