class StatusBarCoins extends DrawableObject {
    IMAGES_COINS = [
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',  
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png', 
        'images/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png' 
    ];

    coinCount = 0; 

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.updateDisplay();
    }

    addCoin() {
        if (this.coinCount < 10) {
            this.coinCount++;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        let index = Math.floor(this.coinCount / 2); 
        let path = this.IMAGES_COINS[index];
        this.img = this.imageCache[path];
    }
}
