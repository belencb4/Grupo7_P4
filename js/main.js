const rightArrow = 39;
const leftArrow = 37;
const upArrow = 38;
const downArrow = 40;
const DLetter = 68;
const ALetter = 65;
const spaceKey = 32;

const map1 = [
  ["W", "W", "W", "W", "W", "W", "W", "EX", "W", "W"],
  ["W", "B", "B", "B", "B", "B", "W", "B", "W", "W"],
  ["W", "B", "W", "W", "W", "B", "B", "E", "B", "W"],
  ["W", "E", "B", "B", "B", "W", "W", "W", "W", "W"],
  ["W", "W", "W", "B", "B", "B", "B", "B", "B", "W"],
  ["W", "O", "W", "B", "W", "W", "W", "W", "B", "W"],
  ["W", "B", "W", "B", "B", "B", "B", "W", "B", "W"],
  ["W", "B", "B", "B", "W", "W", "B", "W", "E", "W"],
  ["EN", "B", "B", "B", "W", "B", "O", "W", "O", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
]; 

const map2 = [
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "B", "B", "E", "O", "W", "B", "E", "B", "W"],
  ["W", "B", "W", "B", "E", "W", "O", "W", "B", "W"],
  ["W", "B", "W", "B", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "W", "W", "W", "B", "W"],
  ["W", "O", "W", "B", "W", "B", "B", "B", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "W", "B", "W"],
  ["EX", "B", "W", "B", "B", "B", "W", "B", "B", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "EN", "W", "W"],
]; 

var walk = "1";
var attack = "1";
var defense = "1";
var level = -2;
var sumX = 0;
var sumY = 0;
var elementAux = 0;
var shoot = 0;
var attackStatus = 0;

/* Inicializar el juego */
function iniciarJuego() {
}

/* Init del mapa y del jugador*/
function initPlayer(currentMap) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < currentMap[i].length; j++) {
      let element = currentMap[i][j];
      if (element == "EN") {
        player.estadoPartida.x = j;
        player.estadoPartida.y = i;
        if (j == 0) {
          player.estadoPartida.direccion = 2; //Este
        }
        else if(i == 9) {
          player.estadoPartida.direccion = 0; //Norte
        }
        else if (j == 9) {
          player.estadoPartida.direccion = 3; //Oeste
        }
        else if(i == 0) {
          player.estadoPartida.direccion = 1; //Sud
        }
      }
    }
  }
  player.nivel = level;
  player.vida = 10;
  player.xp = 0;
  player.ataque = 2;
  player.defensa = 2;
  mapa = currentMap;
}

function startGame() {
  if(level == -2) initPlayer(map1);
  else if(level == -1) initPlayer(map2);
  document.onkeydown = checkKey;
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

/* Sets de position and orientation of the player at every move */
function checkKey(e) {
  e = e || window.event;
 
  console.log("before x = " + player.estadoPartida.x);
  console.log("before y = " + player.estadoPartida.y);
  console.log("orientation: " + player.estadoPartida.direccion)
  if(event.keyCode == rightArrow) {
      switch (player.estadoPartida.direccion) {
          case 3: //Oeste - Left
              sumY = -1;
              sumX = 0;
              player.estadoPartida.direccion = 0;
              break;
              
          case 2: //Este - Right
              sumX = 0;
              sumY = 1;
              player.estadoPartida.direccion = 1;
              break;

          case 0: //Norte - Straight
              sumX = 1;
              sumY = 0;
              player.estadoPartida.direccion = 2;
              break;

          case 1: //Sud - Back
              sumX = -1;
              sumY = 0;
              player.estadoPartida.direccion = 3;
              break;
      }  
      shoot = 0;  
      changeImage(sumX, sumY);
  }
  else if(event.keyCode == leftArrow) {
      switch (player.estadoPartida.direccion) {
          case 3:
              sumY = 1;
              sumX = 0;
              player.estadoPartida.direccion = 1;
              break;
              
          case 2:
              sumX = 0;
              sumY = -1;
              player.estadoPartida.direccion = 0;
              break;

          case 0:
              sumX = -1;
              sumY = 0;
              player.estadoPartida.direccion = 3;
              break;

          case 1:
              sumX = 1;
              sumY = 0;
              player.estadoPartida.direccion = 2;
              break;
      }
      shoot = 0;
      changeImage(sumX, sumY);
  }
  else if(event.keyCode == upArrow) {
      switch (player.estadoPartida.direccion) {
          case 3:
              sumY = 0;
              sumX = -1;
              if (mapa[player.estadoPartida.y][player.estadoPartida.x - 1] != "W") {                  
                if(player.estadoPartida.y < 9 && player.estadoPartida.y > 0 && player.estadoPartida.x < 9 && player.estadoPartida.x > 0) player.estadoPartida.x--;
              }
              break;
              
          case 2:
              sumX = 1;
              sumY = 0;                
              if (mapa[player.estadoPartida.y][player.estadoPartida.x + 1] != "W") {
                if(player.estadoPartida.x < 9) player.estadoPartida.x++;                    
              }
              break;

          case 0:
              sumX = 0;
              sumY = -1;              
              if (mapa[player.estadoPartida.y - 1][player.estadoPartida.x] != "W") {
                if(player.estadoPartida.y > 0) player.estadoPartida.y--;
              }
              break;

          case 1:
              sumX = 0;
              sumY = 1;              
              if (mapa[player.estadoPartida.y + 1][player.estadoPartida.x] != "W") {
                if(player.estadoPartida.y < 9) player.estadoPartida.y++;
              }
              break;
      }
      shoot = 0;
      changeImage(sumX, sumY);
  }
  else if(event.keyCode == downArrow) {
      switch (player.estadoPartida.direccion) {
          case 3:
              sumY = 0;
              sumX = 1;              
              player.estadoPartida.direccion = 2;
              break;
              
          case 2:
              sumX = -1;
              sumY = 0;              
              player.estadoPartida.direccion = 3;
              break;

          case 0:
              sumX = 0;
              sumY = 1;              
              player.estadoPartida.direccion = 1;
              break;

          case 1:
              sumX = 0;
              sumY = -1;              
              player.estadoPartida.direccion = 0;
              break;
      }
      shoot = 0;
      changeImage(sumX, sumY);
  }
  else if(event.keyCode == DLetter) {
    shoot = 0;
    elementFound("defense");
  }
  else if(event.keyCode == ALetter) {
      shoot = 0;
      elementFound("attack");
  }
  else if(event.keyCode == spaceKey) {
    shoot = 1;
    if (attackStatus) {
      elementFound("shoot");
    }
  }
}

/* Function that depending of the element in the map, shows the equivalent image */
function changeImage(sumX, sumY) {
  switch (mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX]) {
    case "W":
        elementFound("wall");
        break;

    case "O":
        elementFound("object");
        break;

    case "E":
        elementFound("enemy");
        break;

    case "EX":
        elementFound("door");
        break;

    default:
        elementFound("walk");
        break;
  } 
}

/* Function which sets de images */
function elementFound(element){
  var imagePlayer = document.getElementById("imageScreen");  
  if (element == "walk") {
      if(walk == "1") {
          walk = "2";
      }
      else {
          walk = "1";
      }
      imagePlayer.src = "media/images/" + element + walk + ".png";
  } 
  else if(element == "attack" || element == "defense") {
    if(element == "attack") attack = controlImageFight(element, attack);
    else if (element == "defense") defense = controlImageFight(element,defense);
    else if(element == "shoot") controlImageFight(element, attack);
  }
  else {
      imagePlayer.src = "media/images/" + element + ".png";
  }
}

/*Function that controls when the player has to see a shield or an arm or nothing at all */
function controlImageFight(string, element) {
  var imagePlayer = document.getElementById("imageScreen");
  if (string != elementAux) element = "1";
  if(element == "1"){ // in attack mode    
    if(mapa[player.estadoPartida.y+ sumY][player.estadoPartida.x + sumX] == "B") {
      element = "2"; //Attack to blank
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "EN") {
      element = "2";
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "E") {
      element = "3"; //Attack to enemy
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "O") {
      element = "4"; //Attack to object
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "W") {
      element = "5"; //Attack to wall
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "EX") {
      element = "6"; //Attack to exit door
    }
    if (string == "attack") attackStatus = 1;
    imagePlayer.src = "media/images/" + string + element + ".png";
  }
  else {  
    if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "B") {
      if (shoot) {
        setTimeout(function(){  
         
          
          imagePlayer.src = "media/images/shoot2.png";
          ;},100);
          string = "attack2";
          element = 1;
          shoot = 0;
      }
      else {
        string = "walk1";
      }
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "EN") {
      string = "walk1";
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "E") {
      string = "enemy";
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "O") {
      string = "object";
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "W") {
      string = "wall";
    }
    else if(mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX] == "EX") {
      string = "door";
    }    
    element = "1";
    if (string == "attack") attackStatus = 0;
    imagePlayer.src = "media/images/" + string + ".png";
  }
  elementAux = string;
  return element;
}

/*var ajaxASYNC = {
    request : function request(url){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener);
        xhr.open("GET", url, true);
        xhr.send();
    }

};

function reqListener () {
    let object = JSON.parse(this.responseText);
    console.log(this.response);
}

window.onload =    ajaxASYNC.request("http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&ataque=1&defensa=2");*/
/*
//intent de jquery no va
$.ajax({
    url: "http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&ataque=1&defensa=2",
    statusCode: {
        404: function() {
          alert( "page not found" );
        }
      },
    context: document.body
  }).done(function() {
  });

window.onload = $.ajax;*/