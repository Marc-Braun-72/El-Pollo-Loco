class Bottles extends MoveableObject {
    y = 330; 
    width = 60;
    height = 60;
    IMAGES_BOTTLES = [
        'images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'images/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    IMAGES_BOTTLES_SPLASH = [
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    IMAGES_BOTTLES_ROTATION = [
        'images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    currentImage = 0;
    animationInterval = 200; 
    lastAnimationTime = 0;
    intervals = [];  

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_BOTTLES_ROTATION);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = 200 + Math.random() * 1500;
        this.y = 360;
        this.setImage(this.IMAGES_BOTTLES[0]); 
        this.animate();
    }
    
    setImage(path) {
        this.img = this.imageCache[path];
    }

    animate() {
        let bottleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, this.animationInterval);
        this.intervals.push(bottleInterval);  
    }

    stopAnimation() {
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
          this.animationInterval = null;
        }
      }

    playAnimation(images) {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastAnimationTime > this.animationInterval) {
            this.currentImage = (this.currentImage + 1) % images.length;
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.lastAnimationTime = currentTime;
        }
    }
}
