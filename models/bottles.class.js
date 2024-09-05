class Bottles extends MoveableObject {
    y = 330; 
    width = 60;
    height = 60;
    IMAGES_BOTTLES = [
        'images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'images/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    currentImage = 0;
    animationInterval = 200; 
    lastAnimationTime = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 200 + Math.random() * 1500;
        this.y = 360;
        this.setImage(this.IMAGES_BOTTLES[0]); 
        console.log(`Bottle created at x: ${this.x}, y: ${this.y}`);
        this.animate();
    }
    
    setImage(path) {
        this.img = this.imageCache[path];
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, this.animationInterval);
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