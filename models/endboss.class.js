class Endboss extends MoveableObject {
    constructor() {
        super().loadImage('images/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = 2000; 
        this.y = -20; 
        this.height = 500;
        this.width = 300;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    IMAGES_WALKING = [
        'images/4_enemie_boss_chicken/1_walk/G1.png',
        'images/4_enemie_boss_chicken/1_walk/G2.png',
        'images/4_enemie_boss_chicken/1_walk/G3.png',
        'images/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
}