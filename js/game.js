
let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // backgroundMusic = new Audio('audio/la-cucaracha-made-with-Voicemod.mp3');
    // backgroundMusic.loop = true;
    // backgroundMusic.volume = 0.5;
    // backgroundMusic.play(); 

    console.log('My Character:', world.character); 
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