
let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let isMuted = false;

function init() {
    canvas = document.getElementById('canvas');

    // backgroundMusic = new Audio('audio/la_cucaracha.mp3');
    // backgroundMusic.loop = true;
    // backgroundMusic.volume = 0.5;

    document.getElementById('soundButton').addEventListener('click', toggleSound);
}

function startBackgroundMusic() {
    if (backgroundMusic) {
        setTimeout(() => {
            backgroundMusic.play().catch(error => {
                console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
            });
        }, 500); 
    } else {
        console.error("backgroundMusic ist nicht initialisiert.");
    }
}


function toggleSound() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio('audio/la_cucaracha.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;
    }

    isMuted = !isMuted;

    if (isMuted) {
        backgroundMusic.pause();
    } else {
        startBackgroundMusic();
    }

    if (world && world.character) {
        world.character.walking_sound.muted = isMuted;
        world.character.jump_sound.muted = isMuted;

        if (world.damageSound) {
            world.damageSound.muted = isMuted;
        }

        if (world.throwableObjects) {
            world.throwableObjects.forEach(bottle => {
                if (bottle.bottleSound) {
                    bottle.bottleSound.muted = isMuted;
                }
            });
        }
    }

    document.getElementById('soundButton').classList.toggle('muted', isMuted);
}



function startGame() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio('audio/la_cucaracha.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;
    }

    startBackgroundMusic();
    initLevel();
    document.getElementById('startScreen').style.display = 'none';

    world = new World(canvas, keyboard);
    world.start();
    document.getElementById('legal').style.display = 'none';
}

function restartGame() {
    if (world) {
        world.stop();
        world.stopAllIntervals();
        world.stopAnimationLoop();
        world.stopAllAnimations();
        
        setTimeout(() => {
            world = new World(canvas, keyboard);
            resetGameVariables();
            world.start();
        }, 100);
    } else {
        world = new World(canvas, keyboard);
        resetGameVariables();
        world.start();
    }

    // document.getElementById('restartButton').style.display = 'none';
    document.getElementById('startScreen').style.display = 'none';
}

function resetGameVariables() {
    initLevel();  
    world.level = level1; 

    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
            enemy.energy = enemy.INITIAL_ENERGY || 100;  
            enemy.alreadyDead = false;  
        }
    });

    world.coins = world.createCoins();    
    world.bottles = world.createBottles(); 
    world.score = 0;                      
    world.character.energy = 100;         
    world.statusBar.setPercentage(100);   
    world.statusBarBottles.setPercentage(0); 

    world.statusBarEndboss.setPercentage(100); 
    world.endbossAlerted = false;

    if (world.statusBarCoins) {
        world.statusBarCoins.coinCount = 0;  
        world.statusBarCoins.updateDisplay();  
    } 
}

// Opera 100vh Fix aus einem Video
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    } 
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});