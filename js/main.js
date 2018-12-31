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
  ["W", "O", "W", "O", "W", "W", "W", "W", "B", "W"],
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
  ["W", "O", "W", "B", "W", "B", "B", "B", "O", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "W", "B", "W"],
  ["EX", "B", "W", "B", "B", "B", "W", "B", "B", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "EN", "W", "W"],
]; 

var walk = "1";
var level = -2;
var sumX = 0;
var sumY = 0;
var counterEnemies = 0;
var counterObjects = 0;
var turnFight = 0;
var fighting = 0;
var attackValue = 0;
var defenseValue = 0;
let object = 0;
let slot = 1;
let running = 1;
let firstClick = 1;
var canFight = 0;

/* Inicializar el juego */
function iniciarJuego() {
}

function initObjetos() {
  objetos["garrote"] = {ataque:4, defensa:2, status:0}; //Si status = 0, el objeto no se ha cogido
  objetos["espada"] = {ataque:4, defensa:3, status:0};
  objetos["llave"] = {ataque:1, defensa:0, status:0};
  objetos["pistola"] = {ataque:5, defensa:1, status:0};
  objetos["escudo"] = {ataque:1, defensa:5, status:0}
  objetos["ametralladora"] = {ataque:5, defensa:2, status:0};
  objetos["hacha"] = {ataque:3, defensa:4, status:0};
  objetos["bomba"] = {ataque:5, defensa:3, status:0};
  //console.log(Object.keys(objetos)[2]);
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
  player.manoderecha = "";
}

function startGame() {
  if (running) {
    running = 0;
    initPlayer();
    enemigo.vida = 8;
    initObjetos();
    showpopup();
    if(level == -2) initPlayerPosition(map1);
    else if(level == -1) initPlayerPosition(map2);
    document.onkeydown = checkKey;
  }
  else {
    alert("You must finish the game before starting a new game");
  }
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

/* Sets de position and orientation of the player at every move */
function checkKey(e) {
  e = e || window.event;
  if(!fighting) {
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
      else {
        enemigo.ataque = counterEnemies - 2;
        enemigo.defensa = counterEnemies - 1;
      }
      enemigo.xp = counterEnemies*10;
      enemigo.img = "media/images/" + element + ".png"; //TODO change image enemy
      imagePlayer.src = enemigo.img;
      if (!canFight) {
        alert("Please select two objects for the fight");
      }
      else {
        counterEnemies++;
        getObjectsFight();
        attackValue = player.ataque;
        defenseValue = enemigo.defensa;
        enemigo.vida = 8;
        ajaxASYNC.request("http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&ataque="+ attackValue + "&defensa="+ defenseValue);
        let fightData = document.getElementById("fight");
        fightData.style.display = "block";
        setTimeout(function(){ fightEnemy(); }, 2000); 
        canFight = 0;     
      }
  }
  else if(element == "object") {
    fighting = 1;
    imagePlayer.src = "media/images/object.png"; 
    if(counterObjects < 8) {
      setTimeout(function() { imagePlayer.src = "media/images/object" + Object.keys(objetos)[counterObjects - 1] + ".png";}, 1500);
      var bag = document.getElementById("gridBag");
      var imgObject = document.createElement('img');
      imgObject.id = Object.keys(objetos)[counterObjects];
      imgObject.setAttribute("object",  Object.keys(objetos)[counterObjects]);
      Listener.add(imgObject, "click", Listener.eventTap, true);
      bag.appendChild(imgObject);
      setTimeout(function() {
        imgObject.src = "media/images/" + Object.keys(objetos)[counterObjects - 1] + ".png";
        fighting = 0;}, 2000);
      counterObjects++;
      for(var i = -1; i < 2; i++) {
        for(var j = -1; j < 2; j++){
          if (mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] == "O") {
            mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] = "B";
          }
        } 
      }
    }
    else {
      counterObjects = 0;
    }
  }
  else {
    imagePlayer.src = "media/images/" + element + ".png";
  }
}

const Listener = {
  add: function add(object, event, callback, capture) {
    object.addEventListener(event, callback, capture);
  },

  eventTap: function(event) {
      event.preventDefault();

      clickObject(event.target.getAttribute("object"));
  }
};

function clickObject(object) {  
  if(firstClick == 1) {
    player.manoderecha = object;
    document.getElementById("rightHand").innerHTML = "Right hand: " + player.manoderecha;
    firstClick = 0;
    canFight = 0;
  }
  else if (!firstClick){
    player.manoizquierda = object;
    document.getElementById("leftHand").innerHTML = "Left hand: " + player.manoizquierda;
    canFight = 1;
    firstClick = 2;
  }
  else {
    canFight = 1;
    alert("You already have an object for each hand");
  }
}

function refreshData() {
  document.getElementById("lives").innerHTML = "Lives: " + player.vida;
  document.getElementById("level").innerHTML = "Level: " + player.nivel;
  document.getElementById("attack").innerHTML = "Attack: " + player.ataque;
  document.getElementById("defense").innerHTML = "Defense: " + player.defensa;
  document.getElementById("xp").innerHTML = "Experiencia: " + player.xp;
  document.getElementById("vidasEnemigo").innerHTML = "Enemy lives: " + enemigo.vida;
  document.getElementById("rightHand").innerHTML = "Right hand: " + player.manoderecha;
  document.getElementById("leftHand").innerHTML = "Left hand: " + player.manoizquierda;

  if (!turnFight) {
    document.getElementById("turn").innerHTML = "Turn: Player";
  }
  else {
    document.getElementById("turn").innerHTML = "Turn: Enemy";
  }
}

var ajaxASYNC = {
    request : function request(url){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListener);
        xhr.open("GET", url, true);
        xhr.send();
    }
};
function reqListener () {
    object = JSON.parse(this.responseText);
}
 
function getObjectsFight() {

    player.ataque = player.ataque + objetos[player.manoderecha].ataque + objetos[player.manoizquierda].ataque;
    player.defensa = player.defensa + objetos[player.manoderecha].defensa + objetos[player.manoizquierda].defensa;
    refreshData();
}

function fightEnemy() {
  fighting = 1;
  if (firstClick == 2) {
    refreshData();  

    if (turnFight == 0) { //player's turn    
      turnFight++;
      attackValue = enemigo.ataque;
      defenseValue = player.defensa;
      if (object > 0) {
        enemigo.vida = enemigo.vida - object;
      }
      else if (object < 0){
        player.vida = player.vida + object; //Se suma porque object negativo
      }
    }
    else {
      turnFight = 0;
      attackValue = player.ataque;
      defenseValue = enemigo.defensa;
      
      if (object > 0) {
        player.vida = player.vida - object;
      }
      else if (object < 0){
        enemigo.vida = enemigo.vida + object; //Se suma porque object negativo
      }
    }

    if (enemigo.vida <= 0 || player.vida <= 0){
      if (enemigo.vida < 0) {
        enemigo.vida = 0;
      }
      else if(player.vida < 0) {
        player.vida = 0;
      }
      setTimeout(function(){ endFight();}, 2000);
    }
    else {
      ajaxASYNC.request("http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&ataque="+ attackValue + "&defensa="+ defenseValue);
      setTimeout(function(){ fightEnemy(); }, 2000);
    }
  }  
  else {
    alert("Please select two objects first.");
  }
}

function endFight(){
  firstClick = 1;
  player.manoderecha = "";
  player.manoizquierda = ""
  let fightData = document.getElementById("fight");
  fightData.style.display = "none";
  fighting = 0;
  player.ataque = 0;
  player.defensa = 0;
  if (enemigo.vida <= 0) {
    elementFound("walk");
    player.xp = enemigo.xp;
    for(var i = -1; i < 2; i++) {
      for(var j = -1; j < 2; j++){
        if (mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] == "E") {
          mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] = "B";
        }
      } 
    }
    enemigo.vida = 8;
    refreshData();
  }
  else if(player.vida == 0) {
    running = 1;
    //TODO GameOver
  }  
}

function saveGame() {
  partida["player"] = player;
  partida["mapa"] = mapa;
  partida["objetos"] = objetos;
  partida["counterEnemies"] = counterEnemies;
  partida["level"] = level;

  $.post('http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=1', "json=" + JSON.stringify(partida), function(){ 
      alert("success");
  });
}

var esborrarPartida = $.ajax({
  type: "DELETE",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=1", 
  statusCode: {
    404: function() {
      alert( "No existeix cap partida en el slot indicat" );
    },
  },
  });

//API >> Comunicació JSON 
/*var guardarPartida = $.ajax({
  type: "POST",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot="+slot, 
  contentType: 'application/json', 
  data: JSON.stringify(partida),
  statusCode: {
    404: function() {
      alert( "El slot no está libre, borra un slot y podras guardarla" );
    }
  },
});

/*
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

*/

// Variables que necessitem que siguin globals : slot(nueva,1,2), partida(objecte que conte tot el que volem guardar de la partida 
// entenc que player,objetos i el mapa ja que si a la partida que ha guardat havia recollit tot ho haurem de canviar del mapa i 
// sera aixo el que enviem), player  i enemigo entenc que ja son globals no?? 

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
  var name = document.getElementById("nameText");
  if (name.value != "") {
    var idName = document.getElementById("name");
    idName.innerHTML = "Name: " + name.value;
    player.nombre = name.value;
    refreshData();
    hidepopup();
  } 
  else {
    alert("Insert a name please");
  }
}
