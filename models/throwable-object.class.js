class ThrowableObject extends MoveableObject {
  IMAGES_BOTTLES_SPLASH = [
      'images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      'images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];
  intervals = []; 

  constructor(x, y) {
      super().loadImage('images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.throw();
      this.loadImages(this.IMAGES_BOTTLES_SPLASH);
  }

  throw() {
      this.speedY = -20; 
      this.speedX = 10; 
      this.applyGravity();
      let throwInterval = setInterval(() => {
          this.x += this.speedX;
      }, 25);
      this.intervals.push(throwInterval);  
  }

  splash() {
      this.playAnimation(this.IMAGES_BOTTLES_SPLASH);
  }

  applyGravity() {
      let gravityInterval = setInterval(() => {
          if (this.y < 500) { 
              this.y += this.speedY;
              this.speedY += 1; 
          } else {
              this.clearAllIntervals(); 
          }
      }, 25);
      this.intervals.push(gravityInterval);  
  }

  stopAllIntervals() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    if (this.gravityInterval) {
        clearInterval(this.gravityInterval);
        this.gravityInterval = null;
    }
    if (this.throwInterval) {
        clearInterval(this.throwInterval);
        this.throwInterval = null;
    }
}

  clearAllIntervals() {
      clearInterval(this.gravityInterval);
      clearInterval(this.throwInterval);
      this.stopAllIntervals();  
  }
}
