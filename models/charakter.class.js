class Character extends MoveableObject {

    height = 250;
    width = 120;
    y = 180;
    speed = 10;

    IMAGES_IDLE = [
        'images/2_character_pepe/1_idle/idle/I-1.png',
        'images/2_character_pepe/1_idle/idle/I-2.png',
        'images/2_character_pepe/1_idle/idle/I-3.png',
        'images/2_character_pepe/1_idle/idle/I-4.png',
        'images/2_character_pepe/1_idle/idle/I-5.png',
        'images/2_character_pepe/1_idle/idle/I-6.png',
        'images/2_character_pepe/1_idle/idle/I-7.png',
        'images/2_character_pepe/1_idle/idle/I-8.png',
        'images/2_character_pepe/1_idle/idle/I-9.png',
        'images/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'images/2_character_pepe/1_idle/long_idle/I-11.png',
        'images/2_character_pepe/1_idle/long_idle/I-12.png',
        'images/2_character_pepe/1_idle/long_idle/I-13.png',
        'images/2_character_pepe/1_idle/long_idle/I-14.png',
        'images/2_character_pepe/1_idle/long_idle/I-15.png',
        'images/2_character_pepe/1_idle/long_idle/I-16.png',
        'images/2_character_pepe/1_idle/long_idle/I-17.png',
        'images/2_character_pepe/1_idle/long_idle/I-18.png',
        'images/2_character_pepe/1_idle/long_idle/I-19.png',
        'images/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
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
    energy = 100; 
    isGameOver = false; 

    constructor() {
        super().loadImage('./images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        
        this.applyGravity();

        this.energy = 100; 
        this.currentImage = 0; 
        this.isGameOver = false;
        this.gameLoopId = null; 
        this.animationIntervals = []; 
        this.animate();
        this.inactivityTime = 0; 
        this.startGameLoop();
        this.bottles = []; 
        this.coins = [];   
    }

    startGameLoop() {
        this.gameLoopId = setInterval(() => {
            this.update();
        }, 1000 / 60); 
    }

    stopGameLoop() {
        console.log('Stopping game loop');
        if (this.gameLoopId !== null) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    hit() {
        this.energy -= 10; 
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    isDead() {
        return this.energy === 0;
     }

     die() {
        if (this.alreadyDead) return;
        this.alreadyDead = true;
        this.energy = 0;
        console.log('Character died, triggering game over');
        if (this.world) {
            this.world.gameOver();
        } else {
            console.error('World reference is missing in Character');
        }
    }



    gameOver(message = 'Spiel ist vorbei!') {
        if (this.isGameOver) return;
        this.isGameOver = true;
        console.log(message);
        this.drawGameOverScreen();
        this.stopGameLoop(); 
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i]; 
        this.img = this.imageCache[path]; 
        this.currentImage++; 
    }
    

    stopAllAnimations() {
        clearInterval(this.animateInterval);

    }
    

    drawGameOverScreen() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.gameOverImageLoaded) {
            ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
        } else {
            console.log("Game over image not loaded");
        }
    }
    

    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    applyGravity() {
        this.gravityIntervalId = setInterval(() => { 
            if (!this.isGameOver && this.isAboveGround()) {
                this.y -= this.speedY;
                this.y -= this.accelleration;
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

    jumpCollision(enemy) {
        return this.isColliding(enemy) && this.isAboveGround();
      }

      animate() {
        setInterval(() => {

            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
                this.inactivityTime = 0;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
                this.inactivityTime = 0;
            }
            this.world.camera_x = -this.x + 100;

            if (this.world.keyboard.SPACE && !this.isJumping) {
                this.isJumping = true;
                this.jump_sound.play();
                this.jump();
                this.inactivityTime = 0;
            
            } else {
                this.walking_sound.pause();
                this.inactivityTime += 120 / 60; 
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
             } else if (this.isJumping) {
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

            } else if (this.inactivityTime > 2000) { 

                this.playAnimation(this.IMAGES_LONG_IDLE);

            } else {
                this.playAnimation(this.IMAGES_IDLE);
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