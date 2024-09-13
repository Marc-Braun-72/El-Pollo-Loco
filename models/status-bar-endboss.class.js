class StatusBarEndboss extends DrawableObject {

    percentage = 100;

    IMAGES = [
        'images/7_statusbars/2_statusbar_endboss/orange/orange0.png', 
        'images/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'images/7_statusbars/2_statusbar_endboss/orange/orange100.png' 
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
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