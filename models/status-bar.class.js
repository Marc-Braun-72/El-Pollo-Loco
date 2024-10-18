class StatusBar extends DrawableObject {

    IMAGES_HEART = [
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', 
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'images/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png' 
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEART);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEART[this.resolveImageIndex()];
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