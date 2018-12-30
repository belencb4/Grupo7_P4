const rightArrow = 39;
const leftArrow = 37;
const upArrow = 38;
const downArrow = 40;
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
var counterEnemies = 0;

/* Inicializar el juego */
function iniciarJuego() {
}

/* Init del mapa y del jugador*/
function initPlayerPosition(currentMap) {
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
  
  mapa = currentMap;
}

function initPlayer() {
  player.nivel = level;
  player.vida = 10;
  player.xp = 0;
  player.ataque = 0;
  player.defensa = 0;
}

function startGame() {
    initPlayer();
    enemigo.vida = 3;
    showpopup();
    if(level == -2) initPlayerPosition(map1);
    else if(level == -1) initPlayerPosition(map2);
    document.onkeydown = checkKey;
    pressedSubmit = 0;
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
      changeImage(sumX, sumY);
  }
  else if(event.keyCode == upArrow) {
      switch (player.estadoPartida.direccion) {
          case 3:
              sumY = 0;
              sumX = -1;
              if (mapa[player.estadoPartida.y][player.estadoPartida.x - 1] != "W" && mapa[player.estadoPartida.y][player.estadoPartida.x - 1] != "E") {                  
                if(player.estadoPartida.y < 9 && player.estadoPartida.y > 0 && player.estadoPartida.x < 9 && player.estadoPartida.x > 0) player.estadoPartida.x--;
              }
              break;
              
          case 2:
              sumX = 1;
              sumY = 0;                
              if (mapa[player.estadoPartida.y][player.estadoPartida.x + 1] != "W" && mapa[player.estadoPartida.y][player.estadoPartida.x + 1] != "E") {
                if(player.estadoPartida.x < 9) player.estadoPartida.x++;                    
              }
              break;

          case 0:
              sumX = 0;
              sumY = -1;              
              if (mapa[player.estadoPartida.y - 1][player.estadoPartida.x] != "W" && mapa[player.estadoPartida.y - 1][player.estadoPartida.x] != "W") {
                if(player.estadoPartida.y > 0) player.estadoPartida.y--;
              }
              break;

          case 1:
              sumX = 0;
              sumY = 1;              
              if (mapa[player.estadoPartida.y + 1][player.estadoPartida.x] != "W" && mapa[player.estadoPartida.y + 1][player.estadoPartida.x] != "E") {
                if(player.estadoPartida.y < 9) player.estadoPartida.y++;
              }
              break;
      }
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
      changeImage(sumX, sumY);
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
  else if (element == "enemy") {
      if(counterEnemies < 4) {
        enemigo.ataque = counterEnemies + 1;
        enemigo.defensa = counterEnemies;
      }
      else{
        enemigo.ataque = counterEnemies - 2;
        enemigo.defensa = counterEnemies - 1;
      }
      enemigo.xp = counterEnemies*10;
      enemigo.img = "media/images/" + element + ".png"; //TODO change image enemy
      counterEnemies++;
      imagePlayer.src = enemigo.img;
      //TODO: añadir objetos
      console.log(enemigo);
  }
  else {
    imagePlayer.src = "media/images/" + element + ".png";
  }
}

function showpopup() {
  $("#popup_box").fadeToggle();
  $("#popup_box").css({"visibility":"visible","display":"block"});
  document.body.style.backgroundColor = "rgba(22, 22, 22, 0.637)";
}

function hidepopup() {
  $("#popup_box").fadeToggle();
  $("#popup_box").css({"visibility":"hidden","display":"none"});
  document.body.style.backgroundColor = "white";
}


function getValueForm() {
  pressedSubmit = 1;
  var name = document.getElementById("nameText");
  if (name.value != "") {
    var idName = document.getElementById("name");
    idName.innerHTML = "Name: " + name.value;
    player.nombre = name.value;
    document.getElementById("lives").innerHTML = "Lives: " + player.vida;
    document.getElementById("level").innerHTML = "Level: " + player.nivel;
    document.getElementById("attack").innerHTML = "Attack: " + player.ataque;
    document.getElementById("defense").innerHTML = "Defense: " + player.defensa;
    hidepopup();
  } 
  else {
    alert("Insert a name please");
  }
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


//API >> Atac 

var atacEnemic = $.ajax({
  method: "GET",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&ataque="+enemigo.ataque+"&defensa="+enemigo.defensa,
  
  statusCode: {
    404: function() {
      alert( "No ha funcionat" );
    },
    200: function restarVides(){
      player.vida+=AJAX;
      if(player.vida>10){
        player.vida = 10;
      }else if(player.vida<0){
        player.vida = 0;
      }  
    }
  },
  context: document.body
}).done(function() {
});

var atacJugador = $.ajax({
  method: "GET",
   url: "http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&ataque="+player.ataque+"&defensa="+player.defensa,
  statusCode: {
    404: function() {
      alert( "No ha funcionat" );
    },
    200: function restarVides(){
      enemigo.vida+=AJAX;
      if(enemigo.vida>3){
        enemigo.vida = 3;
      }else if(enemigo.vida<0){
        enemigo.vida = 0;
      }
    }  
  },
  context: document.body
}).done(function() {
});

//API >> Comunicació JSON 
var guardarPartida = $.ajax({
  type: "POST",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot="+slot, 
  contentType: 'application/json', 
  data: JSON.stringify(partida),
  statusCode: {
    404: function() {
      alert( "El slot no esta lliure, esborra un slot i podras guardarla" );
    }
  },
});
var descarregarPartida = $.ajax({
  type: "GET",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot="+slot, 
  contentType: 'application/json', 
  statusCode: {
    404: function() {
      alert( "No existeix cap partida en el slot indicat" );
    },
  },
  });

  var descarregarLlistaSlots = $.ajax({
    type: "GET",
    url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145", 
    contentType: 'application/json', 
    statusCode: {
      404: function() {
        alert( "No existeix cap partida en el slot indicat" );
      },
    },
    });

    var esborrarPartida = $.ajax({
      type: "DELETE",
      url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot="+slot, 
      statusCode: {
        404: function() {
          alert( "No existeix cap partida en el slot indicat" );
        },
      },
      });

// Variables que necessitem que siguin globals : slot(nueva,1,2), partida(objecte que conte tot el que volem guardar de la partida 
// entenc que player,objetos i el mapa ja que si a la partida que ha guardat havia recollit tot ho haurem de canviar del mapa i 
// sera aixo el que enviem), player  i enemigo entenc que ja son globals no?? 



