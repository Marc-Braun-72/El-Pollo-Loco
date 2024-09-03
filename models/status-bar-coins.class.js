class StatusBarCoins extends DrawableObject {

    IMAGES_COINS = [
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png', // 0
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png' // 5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    // setPercentage(50) 
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
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