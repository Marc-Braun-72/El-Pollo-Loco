class StatusBarBottles extends DrawableObject {
    IMAGES_BOTTLE = [
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png', // 0
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'images/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png' // 5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    // setPercentage(50) 
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}