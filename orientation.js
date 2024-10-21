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