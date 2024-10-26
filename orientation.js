let isRotateDeviceVisible = false;

/**
 * Checks the screen orientation and displays a rotate device prompt if in portrait mode.
 */
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

/**
 * Hides the rotate device prompt if it is currently visible.
 */
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

    /**
     * Event listener for starting left movement on touchstart.
     */
    leftButton.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.LEFT = true;
    });

    /**
     * Event listener for stopping left movement on touchend.
     */
    leftButton.addEventListener('touchend', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.LEFT = false;
    });

    /**
     * Event listener for starting right movement on touchstart.
     */
    rightButton.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    /**
     * Event listener for stopping right movement on touchend.
     */
    rightButton.addEventListener('touchend', (e) => {
        e.stopPropagation();
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    /**
     * Event listener for starting jump on touchstart.
     */
    jumpButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        keyboard.SPACE = true;
    });

    /**
     * Event listener for stopping jump on touchend.
     */
    jumpButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        keyboard.SPACE = false;
    });

    /**
     * Event listener for starting throw action on touchstart.
     */
    throwButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        keyboard.D = true;
    });

    /**
     * Event listener for stopping throw action on touchend.
     */
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

    /**
     * Toggles fullscreen mode on or off.
     */
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

/**
 * Toggles sound muting or unmuting based on the current state.
 */
function checkMute() {
    if (isMuted) {
        unmute();
    } else {
        mute();
    }
}

/**
 * Mutes all sounds in the game.
 */
function mute() {
    isMuted = true;
    if (backgroundMusic) backgroundMusic.muted = true;
    if (world && world.character) {
        world.character.walking_sound.muted = true;
        world.character.jump_sound.muted = true;
    }
    world.damageSound.muted = true;
    document.getElementById('soundButton').classList.add('muted');
}

/**
 * Unmutes all sounds in the game.
 */
function unmute() {
    isMuted = false;
    if (backgroundMusic) backgroundMusic.muted = false;
    if (world && world.character) {
        world.character.walking_sound.muted = false;
        world.character.jump_sound.muted = false;
    }
    world.damageSound.muted = false;
    document.getElementById('soundButton').classList.remove('muted');
}

/**
 * Toggles the visibility of the help overlay and handles click events to close it.
 */
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

/**
 * Closes the help overlay if the click occurred outside its content.
 * @param {MouseEvent} event - The mouse event triggering the close action.
 */
function closeHelpOverlayOnClickOutside(event) {
    const overlay = document.getElementById('helpOverlay');
    
    if (event.target === overlay) {
        overlay.style.display = 'none';
        window.removeEventListener('click', closeHelpOverlayOnClickOutside);
    }
}
