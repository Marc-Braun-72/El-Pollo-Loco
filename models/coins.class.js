class Coins extends MoveableObject {
    width = 60;
    height = 60;
    IMAGES_COINS = [
        'images/8_coin/coin_1.png',
        'images/8_coin/coin_2.png'
    ];
    currentImage = 0;
    animationInterval = 200; 
    lastAnimationTime = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1500; 
        this.y = 150 + Math.random() * 250; 
        this.setImage(this.IMAGES_COINS[0]); 
        console.log(`Coin created at x: ${this.x}, y: ${this.y}`);
        this.animate();
    }
    
    setImage(path) {
        this.img = this.imageCache[path];
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
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