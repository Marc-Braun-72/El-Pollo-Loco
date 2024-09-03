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
    IMAGES_DEAD = [
        'images/2_character_pepe/5_dead/D-51.png',
        'images/2_character_pepe/5_dead/D-52.png',
        'images/2_character_pepe/5_dead/D-53.png',
        'images/2_character_pepe/5_dead/D-54.png',
        'images/2_character_pepe/5_dead/D-55.png',
        'images/2_character_pepe/5_dead/D-56.png',
        'images/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'images/2_character_pepe/4_hurt/H-41.png',
        'images/2_character_pepe/4_hurt/H-42.png',
        'images/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('./audio/running.mp3'); 
    jump_sound = new Audio('./audio/jump_short.mp3');
    isJumping = false;
    originalY = this.y;
    speedY = 0;
    accelleration = 2.5;

    constructor() {
        super().loadImage('./images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity(); 
        this.animate();

     } 

    applyGravity() {
        setInterval(() => { 
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.y -= this.accelleration
            }
        }, 1000 / 60);
    } 

    isAboveGround() {
        return this.y < 180;
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

            if (this.world.keyboard.SPACE && !this.isJumping) {
                this.isJumping = true;
                this.jump_sound.play();
                this.jump();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isJumping) {
                // Sprunganimation
                let i = this.currentImage % this.IMAGES_JUMPING.length;
                let path = this.IMAGES_JUMPING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else 
            
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {
        let jumpHeight = 180; 
        let jumpDuration = 800; 
        let jumpSteps = 20; 
        let stepHeight = jumpHeight / jumpSteps;
        let stepDuration = jumpDuration / (jumpSteps * 3); 

        let upInterval = setInterval(() => {
            this.y -= stepHeight;
            if (this.y <= this.originalY - jumpHeight) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    this.y += stepHeight;
                    if (this.y >= this.originalY) {
                        clearInterval(downInterval);
                        this.isJumping = false;
                        this.y = this.originalY; 
                        this.img = this.imageCache[this.IMAGES_WALKING[0]];  
                    }
                }, stepDuration);
            }
        }, stepDuration);
    }
}