
let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;

function init() {
    canvas = document.getElementById('canvas');

    backgroundMusic = new Audio('audio/la_cucaracha.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    document.addEventListener('click', startBackgroundMusic, { once: true });
}

function startBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
    });
}

function startGame() {
    initLevel();
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';

    world = new World(canvas, keyboard);
    world.start();
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

    document.getElementById('restartButton').style.display = 'none';
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

function isMobileDevice() {
    return (window.innerWidth <= 768); // Prüft auf typische mobile Bildschirmgröße (max. 768px Breite)
  }
  
  function checkOrientation() {
    if (isMobileDevice() && window.innerHeight > window.innerWidth) {
      // Gerät ist ein Mobilgerät und im Portrait-Modus
      document.getElementById('landscape-warning').classList.add('visible');
      document.getElementById('buttons-container').style.display = 'none'; // Buttons ausblenden
    } else {
      // Entweder kein Mobilgerät oder im Landscape-Modus
      document.getElementById('landscape-warning').classList.remove('visible');
      document.getElementById('buttons-container').style.display = 'block'; // Buttons anzeigen
    }
  }
  
  // Event Listener für das Ändern der Ausrichtung
  window.addEventListener('resize', checkOrientation);
  
  // Initialer Check beim Laden der Seite
  checkOrientation();
  
  
  
  // Overlay Button Logik
  document.getElementById('overlay-button').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'flex'; // Overlay anzeigen
  });
  
  document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none'; // Overlay schließen
  });
  
  // Script Button Logik
  document.getElementById('script-button').addEventListener('click', function() {
    // Hier kommt dein Skript hin
    alert("Script wird gestartet!");
  });
  
  