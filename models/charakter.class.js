class Character extends MoveableObject {

    height = 250;
    width = 120;
    y = 180;
    speed = 10;
    IMAGES_WALKING = [
        'images/2_character_pepe/2_walk/W-21.png',
        'images/2_character_pepe/2_walk/W-22.png',
        'images/2_character_pepe/2_walk/W-23.png',
        'images/2_character_pepe/2_walk/W-24.png',
        'images/2_character_pepe/2_walk/W-25.png',
        'images/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'images/2_character_pepe/3_jump/J-31.png',
        'images/2_character_pepe/3_jump/J-32.png',
        'images/2_character_pepe/3_jump/J-33.png',
        'images/2_character_pepe/3_jump/J-34.png',
        'images/2_character_pepe/3_jump/J-35.png',
        'images/2_character_pepe/3_jump/J-36.png',
        'images/2_character_pepe/3_jump/J-37.png',
        'images/2_character_pepe/3_jump/J-38.png',
        'images/2_character_pepe/3_jump/J-39.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');
    jump_sound = new Audio('audio/jump_short.mp3');
    isJumping = false;
    originalY = this.y;

    constructor() {
        super().loadImage('./images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;

            // Sprungaktion erkennen und Ton abspielen
            if (this.world.keyboard.SPACE && !this.isJumping) {
                this.isJumping = true;
                this.jump_sound.play();
                this.jump();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isJumping) {
                // Sprunganimation
                let i = this.currentImage % this.IMAGES_JUMPING.length;
                let path = this.IMAGES_JUMPING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {
        let jumpHeight = 140; // Sprunghöhe
        let jumpDuration = 800; // Sprungdauer in Millisekunden
        let jumpSteps = 20; // Anzahl der Schritte für den Sprung
        let stepHeight = jumpHeight / jumpSteps;
        let stepDuration = jumpDuration / (jumpSteps * 2); // Auf- und Abstieg

        let upInterval = setInterval(() => {
            this.y -= stepHeight;
            if (this.y <= this.originalY - jumpHeight) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    this.y += stepHeight;
                    if (this.y >= this.originalY) {
                        clearInterval(downInterval);
                        this.isJumping = false;
                        this.y = this.originalY; // Sicherstellen, dass die Y-Position korrekt zurückgesetzt wird
                        this.img = this.imageCache[this.IMAGES_WALKING[0]]; // Zurücksetzen auf das erste Gehbild
                    }
                }, stepDuration);
            }
        }, stepDuration);
    }
}