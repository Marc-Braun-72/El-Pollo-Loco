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
    IMAGES_ALERT = [
        'images/4_enemie_boss_chicken/2_alert/G5.png',
        'images/4_enemie_boss_chicken/2_alert/G6.png',
        'images/4_enemie_boss_chicken/2_alert/G7.png',
        'images/4_enemie_boss_chicken/2_alert/G8.png',
        'images/4_enemie_boss_chicken/2_alert/G9.png',
        'images/4_enemie_boss_chicken/2_alert/G10.png',
        'images/4_enemie_boss_chicken/2_alert/G11.png',
        'images/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'images/4_enemie_boss_chicken/3_attack/G13.png',
        'images/4_enemie_boss_chicken/3_attack/G14.png',
        'images/4_enemie_boss_chicken/3_attack/G15.png',
        'images/4_enemie_boss_chicken/3_attack/G16.png',
        'images/4_enemie_boss_chicken/3_attack/G17.png',
        'images/4_enemie_boss_chicken/3_attack/G18.png',
        'images/4_enemie_boss_chicken/3_attack/G19.png',
        'images/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'images/4_enemie_boss_chicken/4_hurt/G21.png',
        'images/4_enemie_boss_chicken/4_hurt/G22.png',
        'images/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD= [
        'images/4_enemie_boss_chicken/5_dead/G24.png',
        'images/4_enemie_boss_chicken/5_dead/G25.png',
        'images/4_enemie_boss_chicken/5_dead/G26.png'
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