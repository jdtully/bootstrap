numRows = 10;
numCols = 10;
letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
currentPlayer = ["blue"];
otherPlayer = ["red"];
currentship = ""
gamePhase = ["setup", "play", "end"]
shipinplaylength = 0;
shipinplay = "";
redCarrier = [1, 2, 3, 4, 5];
redBattleship = [1, 2, 3, 4];
redSubmarine = [1, 2, 3]
redCruiser = [1, 2, 3]
redDestroyer = [1, 2];
blueCarrier = [1, 2, 3, 4, 5]
blueBattleship = [1, 2, 3, 4]
blueSubmarine = [1, 2, 3]
blueCruiser = [1, 2, 3]
blueDestroyer = [1, 2]
currentorientation = ""
Occupied = ["table01:1:1"];

function buildGrid(elementId) {
  //get the body
  var tableContainer = document.getElementById(elementId);
  //create table
  var table = document.createElement('table');
  //create a table body
  var tblB = document.createElement('tbody');
  //append table body to the table
  table.appendChild(tblB);
  //nested loops  to create columns and  rows
  for (var i = 0; i < numRows; i++) {
    //create rows
    var tr = document.createElement('tr');
    //append rows  to body
    tblB.appendChild(tr);
    //loop for cols
    for (var j = 0; j < numCols; j++) {
      // create cols
      var td = document.createElement('td');
      $(td).hover(
        function () { hoverShip($(this)) },

        //console.log("hovered! " + $(this).attr('id'))
        //if you  want to turn this  console back on  remember to get the curly brace and  comma  and  put it after id,))
        function () { unhoverShip($(this)) });

      // put  test text in cells
      let cellid = i + ":" + j;
      td.innerText = cellid;
      td.id = elementId + ":" + cellid;
      //add cols to rows
      tr.appendChild(td);
    }
  }
  //append the table to the body
  tableContainer.appendChild(table);
}
//create ship variables
function makeShips() {
  redCarrier = [1, 2, 3, 4, 5]
  redBattleship = [1, 2, 3, 4]
  redSubmarine = [1, 2, 3]
  redCruiser = [1, 2, 3]
  redDestroyer = [1, 2]
  blueCarrier = [1, 2, 3, 4, 5]
  blueBattleship = [1, 2, 3, 4]
  blueSubmarine = [1, 2, 3]
  blueCruiser = [1, 2, 3]
  blueDestroyer = [1, 2]
  console.log("makeships done");
}



$(document).ready(function () {
  console.log("ready");
  if (gamePhase[0] === "setup") {
    buildGrid("table0");
    buildGrid("table1");
    console.log("grids built");

    console.log("gamePhase = setup");
    messaging("setup");
    messaging("currentPlayer");
  }
});

//button handlers
$(document).ready(function () {
  $("#button1").on("click", (function () {
    messaging("reset");
  }));
  $("#button2").on("click", (function () {
    console.log("carrier clicked");
    shipinplaylength = 5
    shipinplay = pickship(currentPlayer, "Carrier");
    placeship(shipinplay)
    messaging("carrier");
  }));
  $("#button3").on("click", (function () {
    console.log("battleship clicked");
    shipinplaylength = 4
    shipinplay = pickship(currentPlayer, "Battleship");
    placeship(shipinplay)
    messaging("battleship");
  }));
  $("#button4").on("click", (function () {
    console.log("cruiser clicked");
    shipinplaylength = 3
    shipinplay = pickship(currentPlayer, "Cruiser");
    placeship(shipinplay)
    messaging("cruiser");
  }));
  $("#button5").on("click", (function () {
    console.log("submarine clicked");
    shipinplaylength = 3
    shipinplay = pickship(currentPlayer, "Submarine");
    placeship(shipinplay)
    messaging("submarine");
  }));
  $("#button6").on("click", (function () {
    console.log("destroyer clicked");
    shipinplaylength = 2
    shipinplay = pickship(currentPlayer, "Destroyer");
    placeship(shipinplay)
    messaging("destroyer");
  }));
  $("#button7").on("click", (function () {
    console.log("hide button clicked");
    messaging("hide");
  }));
  $("#button8").on("click", (function () {
    console.log("switchplayer button clicked");
    messaging("switch");
  }));

  $("#button9").on("click", (function () {
    console.log("horiz or vert button clicked");
    detectgood()
    selectOrientation();
    messaging("switch");
  }));
  $("#button10").on("click", (function () {
    console.log("test button clicked");
    detectgood(el, currentorientation, shipinplaylength)
    messaging("switch");
  }));

});

//if hover goes  bad  delete this  and  the hover  function  and uncomment hover  in grid  creation
//  $("#td".hover(this)).on ("hover" ,( 
//  function(){ $(this).addClass('hover')},
//    console.log("hovered! " + $(this).attr('id')),
//if you  want to turn this  console back on  remember to get the curly brace and  comma  and  put it after id,))
//  function(){ $(this).removeClass('hover')
//}));




//hopefully all messaging  is  in here
function messaging(message) {
  switch (message) {
    case "reset":
      console.log("reset Clicked");
      $('#status').html("New game! blue first!.");
      break;

    case "winner":
      console.log('winner is ' + currentPlayer);
      $('#status').html("Game is over " + currentPlayer + " wins!");
      break;

    case "flip":
      $('#status').html("Its " + currentPlayer + "'s turn!");
      break;

    case "taken":
      $('#status').html("That spot has already been played.");
      break;

    case "miss":
      $('#status').html("That was a miss.");
      break;

    case "sank":
      $('#status').html("You sank " + otherPlayer + "'s" + shipType);
      break;

    case "start":
      $('#status').html("New game! X goes first!.");
      break;

    case "pickship":
      $('#status').html("You picked " + currentship + ".")
      break;

    case "hit":
      console.log("Hit")
      $('#status').html("You hit" + otherPlayer + "vessel!");
      break;

    case "hide":
      $('#status').html("Current player hidden, press switch player");
      break;

    case "carrier":
      $('#status').html("You picked Carrier.");
      break;

    case "battleship":
      $('#status').html("You picked Battleship.");
      break;
    case "cruiser":
      $('#status').html("You picked Cruiser.");
      break;

    case "submarine":
      $('#status').html("You picked Submarine.");
      break;

    case "destroyer":
      $('#status').html("You picked Destroyer.");
      break;

    case "setup":
      $('#gamephase').html("Setup click a ship button and point to the left grid to place it");
      break;

    case "playing":
      $('#gamephase').html("Click a point in the right grid to attack it");
      break;

    case "currentPlayer":
      $('#currentPlayer').html("current player is " + currentPlayer);
      break;
    case "offedge":
      $('#status').html("invalid placement.");
      break;
    case "infield":
      $('#status').html("Good place");
      break;


  }
}

//need a hover function
//$("#td".hover(this)).on ("hover" ,( 
//function(){ $(this).addClass('hover')},
//  console.log("hovered! " + $(this).attr('id')),
//if you  want to turn this  console back on  remember to get the curly brace and  comma  and  put it after id,))
//function(){ $(this).removeClass('hover')
//}

//select  shiptype (ships are  declared  above)
function pickship(currentPlayer, currentship) {
  console.log("Picking " + currentship)
  $('#status').html("Carrier Selected")
  shipinplay = currentPlayer + currentship;
  console.log("currently working on " + shipinplay)
  return (shipinplay);

}
//select placement area of ships during setup
function placeship(shipinplay) {
  console.log("ready to place ships " + shipinplay)
  currentship = shipinplay
}

function selectOrientation() {
  console.log("selecting orientation")
  if (currentorientation == "horiz") {
    currentorientation = "vert";
  }
  else {
    currentorientation = "horiz";
  }
}


function hoverShip(el) {
  el.addClass('hover')
  console.log(el.attr("id"))
  let field = (el.attr("id")).split(":")
  console.log(field)
  var spaces = shipinplaylength
  //hover for horizontal
  if (currentorientation === "horiz") {
    for (i = 0; i < spaces; i++) {
      nextsquare = parseInt(field[2]);
      nextsquare += i;
      console.log(nextsquare)
      //check for close to edge horizonta
      if (nextsquare >= numCols) {
        messaging("offedge");
        for (i = 0; i < spaces; i++) {
          nextsquare = parseInt(field[2]);
          nextsquare += i;
          let celltofind = field[0] + ":" + field[1] + ":" + nextsquare
          let nextcell = document.getElementById(celltofind);
          $(nextcell).addClass("outofbounds");
        }
      }
      else {
        messaging("infield");
        let celltofind = field[0] + ":" + field[1] + ":" + nextsquare
        let nextcell = document.getElementById(celltofind);
        $(nextcell).addClass("hover");
      }

      //let celltofind = field[0] + ":" +field[1] + ":" + nextsquare
      //let nextcell = document.getElementById(celltofind);
      //$(nextcell).addClass("hover");
    }
  }
  else {
    for (i = 0; i < spaces; i++) {
      nextsquare = parseInt(field[1]);
      nextsquare += i;
      if (nextsquare >= numRows) {
        messaging("offedge");
        for (i = 0; i < spaces; i++) {
          nextsquare = parseInt(field[1]);
          nextsquare += i;
          let celltofind = field[0] + ":" + nextsquare + ":" + field[2]
          let nextcell = document.getElementById(celltofind);
          $(nextcell).addClass("outofbounds");
        }
      }
      else {
        messaging("infield")
        let celltofind = field[0] + ":" + nextsquare + ":" + field[2]
        let nextcell = document.getElementById(celltofind);
        $(nextcell).addClass("hover");
      }
    }
  }
}
function unhoverShip(el) {
  el.removeClass('hover')
  console.log(el.attr("id"))
  let field = (el.attr("id")).split(":")
  console.log(field)
  var spaces = shipinplaylength
  if (currentorientation === "horiz") {
    for (i = 0; i < spaces; i++) {
      nextsquare = parseInt(field[2]);
      nextsquare += i;
      if (nextsquare >= numCols) {
        messaging("offedge");
        for (i = 0; i < spaces; i++) {
          nextsquare = parseInt(field[2]);
          nextsquare += i;
          let celltofind = field[0] + ":" + field[1] + ":" + nextsquare
          let nextcell = document.getElementById(celltofind);
          $(nextcell).removeClass("outofbounds");
        }
      }
      else {
        messaging("infield");
        let celltofind = field[0] + ":" + field[1] + ":" + nextsquare
        let nextcell = document.getElementById(celltofind);
        $(nextcell).removeClass("hover");
      }
    }
  }
  else {
    for (i = 0; i < spaces; i++) {
      nextsquare = parseInt(field[1]);
      nextsquare += i;
      if (nextsquare >= numCols) {
        messaging("offedge");
        for (i = 0; i < spaces; i++) {
          nextsquare = parseInt(field[1]);
          nextsquare += i;
          let celltofind = field[0] + ":" + nextsquare + ":" + field[2];
          let nextcell = document.getElementById(celltofind);
          $(nextcell).removeClass("outofbounds");
        }
      }
      else {
        messaging("infield")
        let celltofind = field[0] + ":" + nextsquare + ":" + field[2]
        let nextcell = document.getElementById(celltofind);
        $(nextcell).removeClass("hover");
      }
    }
  }
}
//function bad place
//starting point orientation  and  length

// function test for edge or  collisio
//

function detectgood(el, currentorientation, shipinplaylength) {
  debugger
  console.log(el, currentorientation, shipinplaylength);
  let field = (el.attr("id")).split(":")
  console.log(field)
  var spaces = shipinplaylength
  for (i = 0; i < spaces; i++) {
    nextsquare = parseInt(field[1]);
    nextsquare += i;
    if (nextsquare >= numCols || nextsquare >= numRows || Occupied.includes(next)) {
      return
    }
  }
}

function detectgood2(el, currentorientation, shipinplaylength) {
  console.log(el, currentorientation, shipinplaylength);
  let field = (el.attr("id")).split(":")
  console.log(field)
  var spaces = shipinplaylength
  if (Occupied.includes(el)) {
    return(false)
  }
  else {
    if (currentorientation == "horiz") {
      for (i = 0; i < spaces; i++) {
        nextsquare = parseInt(field[2]);
        nextsquare += i;
        if (nextsquare >= numCols) {
          return(false)
        }
        else {
          for (i = 0; i < spaces; i++) {
            nextsquare = parseInt(field[1]);
            nextsquare += i;
            if (nextsquare >= numRows) {
              return(false);
            }
          }
        }
      }
    }
  }
}
  


