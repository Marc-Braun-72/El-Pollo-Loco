// Detect Landscape-Orientation
let isRotateDeviceVisible = false;

function checkOrientation() {
    let rotateDevice = document.getElementById('rotateDevice');
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
    let leftButton = document.getElementById('leftButton');
    let rightButton = document.getElementById('rightButton');
    let jumpButton = document.getElementById('jumpButton');
    let throwButton = document.getElementById('throwButton');


    leftButton.addEventListener('touchend', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.LEFT = false;
    });

    leftButton.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.LEFT = true;
    });

    rightButton.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    rightButton.addEventListener('touchend', (e) => {
        e.stopPropagation();
        e.preventDefault();
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
document.addEventListener('DOMContentLoaded', () => {
    let fullscreenButton = document.getElementById('fullscreenButton');
    let soundButton = document.getElementById('soundButton');
    let restartButtonMobile = document.getElementById('restartButton-mobile');

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