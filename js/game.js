let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let isMuted = false;

/**
 * Initializes the game by setting up the canvas and sound button event listener.
 */
function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('soundButton').addEventListener('click', toggleSound);
}

/**
 * Starts the background music with a delay to prevent playback issues.
 */
function startBackgroundMusic() {
    if (backgroundMusic) {
        setTimeout(() => {
            backgroundMusic.play().catch(error => {
                console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
            });
        }, 500); 
    }
}

/**
 * Toggles the game sound by muting or unmuting all relevant sounds and updating the UI.
 */
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

/**
 * Starts the game by initializing background music, hiding the start screen, 
 * initializing the level, and starting the game loop.
 */
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

/**
 * Restarts the game by stopping all ongoing game loops, resetting variables, 
 * and initializing a new game instance.
 */
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

    document.getElementById('startScreen').style.display = 'none';
}

/**
 * Resets critical game variables, including the level, score, energy, and status bars.
 */
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

/**
 * Adjusts the canvas height based on the device orientation for certain browsers.
 */
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
    if(e.keyCode == 39) keyboard.RIGHT = true;
    if(e.keyCode == 37) keyboard.LEFT = true;
    if(e.keyCode == 38) keyboard.UP = true;
    if(e.keyCode == 40) keyboard.DOWN = true;
    if(e.keyCode == 32) keyboard.SPACE = true;
    if(e.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) keyboard.RIGHT = false;
    if(e.keyCode == 37) keyboard.LEFT = false;
    if(e.keyCode == 38) keyboard.UP = false;
    if(e.keyCode == 40) keyboard.DOWN = false;
    if(e.keyCode == 32) keyboard.SPACE = false;
    if(e.keyCode == 68) keyboard.D = false;
});
