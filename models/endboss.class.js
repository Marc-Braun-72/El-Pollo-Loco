class Endboss extends MoveableObject {
    INITIAL_ENERGY = 100;
    energy = this.INITIAL_ENERGY;
    intervals = [];  
    attackInterval; 
    NORMAL_SPEED = 50; 
    ATTACK_SPEED = 80;  

    constructor() {
        super().loadImage('images/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = 2000;
        this.y = 50;
        this.height = 400;
        this.width = 300;
        this.speed = 2.5;
        this.energy = 100; 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.state = 'idle';
        this.animate();
        this.speed = this.NORMAL_SPEED; 
    }

    IMAGES_WALKING = [
        'images/4_enemie_boss_chicken/1_walk/G1.png',
        'images/4_enemie_boss_chicken/1_walk/G2.png',
        'images/4_enemie_boss_chicken/1_walk/G3.png',
        'images/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'images/4_enemie_boss_chicken/2_alert/G5.png',
        'images/4_enemie_boss_chicken/2_alert/G6.png',
        'images/4_enemie_boss_chicken/2_alert/G7.png',
        'images/4_enemie_boss_chicken/2_alert/G8.png',
        'images/4_enemie_boss_chicken/2_alert/G9.png',
        'images/4_enemie_boss_chicken/2_alert/G10.png',
        'images/4_enemie_boss_chicken/2_alert/G11.png',
        'images/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'images/4_enemie_boss_chicken/3_attack/G13.png',
        'images/4_enemie_boss_chicken/3_attack/G14.png',
        'images/4_enemie_boss_chicken/3_attack/G15.png',
        'images/4_enemie_boss_chicken/3_attack/G16.png',
        'images/4_enemie_boss_chicken/3_attack/G17.png',
        'images/4_enemie_boss_chicken/3_attack/G18.png',
        'images/4_enemie_boss_chicken/3_attack/G19.png',
        'images/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'images/4_enemie_boss_chicken/4_hurt/G21.png',
        'images/4_enemie_boss_chicken/4_hurt/G22.png',
        'images/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD= [
        'images/4_enemie_boss_chicken/5_dead/G24.png',
        'images/4_enemie_boss_chicken/5_dead/G25.png',
        'images/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    hit() {
        if (this.isDying) return;
        this.energy -= 20;
        this.energy = Math.max(0, this.energy);
        if (this.world && this.world.statusBarEndboss) {
            this.world.statusBarEndboss.setPercentage(this.energy / this.INITIAL_ENERGY * 100);
        }
    
        if (this.energy === 0 && !this.isDying) {
            this.isDying = true;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.die();
            }, 1000);
        } else {
            this.playAnimation(this.IMAGES_HURT);
        }
    }
    
    showHurtAnimation() {
        this.state = 'hurt';
        setTimeout(() => {
            this.state = 'walking';
        }, 500);
    }

    die() {
        if (this.isDead()) return;
        this.isDying = false;
        this.energy = 0;
        this.playAnimation(this.IMAGES_DEAD);
        if (this.world) {
            this.world.checkGameState();
        }
    }
    
    isDead() {
        return this.energy <= 0;
    }

    becomeAlert() {
        this.state = 'alert';
        this.playAnimation(this.IMAGES_ALERT);
        clearInterval(this.attackInterval); 

        if (this.world) {
            setTimeout(() => {
                this.attackInterval = setInterval(() => {
                    this.attack();
                }, 2000);
            }, 1000);
        }
    }

    attack() {
        this.state = 'attack';
        this.speed = this.ATTACK_SPEED; 
        this.playAnimation(this.IMAGES_ATTACK);

        if (this.world && this.world.character) {
            if (this.world.character.x < this.x) {
                this.moveLeft();
            }
        }

        setTimeout(() => {
            this.speed = this.NORMAL_SPEED;  
            this.state = 'walking';  
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000); 
    }

    stopAttack() {
        clearInterval(this.attackInterval);
    }

    animate() {
        let animationInterval = setInterval(() => {
            if (this.state === 'idle') {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.state === 'alert') {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.state === 'walking') {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.state === 'hurt') {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.state === 'dead') {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
        this.intervals.push(animationInterval); 
    }

    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));  
        this.intervals = []; 
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

}
