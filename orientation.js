// Detect Landscape-Orientation
let isRotateDeviceVisible = false;

function checkOrientation() {
    const rotateDevice = document.getElementById('rotateDevice');
    if (window.innerHeight > window.innerWidth) {
        rotateDevice.style.display = 'flex';
        isRotateDeviceVisible = true;
    } else {
        rotateDevice.style.display = 'none';
        isRotateDeviceVisible = false;
    }
}

function hideRotateDevice() {
    if (isRotateDeviceVisible) {
        document.getElementById('rotateDevice').style.display = 'none';
        isRotateDeviceVisible = false;
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', () => {
    checkOrientation();
    document.getElementById('rotateDevice').addEventListener('click', hideRotateDevice);
});


// Controls für Touch-Devices
document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    const jumpButton = document.getElementById('jumpButton');
    const throwButton = document.getElementById('throwButton');


    leftButton.addEventListener('touchend', (e) => {
        e.stopPropagation();
        keyboard.LEFT = false;
    });

    leftButton.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        keyboard.LEFT = true;
    });

    // document.getElementById('leftButton').addEventListener('touchstart', (e) => {
    //     e.preventDefault();
    //     keyboard.TOUCH_LEFT = true;
    // });
    // document.getElementById('leftButton').addEventListener('touchend', (e) => {
    //     e.preventDefault();
    //     keyboard.TOUCH_LEFT = false;
    // });
    

    rightButton.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        keyboard.RIGHT = true;
    });

    rightButton.addEventListener('touchend', (e) => {
        e.stopPropagation();
        keyboard.RIGHT = false;
    });

    jumpButton.addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
    });

    jumpButton.addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
    });

    throwButton.addEventListener('touchstart', (e) => {

        keyboard.D = true;
    });

    throwButton.addEventListener('touchend', (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        keyboard.D = false;
    });
});


// Control-Button
// let isMuted = false; // Startet standardmäßig ohne Ton

document.addEventListener('DOMContentLoaded', () => {
    const fullscreenButton = document.getElementById('fullscreenButton');
    const soundButton = document.getElementById('soundButton');
    const restartButtonMobile = document.getElementById('restartButton-mobile');

    fullscreenButton.addEventListener('click', toggleFullscreen);
    soundButton.addEventListener('click', toggleSound);
    restartButtonMobile.addEventListener('click', restartGame);

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function toggleSound() {
        checkMute();
    }

    function startBackgroundMusic() {
        backgroundMusic.play().catch(error => {
            console.error('Fehler beim Abspielen der Musik:', error);
        });
    }

    function restartGame() {
        // Deine Logik für den Neustart des Spiels
    }
});

function checkMute() {
    if (isMuted) {
        unmute();
    } else {
        mute();
    }
}

function mute() {
    isMuted = true;
    backgroundMusic.muted = true;
    world.character.walking_sound.muted = true;
    world.character.jump_sound.muted = true;
    // Fügen Sie hier weitere Sounds hinzu, die Sie stummschalten möchten
    document.getElementById('soundButton').classList.add('muted');
}

function unmute() {
    isMuted = false;
    backgroundMusic.muted = false;
    if (world && world.character) {
        world.character.walking_sound.muted = false;
        world.character.jump_sound.muted = false;
    }
    document.getElementById('soundButton').classList.remove('muted');
}