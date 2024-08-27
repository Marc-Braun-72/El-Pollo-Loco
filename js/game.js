
let canvas;
let ctx;
let charakter = new MoveableObjects();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    console.log('My Character is ',charakter);


    // charakter.src = "../images/2_character_pepe/2_walk/W-21.png";

    // setTimeout( function() {
    //     ctx.drawImage(charakter, 20, 20, 50, 100);
    // }, 2000)

    
}