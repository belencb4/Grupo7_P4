const rightArrow = 39;
const leftArrow = 37;
const upArrow = 38;
const downArrow = 40;
const spaceKey = 32;
const enter = 13;
const rows = 10;
const columns = 10;

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
  ["W", "B", "B", "B", "O", "W", "B", "E", "B", "W"],
  ["W", "B", "W", "B", "B", "W", "O", "W", "B", "W"],
  ["W", "B", "W", "B", "B", "W", "B", "W", "B", "W"],
  ["W", "E", "W", "B", "W", "W", "W", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "B", "B", "O", "W"],
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
let slot = 0;
let running = 1;
let firstClick = 1;
var canFight = 0;
var optionPopup = 0;
var slots = []
var saveNow = 0;
var currentElement = 0;

window.onload = function() {

  /*$.ajax({
  type: "DELETE",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=nueva", 
  statusCode: {
    404: function() {
      alert( "No existeix cap partida en el slot indicat" );
    },
  },
  });*/

  /*partida["player"] = player;
  partida["enemigo"] = enemigo;
  partida["mapa"] = map1;
  partida["objetos"] = objetos;
  partida["counterEnemies"] = counterEnemies;
  partida["counterObjects"] = counterObjects;
  partida["fighting"] = fighting;
  partida["running"] = running;
  partida["turnFight"] = turnFight;
  partida["firstClick"] = firstClick;
  partida["canFight"] = canFight;
  console.log(JSON.stringify(partida));*/
  slot = "nueva"
  loadGame();
}

function loadGame() {
  running = 1;
  $.get( "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=" + slot, function(responseText) {
    partida = JSON.parse(responseText);   
    enemigo = partida["enemigo"];
    running = partida["running"];
    player = partida["player"];
    mapa = partida["mapa"];
    objetos = partida["objetos"];
    counterEnemies = partida["counterEnemies"];
    counterObjects = partida["counterObjects"];
    turnFight = partida["turnFight"];
    fighting = partida["fighting"];
    firstClick = partida["firstClick"];
    canFight = partida["canFight"]; 
    createMinimap();  
    console.log(player);

  });  
  
}

/* Inicializar el juego */
function iniciarJuego() {
  
}

/*function initObjetos() {
  objetos["garrote"] = {ataque:4, defensa:2, status:0}; //Si status = 0, el objeto no se ha cogido
  objetos["espada"] = {ataque:4, defensa:3, status:0};
  objetos["llave"] = {ataque:1, defensa:1, status:0};
  objetos["pistola"] = {ataque:5, defensa:1, status:0};
  objetos["escudo"] = {ataque:1, defensa:5, status:0}
  objetos["ametralladora"] = {ataque:5, defensa:2, status:0};
  objetos["hacha"] = {ataque:3, defensa:4, status:0};
  objetos["bomba"] = {ataque:5, defensa:3, status:0};
  objetos["tronco"] = {ataque:2, defensa:0, status:1};
  objetos["granada"] = {ataque:4, defensa:0, status:1};
  objetos["lanza"] = {ataque:2, defensa:1, status:1};
  objetos["puerta"] = {ataque:0, defensa:4, status:1};
  objetos["escopeta"] = {ataque:4, defensa:0, status:1};
  objetos["puñal"] = {ataque:3, defensa:2, status:1};
  //console.log(Object.keys(objetos)[2]);
}*/


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

/* function initPlayer() {
  player.nivel = level;
  player.vida = 10;
  player.xp = 0;
  player.ataque = 0;
  player.defensa = 0;
  player.manoderecha = "";
  player.manoizquierda = "";
}*/

function startGame() {  
  if (running) {
    running = 0;
    enemigo.vida = 8;
    if(level == -2){
      optionPopup = "start";
      document.getElementById("info_text").innerHTML = "Name: <input id='nameText' type='text' name='firstname'><br><input type='button' id='submit_button' value='Submit' onclick='getValueForm()'>";
      showpopup();
      initPlayerPosition(map1);
    }
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

function createMinimap() {
  console.log(mapa);
  
  const grid = document.getElementById('minimapa');
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement('section');
      cell.className = "cell";
      cell.id = "col" + j + "row" + i;
      cell.setAttribute('column', j);
      cell.setAttribute('row', i);
      grid.appendChild(cell);
      cell.style.border = "1px solid black";
      updateMinimap(i, j, cell);
    }
  }
}

function updateMinimap(i, j, cell){
  if (mapa[i][j] == "B"){
    cell.style.backgroundColor = "white";
  } else if (mapa[i][j] == "W") {
    cell.style.backgroundColor = "black";
  } else if (mapa[i][j] == "O") {
    cell.style.backgroundColor = "blue";
  } else if (mapa[i][j] == "E") {
    cell.style.backgroundColor = "red";
  } else if (mapa[i][j] == "EN") {
    cell.style.backgroundColor = "yellow";
  } else if (mapa[i][j] == "EX") {
    cell.style.backgroundColor = "green";
  }
}

/* Sets de position and orientation of the player at every move */
function checkKey(e) {
  
  //e.preventDefault();  
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
                if(player.estadoPartida.y < 9 && player.estadoPartida.y > 0 && player.estadoPartida.x < 9 && player.estadoPartida.x > 0){
                  var cell = document.getElementById("col" + player.estadoPartida.x + "row" + player.estadoPartida.y);
                  cell.style.backgroundColor = "white";
                  player.estadoPartida.x--;
                }
              }
              break;
              
          case 2:
              sumX = 1;
              sumY = 0;                
              if (mapa[player.estadoPartida.y][player.estadoPartida.x + 1] != "W" && mapa[player.estadoPartida.y][player.estadoPartida.x + 1] != "E") {
                if(player.estadoPartida.x < 9){
                  var cell = document.getElementById("col" + player.estadoPartida.x + "row" + player.estadoPartida.y);
                  cell.style.backgroundColor = "white";
                  player.estadoPartida.x++;  
                }                  
              }
              break;

          case 0:
              sumX = 0;
              sumY = -1;              
              if (mapa[player.estadoPartida.y - 1][player.estadoPartida.x] != "W" && mapa[player.estadoPartida.y - 1][player.estadoPartida.x] != "W") {
                if(player.estadoPartida.y > 0){
                  var cell = document.getElementById("col" + player.estadoPartida.x + "row" + player.estadoPartida.y);
                  cell.style.backgroundColor = "white";
                  player.estadoPartida.y--;
                }
              }
              break;

          case 1:
              sumX = 0;
              sumY = 1;              
              if (mapa[player.estadoPartida.y + 1][player.estadoPartida.x] != "W" && mapa[player.estadoPartida.y + 1][player.estadoPartida.x] != "E") {
                if(player.estadoPartida.y < 9){
                  var cell = document.getElementById("col" + player.estadoPartida.x + "row" + player.estadoPartida.y);
                  cell.style.backgroundColor = "white";
                  player.estadoPartida.y++;
                }
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
      
  }else if (event.keyCode == enter) { 
        e.preventDefault();  
      }
  }
}

/* Function that depending of the element in the map, shows the equivalent image */
function changeImage(sumX, sumY) {
  var cell = document.getElementById("col" + player.estadoPartida.x + "row" + player.estadoPartida.y);
  cell.style.backgroundColor = "yellow";
  if (mapa[player.estadoPartida.y][player.estadoPartida.x] == "EX") {
    level = -1;
    player.nivel = -1;
    mapa = map2;
    currentMap = map2;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        var cell = document.getElementById("col" + j + "row" + i);
        updateMinimap(i, j, cell);
      }
    }
    running = 1;
    startGame();
  }
  switch (mapa[player.estadoPartida.y + sumY][player.estadoPartida.x + sumX]) {
    case "W":
        //document.getElementsByClassName('wall'+i).className = "cami";
        elementFound("wall");
        
        break;

    case "O":
        elementFound("object");
        //document.getElementById('object'+x).className = "buit"+i;
        break;

    case "E":
        elementFound("enemy");
       // document.getElementById('enemic'+i).className ="buit"+i;
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
  currentElement = element;
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
    turnFight = 0;
      if(counterEnemies < 4) {
        enemigo.ataque = counterEnemies + 1;
        enemigo.defensa = counterEnemies;
        if (counterEnemies == 0) enemigo.objetos = Object.keys(objetos)[8]; 
        if (counterEnemies == 1) enemigo.objetos = Object.keys(objetos)[9]; 
        if (counterEnemies == 2) enemigo.objetos = Object.keys(objetos)[10];  
        if (counterEnemies == 3) enemigo.objetos = Object.keys(objetos)[11];  
      }
      else {
        if (counterEnemies == 4) enemigo.objetos = Object.keys(objetos)[12]; 
        if (counterEnemies == 5) enemigo.objetos = Object.keys(objetos)[13];  
        if (counterEnemies > 5) enemigo.objetos = Object.keys(objetos)[8]; 
        enemigo.ataque = counterEnemies - 2;
        enemigo.defensa = counterEnemies - 1;
      }
      console.log(enemigo);
      
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
        defenseValue = enemigo.defensa + objetos[enemigo.objetos].defensa;
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
    if(counterObjects < 9) {
      counterObjects++;
      setTimeout(function() { imagePlayer.src = "media/images/object" + Object.keys(objetos)[counterObjects - 1] + ".png";}, 1500);
      addObjectToBag(Object.keys(objetos)[counterObjects - 1]);
      for(var i = -1; i < 2; i++) {
        for(var j = -1; j < 2; j++){
          if (mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] == "O") {
            mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] = "B";
            let y = player.estadoPartida.y + i;
            let x = player.estadoPartida.x + j;
            var cell = document.getElementById("col" + x + "row" + y);
            console.log(cell.style.backgroundColor);
            
            cell.style.backgroundColor = "white";
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
  console.log(player);
  
  document.getElementById("name").innerHTML = "Name: " + player.nombre;
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
      attackValue = enemigo.ataque + objetos[enemigo.objetos].ataque;
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
      defenseValue = enemigo.defensa + objetos[enemigo.objetos].defensa;
      
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
    counterObjects++;
    addObjectToBag(enemigo.objetos);
    player.xp = enemigo.xp;
    for(var i = -1; i < 2; i++) {
      for(var j = -1; j < 2; j++){
        if (mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] == "E") {
          mapa[player.estadoPartida.y + i][player.estadoPartida.x + j] = "B";
          let y = player.estadoPartida.y + i;
          let x = player.estadoPartida.x + j;
          var cell = document.getElementById("col" + x + "row" + y);
          cell.style.backgroundColor = "white";
        }
      } 
    }
    enemigo.vida = 8;
    refreshData();
  }
  else if(player.vida == 0) {
    elementFound("walk");
    refreshData();
    alert("Game Over. Press start if you want to play again.");
    slot = "nueva";
    loadGame();
    refreshData();
    for (let i = 0; i < player.mochila.length; i++) {
      addObjectToBag(player.mochila[i]);
    }
    //TODO GameOver
  }  
}

function addObjectToBag(currentObject){
  console.log(currentObject);
  
  if (counterObjects < 8) {
    var bag = document.getElementById("gridBag");
    var imgObject = document.createElement('img');
    imgObject.id = currentObject;
    imgObject.setAttribute("object",  currentObject);
    Listener.add(imgObject, "click", Listener.eventTap, true);
    bag.appendChild(imgObject);
    setTimeout(function() {
      imgObject.src = "media/images/" + currentObject + ".png";
      fighting = 0;}, 500);
    player.mochila[counterObjects-1] = currentObject;
  }
  else {
    alert("You can have a maximum of 8 objects in your bag.");
  }
}

function saveGame() {
 document.getElementById("info_text").innerHTML = "Select slot. Insert 1 or 2: <input id='nameText' type='text' name='firstname'><br><input type='button' id='submit_button' value='Submit' onclick='getValueForm()'>";
 optionPopup = "save";
 showpopup(); 
}

function deleteGame() {
  document.getElementById("info_text").innerHTML = "Select slot. Insert 1 or 2: <input id='nameText' type='text' name='firstname'><br><input type='button' id='submit_button' value='Submit' onclick='getValueForm()'>";
  optionPopup = "delete";
  showpopup(); 
}

function recoverGame() {
  document.getElementById("info_text").innerHTML = "Select slot. Insert 1 or 2: <input id='nameText' type='text' name='firstname'><br><input type='button' id='submit_button' value='Submit' onclick='getValueForm()'>";
  optionPopup = "recover";
  showpopup(); 
}

/*function descarregarPartida() {
  return $.ajax({
  type: "GET",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=nueva", 
  contentType: 'application/json', 
  statusCode: {
    404: function() {
      alert( "No existeix cap partida en el slot indicat" );
    },
  },
  });
}
/*var esborrarPartida = $.ajax({
  type: "DELETE",
  url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=nueva", 
  statusCode: {
    404: function() {
      alert( "No existeix cap partida en el slot indicat" );
    },
  },
  });
 /*
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
  
//API >> Comunicació JSON 
/*var descarregarLlistaSlots = $.ajax({
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
   
  switch(optionPopup){ 
  case "start":
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
    break;
  case "save":
    var optionSlot = document.getElementById("nameText");
    if (optionSlot.value != '1' && optionSlot.value != '2') {
      alert("Insert number 1 or 2 please");
    }
    else {
      slot = 0;
        
      $.get( "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145", function(responseText) {
        slots = JSON.parse(responseText);          
      });
      setTimeout(function(){      
        if (slots.length == 3) {
          slot = 3;
          alert("All slots are full, delete one before saving the game.");
          hidepopup();
        }
        else {
          for(var i = 0; i < slots.length; i++){
            if (optionSlot.value == '1') {
              if (slots[i] == "1") {
                slot = 3;
                alert("This slot is already full, select another one or delete the game of the slot.");
              }
            }
            else if(optionSlot.value == "2"){
              if (slots[i] == "2") {
                slot = 3;
                alert("This slot is already full, select another one or delete the game of the slot.");
              }
            }
          }
        }
        if (slot != 3) {
          if (optionSlot.value == '1') {
            slot = 1;
            hidepopup();
          }
          else if (optionSlot.value == '2') {
            slot = 2;
            hidepopup();
          }
        }
        if(slot != 3) {
          
          partida["player"] = player;
          partida["enemigo"] = enemigo;
          partida["mapa"] = mapa;
          partida["objetos"] = objetos;
          partida["counterEnemies"] = counterEnemies;
          partida["counterObjects"] = counterObjects;
          partida["fighting"] = fighting;
          partida["running"] = running;
          partida["turnFight"] = turnFight;
          partida["firstClick"] = firstClick;
          partida["canFight"] = canFight;
          partida["image"] =  currentElement;
          console.log(partida);


          $.post('http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=' + slot, "json=" + JSON.stringify(partida), function(){ 
           alert("Game saved at slot " + slot); });
        }
      },1000); 
    } 
      break;
    case "delete":
      slot = 0;
      var optionSlot = document.getElementById("nameText");
      if (optionSlot.value != '1' && optionSlot.value != '2') {
        alert("Insert number 1 or 2 please");
      }
      else {
        $.get( "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145", function(responseText) {
          slots = JSON.parse(responseText);          
        });
        setTimeout(function() {
          if (slots.length == 0) {
            alert("Slots are empty, you can save a game.");
            hidepopup();
          }
          else {
            for(var i = 0; i < slots.length; i++){
              if (optionSlot.value == '1') {
                if (slots[i] == "1") {
                    slot = 1;
                    deleteGameAjax();                  
                    alert("Slot 1 deleted");
                    hidepopup();
                }    
              }
              else if (optionSlot.value == "2"){
                  if (slots[i] == "2") {
                      slot = 2;
                      deleteGameAjax();
                      alert("Slot 2 deleted");
                      hidepopup();
                  }
              }
            }
          }
          if (slot != 1 && slot != 2) {
            alert("Empty slot");
            hidepopup();
          }
        }, 300);
      } 
    break;

    case "recover":
      slot = 0;
      var optionSlot = document.getElementById("nameText");
      if (optionSlot.value != '1' && optionSlot.value != '2') {
        alert("Insert number 1 or 2 please");
      }
      else {
        $.get( "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145", function(responseText) {
          slots = JSON.parse(responseText);          
        });
        setTimeout(function() {
          if (slots.length == 0) {
            alert("Slots are empty, you can't recover a game.");
            hidepopup();
          }
          else {
            for(var i = 0; i < slots.length; i++){
              if (optionSlot.value == '1') {
                if (slots[i] == "1") {
                  slot = 1;
                }
              }
              else if (optionSlot.value == '2'){
                if (slots[i] == "2") {
                  slot = 2;
                }
              } 
            }

            if (slot == 1 || slot == 2) {
              $.get( "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot=" + slot, function(responseText) {
                  partida = JSON.parse(responseText);
                  player = partida["player"];
                  enemigo = partida["enemigo"];
                  mapa = partida["mapa"];
                  objetos = partida["objetos"];
                  counterEnemies = partida["counterEnemies"];
                  counterObjects = partida["counterObjects"];
                  turnFight = partida["turnFight"];
                  fighting = partida["fighting"];
                  running = partida["running"];
                  firstClick = partida["firstClick"];
                  canFight = partida["canFight"];

                  if(partida["image"] == "object") {                    
                    document.getElementById("imageScreen").src = "media/images/" + partida["image"] + player.mochila[player.mochila.length - 1] + ".png";
                  }else {                    
                    document.getElementById("imageScreen").src = "media/images/" + partida["image"] + ".png";
                  }
                  refreshData();
                  document.getElementById("gridBag").innerHTML = "";
                  
                  for (let i = 0; i < player.mochila.length; i++) {
                    addObjectToBag(player.mochila[i]);
                  }
                  for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                      var cell = document.getElementById("col" + j + "row" + i);
                      updateMinimap(i, j, cell);
                    }
                  }
                  alert("Game at slot " + slot + " recovered successfully!");
                  hidepopup();
              });
            }
          }
        },300);
      }
    break;
    }
}

function deleteGameAjax() {
  $.ajax({
    type: "DELETE",
    url: "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=eeaa85c0-00db-4c53-887f-3373acaa5145&slot="+slot, 
    statusCode: {
      404: function() {
        alert("No existeix cap partida en el slot indicat" );
      },
    },
    });
}

function music() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'music/canco.ogg');

  audioElement.setAttribute('autoplay', 'autoplay');

  document.getElementById("play").addEventListener("click", function() {
    audioElement.currentTime = 0;
    console.log("hey");
    audioElement.play();
  });

  document.getElementById("pause").addEventListener("click", function() {
    audioElement.pause();
  });
}