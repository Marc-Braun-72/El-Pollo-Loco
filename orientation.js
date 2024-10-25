
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
        e.preventDefault();
        e.stopPropagation();
        keyboard.SPACE = true;
    });

    jumpButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        keyboard.SPACE = false;
    });

    throwButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        keyboard.D = true;
    });

    throwButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        keyboard.D = false;
    });
});

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
    if (backgroundMusic) {
        backgroundMusic.muted = true;
    }

    if (world && world.character) {
        world.character.walking_sound.muted = true;
        world.character.jump_sound.muted = true;
    }

    world.damageSound.muted = true;
    
    if (world.throwableObjects) {
        world.throwableObjects.forEach(bottle => {
            if (bottle.bottleSound) {
                bottle.bottleSound.muted = true;
            }
        });
    }
    
    if (world.coins) {
        world.coins.forEach(coin => {
            if (coin.coinSound) {
                coin.coinSound.muted = true;
            }
        });
    }
    document.getElementById('soundButton').classList.add('muted');
}

function unmute() {
    isMuted = false;
    if (backgroundMusic) {
        backgroundMusic.muted = false;
    }

    if (world && world.character) {
        world.character.walking_sound.muted = false;
        world.character.jump_sound.muted = false;
    }

    world.damageSound.muted = false;
    
    if (world.throwableObjects) {
        world.throwableObjects.forEach(bottle => {
            if (bottle.bottleSound) {
                bottle.bottleSound.muted = false;
            }
        });
    }
    
    if (world.coins) {
        world.coins.forEach(coin => {
            if (coin.coinSound) {
                coin.coinSound.muted = false;
            }
        });
    }
    document.getElementById('soundButton').classList.remove('muted');
}


function toggleHelpOverlay() {
    const overlay = document.getElementById('helpOverlay');
    
    if (overlay.style.display === 'none' || overlay.style.display === '') {
        overlay.style.display = 'flex';
        window.addEventListener('click', closeHelpOverlayOnClickOutside);
        document.querySelector('.help-overlay-content').addEventListener('click', function(event) {
            event.stopPropagation();
        });
    } else {
        overlay.style.display = 'none';
        window.removeEventListener('click', closeHelpOverlayOnClickOutside);
    }
}

function closeHelpOverlayOnClickOutside(event) {
    const overlay = document.getElementById('helpOverlay');
    
    if (event.target === overlay) {
        overlay.style.display = 'none';
        window.removeEventListener('click', closeHelpOverlayOnClickOutside);
    }
}