class Character extends MoveableObject {

    height = 250;
    width = 125;
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
    jumpForce = -20;
    gravity = 1;
    isBouncing = false;
    canBounce = true;

    constructor() {
        super().loadImage('./images/2_character_pepe/2_walk/W-21.png');
        this.offset = {
            top: 20,
            bottom: 10,
            left: 15,
            right: 15
        };
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.gameOverImage = new Image();
        this.gameOverImage.src = 'images/9_intro_outro_screens/game_over/game over.png';
        this.winImage = new Image();
        this.winImage.src = 'images/9_intro_outro_screens/win/win_2.png';
        this.gameOverImage.onload = () => {
            this.gameOverImageLoaded = true;
        };
        this.winImage.onload = () => {
            this.winImageLoaded = true;
        };
        this.applyGravity();
        this.energy = 100; 
        this.currentImage = 0; 
        this.isGameOver = false;
        this.isHurt = false; 
        this.gameLoopId = null; 
        this.animationIntervals = []; 
        this.animate();
        this.inactivityTime = 0; 
        this.startGameLoop();
        this.bottles = []; 
        this.coins = [];   
    }

    resetCharacter() {
        this.x = 100;  
        this.y = 180;  
        this.energy = 100;  
        this.inactivityTime = 0; 
        this.isJumping = false;  
        this.lastHit = 0;  
        this.currentImage = 0;  
        this.loadImage(this.IMAGES_IDLE[0]); 
    }

    isColliding(mo) {
        if (!mo.offset) mo.offset = { top: 0, bottom: 0, left: 0, right: 0 };  
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
    startGameLoop() {
        this.gameLoopId = setInterval(() => {
            this.update();
        }, 1000 / 60); 
    }

    stopGameLoop() {
        if (this.gameLoopId !== null) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    update() {
    }

    updateAnimation() {
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isFallingOn(enemy)) {
                    enemy.hit();
                    this.character.bounce();
                } else {
                    this.character.hit();
                }
            }
        });
    }

    isFallingOn(mo) {
        return this.speedY > 0 &&  
               this.y + this.height - this.offset.bottom < mo.y + mo.offset.top &&  
               this.y + this.height > mo.y &&  
               this.x + this.width > mo.x + mo.offset.left && 
               this.x < mo.x + mo.width - mo.offset.right;
    }

    bounce() {
        if (this.canBounce) {
            this.speedY = -15;
            this.isJumping = true;
            this.canBounce = false;
            setTimeout(() => {
                this.canBounce = true;
            }, 1000); 
        }
    }

    hit() {
        this.energy -= 2; 
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        } else {
            this.isHurt = true;  
            setTimeout(() => {
                this.isHurt = false; 
            }, 1000);  
        }
    }
    
    isDead() {
        return this.energy === 0;
    }

    die() {
        if (this.alreadyDead) return;
        this.alreadyDead = true;
        this.playDeathAnimation();
    }
    
    playDeathAnimation() {
        let currentFrame = 0;
        const deathAnimationInterval = setInterval(() => {
            if (currentFrame < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[currentFrame]];
                currentFrame++;
            } else {
                clearInterval(deathAnimationInterval);
                if (this.world && !this.world.isGameOver) {
                    this.world.gameOver('Game Over', false);
                }
            }
        }, 200);
    }

    gameOver(message = 'Spiel ist vorbei!', isWin = false) {
        if (this.isGameOver) return;
        this.isGameOver = true;
    
        setTimeout(() => {
            if (isWin) {
                this.drawWinScreen();
            } else {
                this.drawGameOverScreen();
            }
            this.stopGameLoop();
            this.stopAllAnimations();
    
            document.getElementById('restartButton').style.display = 'block';
        }, 500); 
    }
    
    drawWinScreen() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.winImageLoaded) {
            ctx.drawImage(this.winImage, 0, 0, canvas.width, canvas.height);
        } 
    }

    drawEndScreen(isWin) {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (isWin && this.winImageLoaded) {
            ctx.drawImage(this.winImage, 0, 0, canvas.width, canvas.height);
        } else if (!isWin && this.gameOverImageLoaded) {
            ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
        } 
    }

    drawGameOverScreen() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.gameOverImageLoaded) {
            ctx.drawImage(this.gameOverImage, 0, 0, canvas.width, canvas.height);
        } 
    }
    
    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i]; 
        this.img = this.imageCache[path]; 
        this.currentImage++; 
    }

    stopAllAnimations() {
        if (this.animateInterval) {
            clearInterval(this.animateInterval);
            this.animateInterval = null;
        }
    
        this.animationIntervals.forEach(interval => clearInterval(interval));
        this.animationIntervals = [];
    
        if (this.gravityIntervalId) {
            clearInterval(this.gravityIntervalId);
            this.gravityIntervalId = null;
        }
    
        this.walking_sound.pause();
        this.jump_sound.pause();
    
        this.currentImage = 0;
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }

    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    applyGravity() {
        setInterval(() => {
            if (!this.isOnGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY += this.accelleration;
            } else {
                this.y = 180; 
                this.speedY = 0;
                this.isJumping = false;
                this.canBounce = true; 
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

    bounce() {
        this.speedY = -15; 
    }

    isJumpingOn(chicken) {
        return this.isAboveGround() && 
               this.x < chicken.x + chicken.width &&
               this.x + this.width > chicken.x &&
               this.y + this.height > chicken.y &&
               this.y + this.height < chicken.y + chicken.height / 2;
    }
    
    animate() {
        let moveInterval = setInterval(() => {
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
                this.jump();
                this.inactivityTime = 0;
            } else {
                this.walking_sound.pause();
                this.inactivityTime += 180 / 60; 
            }
        }, 1000 / 60);
        
        this.animationIntervals.push(moveInterval); 
        
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) { 
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isJumping) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.inactivityTime > 1000) { 
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 50);
        
        this.animationIntervals.push(animationInterval);  
    }
    
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }
    
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
    }
    
    startJump() {
        this.isJumping = true;
        this.jump_sound.play();
        this.jump();
    }
    
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }
    
    jump() {
        if (!this.isJumping && this.isOnGround()) {
            this.speedY = -25; 
            this.isJumping = true;
            this.jump_sound.play();
        }
    }

    isOnGround() {
        return this.y >= 180; 
    }
}