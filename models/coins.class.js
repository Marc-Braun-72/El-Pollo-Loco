class Coins extends MoveableObject {
    width = 60;
    height = 60;
    IMAGES_COINS = [
        'images/8_coin/coin_1.png',
        'images/8_coin/coin_2.png'
    ];
    currentImage = 0;
    animationInterval = 100; 
    lastAnimationTime = 0;
    intervals = [];  

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1500; 
        this.y = 150 + Math.random() * 250; 
        this.setImage(this.IMAGES_COINS[0]); 
        this.animate();
    }
    
    setImage(path) {
        this.img = this.imageCache[path];
    }

    animate() {
        let coinInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, this.animationInterval);
        this.intervals.push(coinInterval);  
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
