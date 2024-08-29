class Cloud extends MoveableObject {

    y = 20;
    height = 250;
    width = 500;
    
    constructor() {
        super().loadImage('./images/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();

    }

    animate() {
        this.moveLeft();
    }




}