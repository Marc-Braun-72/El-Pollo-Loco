class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;
    intervals = [];  

    constructor() {
        super().loadImage('./images/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        let moveInterval = setInterval(() => {
            this.x -= 0.3;  
        }, 1000 / 60); 
        this.intervals.push(moveInterval);  
    }
    
    stopMoving() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }

    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
      }
}
