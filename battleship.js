numRows = 10;
numCols = 10;
letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
currentPlayer = [];
otherPlayer = [];
currentship = "";
gamePhase = ["setup", "layout", "play", "end"];
shipinplaylength = 0;
shipinplay = "";
currentorientation = "horiz";
redtargetfields = [];
bluetargetfields = [];
redCarrier = [];
redBattleShip = [];
redCruiser = [];
redSubmarine = [];
redDestroyer = [];
blueCarrier = [];
blueBattleShip = [];
blueCruiser = [];
blueSubmarine = [];
blueDestroyer = [];

function buildGrid(elementId) {
  //get the body
  var tableContainer = document.getElementById(elementId);

  //create table
  var table = document.createElement("table");
  //create a table body
  var tblB = document.createElement("tbody");
  //append table body to the table
  table.appendChild(tblB);
  //nested loops  to create columns and  rows
  for (var i = 0; i < numRows; i++) {
    //create rows
    var tr = document.createElement("tr");
    //append rows  to body
    tblB.appendChild(tr);
    //loop for cols
    for (var j = 0; j < numCols; j++) {
      // create cols
      var td = document.createElement("td");
      $(td).hover(
        function() {
          hoverShip($(this));
        },
        function() {
          unhoverShip($(this));
        }
      );

      $(td).click(function() {
        console.log("cell clicked");
        clickShip($(this));

        //var selected =
      });

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

class ship {
  constructor(shiptype, player, length, orientation, targets, placed, sunk) {
    this.shiptype = shiptype;
    this.player = player;
    this.length = length;
    this.orientation = orientation;
    this.targets = targets;
    this.placed = placed;
    this.sunk = sunk;
  }
}

function makeShips() {
  redCarrier = new ship("Carrier", "red", "5", "", [], false, false);
  redBattleShip = new ship("Battleship", "red", "4", "", [], false, false);
  redSubmarine = new ship("Submarine", "red", "3", "", [], false, false);
  redCruiser = new ship("Cruiser", "red", "3", "", [], false, false);
  redDestroyer = new ship("Destroyer", "red", "3", "", [], false, false);
  blueCarrier = new ship("Carrier", "blue", "5", "", [], false, false);
  blueBattleShip = new ship("Battleship", "blue", "4", "", [], false, false);
  blueSubmarine = new ship("Submarine", "blue", "3", "", [], false, false);
  blueCruiser = new ship("Cruiser", "blue", "3", "", [], false, false);
  blueDestroyer = new ship("Destroyer", "blue", "2", "", [], false, false);

  console.log("makeships done");
}
$(document).ready(function() {
  console.log("ready");
  initgame();
});

//button handlers
$(document).ready(function() {
  $("#button1").on("click", function() {
    messaging("reset");
  });
  // buttons 2->6  shiptypes
  $("#btn-carrier").on("click", function() {
    console.log("carrier clicked");
    shipinplaylength = 5;
    shipinplay = pickship(currentPlayer, "Carrier");
    //placeship(shipinplay);
    messaging("carrier");
  });
  $("#btn-battleship").on("click", function() {
    console.log("battleship clicked");
    shipinplaylength = 4;
    shipinplay = pickship(currentPlayer, "Battleship");
    //placeship(shipinplay);
    messaging("battleship");
  });
  $("#btn-cruiser").on("click", function() {
    console.log("cruiser clicked");
    shipinplaylength = 3;
    shipinplay = pickship(currentPlayer, "Cruiser");
    //placeship(shipinplay);
    messaging("cruiser");
  });
  $("#btn-submarine").on("click", function() {
    console.log("submarine clicked");
    shipinplaylength = 3;
    shipinplay = pickship(currentPlayer, "Submarine");
    //placeship(shipinplay);
    messaging("submarine");
  });
  $("#btn-destroyer").on("click", function() {
    console.log("destroyer clicked");
    shipinplaylength = 2;
    shipinplay = pickship(currentPlayer, "Destroyer");
    //placeship(shipinplay);
    messaging("destroyer");
  });

  //This button is  to hide your ship selections
  $("#btn-hide").on("click", function() {
    console.log("hide button clicked");
    messaging("hide");
  });
  //this button flips  theplayer
  $("#btn-flipplayer").on("click", function() {
    console.log("switchplayer button clicked");
    currentPlayer = changeCurrentPlayer(currentPlayer);
    console.log(currentPlayer);
    messaging("switch");
  });
  // this button is  to flip ship orientation during setup
  $("#btn-fliporientation").on("click", function() {
    console.log("horiz or vert button clicked");
    currentorientation = flipOrientation(currentorientation);
  });
});

//hopefully all messaging  is  in here
function messaging(message) {
  switch (message) {
    case "reset":
      console.log("reset Clicked");
      $("#status").html("New game! blue first!.");
      break;

    case "winner":
      console.log("winner is " + currentPlayer);
      $("#status").html("Game is over " + currentPlayer + " wins!");
      break;

    case "flip":
      $("#status").html("Its " + currentPlayer + "'s turn!");
      break;

    case "taken":
      $("#status").html("That spot has already been played.");
      break;

    case "miss":
      $("#status").html("That was a miss.");
      break;

    case "sank":
      $("#status").html("You sank " + otherPlayer + "'s" + shipType);
      break;

    case "start":
      $("#status").html("New game! X goes first!.");
      break;

    case "pickship":
      $("#status").html("You picked " + currentship + ".");
      break;

    case "hit":
      console.log("Hit");
      $("#status").html("You hit" + otherPlayer + "vessel!");
      break;

    case "hide":
      $("#status").html("Current player hidden, press switch player");
      break;

    case "carrier":
      $("#status").html("You picked Carrier.");
      break;

    case "battleship":
      $("#status").html("You picked Battleship.");
      break;
    case "cruiser":
      $("#status").html("You picked Cruiser.");
      break;

    case "submarine":
      $("#status").html("You picked Submarine.");
      break;

    case "destroyer":
      $("#status").html("You picked Destroyer.");
      break;

    case "setup":
      $("#gamephase").html(
        "Setup click a ship button and point to the left grid to place it"
      );
      break;

    case "playing":
      $("#gamephase").html("Click a point in the right grid to attack it");
      break;

    case "currentPlayer":
      $("#currentPlayer").html("current player is " + currentPlayer);
      break;

    case "offedge":
      $("#status").html("invalid placement.");
      break;

    case "infield":
      $("#status").html("Good place");
      break;

    case "switch":
      $("#currentPlayer").html("current player is " + currentPlayer);
      break;

    case "noship":
      $("#status").html(currentPlayer + " Please pick a ship");
      break;

    default:
      console.warn("no message for " + message);
  }
}

//select  shiptype (ships are  declared  above)
function pickship(currentPlayer, currentship) {
  console.log("Picking " + currentship);
  $("#status").html("Carrier Selected");
  shipinplay = currentPlayer + currentship;
  console.log("currently working on " + shipinplay);
  return shipinplay;
}

//select placement area of ships during setup
function placeship(shipinplay) {
  console.log("ready to place ships " + shipinplay);
  currentship = shipinplay;
}

function flipOrientation(orientation) {
  console.log(orientation);
  if (orientation === "horiz") {
    return "vert";
  } else {
    return "horiz";
  }
}

function hoverShip(el) {
  el.addClass("hover");
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  console.log(field);
  var spaces = shipinplaylength;
  //checking for edge collision first
  if (shipinplaylength > 1) {
    if (field[0] == "table0") {
      if (edgecollision(el, currentorientation, spaces)) {
        elclass = "outofbounds";
      } else {
        elclass = "hover";
      }

      marksquares(el, currentorientation, shipinplaylength, elclass);

      /*for (i = 0; i < spaces; i++) {
          if (currentorientation !== "horiz") {
          squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
        } else {
          squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
        }
        var square = document.getElementById(squareStr);
        console.log("square is" + elclass);
        $(square).addClass(elclass);
      }
      */
    } else {
      el.addClass("target");
      //set class
      //do  on click  for  shot
    }
  } else {
    messaging("noship");
  }
}

function unhoverShip(el) {
  el.removeClass("hover");
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  console.log(field);
  var spaces = shipinplaylength;
  if (field[0] == "table0") {
    if (edgecollision(el, currentorientation, spaces)) {
      elclass = "outofbounds";
    } else {
      elclass = "hover";
    }
    unmarksquares(el, currentorientation, shipinplaylength, elclass);
    /*for (i = 0; i < spaces; i++) {
      var squareStr;
      if (currentorientation !== "horiz") {
        squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
      } else {
        squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
      }
      var square = document.getElementById(squareStr);
      console.log("square is" + elclass);
      $(square).removeClass(elclass);
    }
    */

    /*
    if (currentorientation === "horiz") {
      for (i = 0; i < spaces; i++) {
        nextsquare = parseInt(field[2]);
        nextsquare += i;
        if (nextsquare >= numCols) {
          messaging("offedge");
          for (i = 0; i < spaces; i++) {
            nextsquare = parseInt(field[2]);
            nextsquare += i;
            let celltofind = field[0] + ":" + field[1] + ":" + nextsquare;
            let nextcell = document.getElementById(celltofind);
            $(nextcell).removeClass("outofbounds");
          }
        } else {
          messaging("infield");
          let celltofind = field[0] + ":" + field[1] + ":" + nextsquare;
          let nextcell = document.getElementById(celltofind);
          $(nextcell).removeClass("hover");
        }
      }
    } else {
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
        } else {
          messaging("infield");
          let celltofind = field[0] + ":" + nextsquare + ":" + field[2];
          let nextcell = document.getElementById(celltofind);
          $(nextcell).removeClass("hover");
        }
      }
    }
    */
  } else {
    el.removeClass("target");
    //set class
    //do  on click  for  shot
  }
}
function modeSelector() {}

function initgame() {
  buildGrid("bluetable0");
  buildGrid("bluetable1");
  buildGrid("redtable0");
  buildGrid("redtable1");

  makeShips();
  console.log("grids built");
  gamePhase = "setup";
  currentPlayer = "blue";
  currentorientation = "horiz";
  console.log("gamePhase = setup");
  messaging("setup");
  messaging("currentPlayer");
}
function clickShip(el) {
  //el.addClass("placed_ship");
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  console.log(field);
  var spaces = shipinplaylength;
  //checking for edge collision first
  if (field[0] == "table0") {
    if (shipinplaylength)
      if (edgecollision(el, currentorientation, spaces)) {
        elclass = "outofbounds";
      } else {
        elclass = "placed_ship";
      }
    marksquares(el, currentorientation, shipinplaylength, elclass);

    var currentselection = createcurrentselection(
      el,
      currentorientation,
      shipinplaylength
    );

    addShipstotargetfields(currentPlayer, currentselection);
    markShipObject(shipinplay, currentorientation, currentselection);
    hideShipbutton(shipinplay);

    //console.log("HTML is: " + redtargetfields.get(0).outerHTML);
  } else {
    el.addClass("target");
    //set class
    //do  on click  for  shot
  }
}
function markShipObject(shipinplay, currentorientation, currentselection) {
  shipinplay.orientation = currentorientation;
  shipinplay.targets = currentselection;
  shipinplay.placed = true;
}
//function hideShipbutton(shipinplay)

function marksquares(el, currentorientation, shipinplaylength, elclass) {
  let field = el.attr("id").split(":");
  spaces = shipinplaylength;
  for (i = 0; i < spaces; i++) {
    if (currentorientation !== "horiz") {
      squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
    } else {
      squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
    }
    var square = document.getElementById(squareStr);
    console.log("fields are " + elclass);
    $(square).addClass(elclass);
  }
}

function unmarksquares(el, currentorientation, shipinplaylength, elclass) {
  let field = el.attr("id").split(":");
  spaces = shipinplaylength;
  for (i = 0; i < spaces; i++) {
    if (currentorientation !== "horiz") {
      squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
    } else {
      squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
    }
    var square = document.getElementById(squareStr);
    console.log("square is" + elclass);
    $(square).removeClass(elclass);
  }
}

function changeCurrentPlayer(currentPlayer) {
  if (currentPlayer === "blue") {
    currentPlayer = "red";
  } else {
    currentPlayer = "blue";
  }
  return currentPlayer;
}

function createcurrentselection(el, currentorientation, shipinplaylength) {
  var currentselection = [];
  let field = el.attr("id").split(":");
  spaces = shipinplaylength;
  for (i = 0; i < spaces; i++) {
    if (currentorientation !== "horiz") {
      squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
    } else {
      squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
    }
    var square = document.getElementById(squareStr);
    console.log("square is" + elclass);
    currentselection.push(square);
  }
  return currentselection;
}
function addShipstotargetfields(currentPlayer, currentselection) {
  console.log(currentPlayer);
  console.log(currentselection);
  debugger;
  if (currentPlayer === "blue") {
    bluetargetfields.push(currentselection);
  } else {
    redtargetfields.push(currentselection);
  }
}

function stringify(input) {
  datatostring = input;
  var strungdata = JSON.stringify(datatostring, null, 2);
  console.log(strungdata);
  return strungdata;
}

function edgecollision(el, currentorientation, shipinplaylength) {
  console.log(el, currentorientation, shipinplaylength);
  let field = el.attr("id").split(":");
  console.log(field);
  var x = parseInt(field[1]);
  var y = parseInt(field[2]);

  var maxx = x + shipinplaylength;
  var maxy = y + shipinplaylength;

  if (currentorientation === "horiz") {
    if (maxy > numCols) {
      return true;
    } else {
      return false;
    }
  } else {
    if (maxx > numRows) {
      return true;
    } else {
      return false;
    }
  }
}
