
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My Character:', world.character);
    
}

window.addEventListener('keypress', (event) => {

    console.log('Keydown:', event);
});