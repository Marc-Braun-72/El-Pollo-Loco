class ThrowableObject extends MoveableObject {
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
    
    intervals = []; 
    hasSplashed = false;
    isSplashing = false; 
    static GROUND_LEVEL = 380; 

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLES_ROTATION[0]);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.loadImages(this.IMAGES_BOTTLES_ROTATION);
        this.throw();
    }

    throw() {
        this.speedY = -20; 
        this.speedX = 10; 
        this.applyGravity();

        let rotationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES_ROTATION);
        }, 100); 

        this.intervals.push(rotationInterval); 

        let throwInterval = setInterval(() => {
            this.x += this.speedX;
        }, 25);
        this.intervals.push(throwInterval);  
    }

    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
    
        this.stopAllIntervals(); 
        
        this.height = 60;
        this.width = 60;
        this.y = ThrowableObject.GROUND_LEVEL - this.height;
    
        let splashIndex = 0;
        const splashInterval = setInterval(() => {
            if (splashIndex < this.IMAGES_BOTTLES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_BOTTLES_SPLASH[splashIndex]];
                splashIndex++;
            } else {
                clearInterval(splashInterval);
                this.isSplashing = false;
                this.clearAllIntervals();
            }
        }, 200);
    }
    

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.y + this.height < ThrowableObject.GROUND_LEVEL) { 
                this.y += this.speedY;
                this.speedY += 1; 
            } else {
                this.y = ThrowableObject.GROUND_LEVEL - this.height; 
                this.splash();
                clearInterval(gravityInterval); 
            }
        }, 25);
        this.intervals.push(gravityInterval);
    }
    

    clearAllIntervals() {
        this.stopAllIntervals();
        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
            this.gravityInterval = null;
        }
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
    }

    stopAllIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}
