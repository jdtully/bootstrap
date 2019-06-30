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
currentPlayer = "";
otherPlayer = [];
gamePhase = ["setup", "layout", "play", "end"];
shipinplaylength = 0;
shipinplay = {};
currentorientation = "horiz";
blueShips = [];
redShips = [];
blueTargets = [];
redTargets = [];
let redCarrier = [];
let redBattleShip = [];
let redCruiser = [];
let redSubmarine = [];
let redDestroyer = [];
let blueCarrier = [];
let blueBattleShip = [];
let blueCruiser = [];
let blueSubmarine = [];
let blueDestroyer = [];
redshots = [];
blueshots = [];

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
  constructor(
    shipId,
    shipColor,
    shiptype,
    player,
    length,
    targets,
    hits,
    placed,
    sunk
  ) {
    this.shipId = shipId;
    this.shipColor = shipColor;
    this.shiptype = shiptype;
    this.player = player;
    this.length = length;
    this.targets = targets;
    this.hits = hits;
    this.placed = placed;
    this.sunk = sunk;
  }
}
function makeShips() {
  redCarrier = new ship(
    "redCarrier",
    "grey",
    "Carrier",
    "red",
    "5",
    [],
    [],
    false,
    false
  );
  redShips.push(redCarrier);
  redBattleship = new ship(
    "redBattleship",
    "orange",
    "Battleship",
    "red",
    "4",
    [],
    [],
    false,
    false
  );
  redShips.push(redBattleship);
  redSubmarine = new ship(
    "redSubmarine",
    "blue",
    "Submarine",
    "red",
    "3",
    [],
    [],
    false,
    false
  );
  redShips.push(redSubmarine);
  redCruiser = new ship(
    "redCruiser",
    "green",
    "Cruiser",
    "red",
    "3",
    [],
    [],
    false,
    false
  );
  redShips.push(redCruiser);
  redDestroyer = new ship(
    "redDestroyer",
    "yellow",
    "Destroyer",
    "red",
    "3",
    [],
    [],
    false,
    false
  );
  redShips.push(redDestroyer);
  blueCarrier = new ship(
    "blueCarrier",
    "grey",
    "Carrier",
    "blue",
    "5",
    [],
    [],
    false,
    false
  );
  blueShips.push(blueCarrier);
  blueBattleship = new ship(
    "blueBattleship",
    "orange",
    "Battleship",
    "blue",
    "4",
    [],
    [],
    false,
    false
  );
  blueShips.push(blueBattleship);
  blueSubmarine = new ship(
    "blueSubmarine",
    "blue",
    "Submarine",
    "blue",
    "3",
    [],
    [],
    false,
    false
  );
  blueShips.push(blueSubmarine);
  blueCruiser = new ship(
    "blueCruiser",
    "green",
    "Cruiser",
    "blue",
    "3",
    [],
    [],
    false,
    false
  );
  blueShips.push(blueCruiser);
  blueDestroyer = new ship(
    "blueDestroyer",
    "yellow",
    "Destroyer",
    "blue",
    "2",
    [],
    [],
    false,
    false
  );
  blueShips.push(blueDestroyer);

  console.log("makeships done");
}
/* shipHit = function(gridLocation) {
    var target = [];
    for (let target of this.targets) {
      if ($(target).attr("id") === gridLocation) {
        return true;
      }
    }
    return false;
  };
}
*/

function shipHit(el) {
  let shot = el.attr("id").split(":");
  let target = parseInt(shot[1]) + ":" + parseInt(shot[2]);

  if (currentPlayer == "blue") {
    for (i in redTargets) {
      if (redTargets.includes(target)) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    for (i in blueTargets) {
      if (blueTargets.includes(target)) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function shipObjHit(el) {
  let shot = el.attr("id").split(":");
  let target = parseInt(shot[1]) + ":" + parseInt(shot[2]);
  var targetShips = blueShips;
  if (currentPlayer === "blue") {
    targetShips = redShips;
  }
  debugger;
  for (shipIdx in targetShips) {
    let ship = targetShips[shipIdx];
    var hitIdx = ship.targets.indexOf(target);

    if (hitIdx > -1) {
      let hitplace = ship.targets.splice(hitIdx, 1);
      ship.hits.push(hitplace);
      return ship;
    }
  }
  return null;
}

/*function shipHit(gridLocation) {
  if (currentPlayer === "blue") {
    for (let ship of redShips) {
      if (ship.shipHit(gridLocation)) {
        return true;
      }
    }
    return false;
  } else {
    for (let ship of blueShips) {
      if (ship.shipHit(gridLocation)) {
        return true;
      }
    }
    return false;
  }
}
*/

$(document).ready(function() {
  console.log("ready");
  initgame();
});

//button handlers
$(document).ready(function() {
  $("#button1").on("click", function() {
    messaging("reset");
  });
  // buttons 2->6  blueShiptypes
  $("#blue-btn-carrier").on("click", function() {
    console.log("carrier clicked");
    shipinplaylength = 5;
    shipinplay = blueCarrier;
    messaging("carrier");
  });
  $("#blue-btn-battleship").on("click", function() {
    console.log("battleship clicked");
    shipinplaylength = 4;
    shipinplay = blueBattleship;
    messaging("battleship");
  });
  $("#blue-btn-cruiser").on("click", function() {
    console.log("cruiser clicked");
    shipinplaylength = 3;
    shipinplay = blueCruiser;
    messaging("cruiser");
  });
  $("#blue-btn-submarine").on("click", function() {
    console.log("submarine clicked");
    shipinplaylength = 3;
    shipinplay = blueSubmarine;
    messaging("submarine");
  });
  $("#blue-btn-destroyer").on("click", function() {
    console.log("destroyer clicked");
    shipinplaylength = 2;
    shipinplay = blueDestroyer;
    messaging("destroyer");
  });
  //This button is  to hide your ship selections
  $("#blue-btn-hide").on("click", function() {
    console.log("hide button clicked");
    hideShipsTable(currentPlayer);
    messaging("hide");
  });
  //this button flips  theplayer
  $("#blue-btn-flipplayer").on("click", function() {
    console.log("switchplayer button clicked");
    currentPlayer = changeCurrentPlayer(currentPlayer);
    console.log(currentPlayer);
    messaging("switch");
  });
  $("#blue-btn-fliporientation").on("click", function() {
    console.log("horiz or vert button clicked");
    currentorientation = flipOrientation(currentorientation);
  });
  // red shiptypes
  $("#red-btn-carrier").on("click", function() {
    console.log("carrier clicked");
    shipinplaylength = 5;
    shipinplay = redCarrier;
    messaging("carrier");
  });
  $("#red-btn-battleship").on("click", function() {
    console.log("battleship clicked");
    shipinplaylength = 4;
    shipinplay = redBattleship;
    messaging("battleship");
  });
  $("#red-btn-cruiser").on("click", function() {
    console.log("cruiser clicked");
    shipinplaylength = 3;
    shipinplay = redCruiser;
    messaging("cruiser");
  });
  $("#red-btn-submarine").on("click", function() {
    console.log("submarine clicked");
    shipinplaylength = 3;
    shipinplay = redSubmarine;
    messaging("submarine");
  });
  $("#red-btn-destroyer").on("click", function() {
    console.log("destroyer clicked");
    shipinplaylength = 2;
    shipinplay = redDestroyer;
    messaging("destroyer");
  });
  $("#red-btn-hide").on("click", function() {
    console.log("hide button clicked");
    currentPlayer = "red";
    hideShipsTable(currentPlayer);
    messaging("hide");
    //This button is  to hide your ship selections
  });
  //this button flips  theplayer
  $("#red-btn-flipplayer").on("click", function() {
    console.log("switchplayer button clicked");
    currentPlayer = changeCurrentPlayer(currentPlayer);
    console.log(currentPlayer);
    messaging("switch");
  });
  $("#red-btn-fliporientation").on("click", function() {
    console.log("horiz or vert button clicked");
    currentorientation = flipOrientation(currentorientation);
  });
  $("#initmode-btn").on("click", function() {
    console.log("init mode button clicked");
    gamePhase = "init";
  });
  $("#setupmode-btn").on("click", function() {
    console.log("setup mode button clicked");
    gamePhase = "layout";
  });
  $("#playmode-btn").on("click", function() {
    console.log("playmode button clicked");
    gamePhase = "play";
  });
  $("#endgamemode-btn").on("click", function() {
    console.log("endgame mode clicked");
    gamePhase = "endgame";
  });
});

//hopefully all messaging  is  in here
function messaging(message) {
  switch (message) {
    case "repeated shot":
      console.log("shot duplicated message");
      $("#status").html("You already shot here");
      break;

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

function flipOrientation(orientation) {
  console.log(orientation);
  if (orientation === "horiz") {
    return "vert";
  } else {
    return "horiz";
  }
}

function hoverShip(el) {
  //el.addClass("hover");
  //console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  //console.log(field);
  var spaces = shipinplaylength;
  //checking for edge collision first
  if (field[0] === "blue-ships-table" || field[0] === "red-ships-table") {
    if (shipinplaylength > 1) {
      if (edgeCollision(el, currentorientation, spaces)) {
        elclass = "outofbounds";
      } else {
        elclass = "hover";
      }
      if (gamePhase === "layout") {
        marksquares(el, currentorientation, shipinplaylength, elclass);
      } else {
        console.log("we are in ship placement mode");
      }
    } else {
      console.log("we are in ship placement mode");
    }
  } else {
    if (gamePhase === "layout") {
      console.log("hovering right grid in layout mode");
    } else {
      console.log("placeholder hovership");
      el.addClass("hover");
    }
  }
}

function checkrepeatshot(el, currentPlayer) {
  console.log("checkrepeatshot");
  if (currentPlayer == "blue") {
    if (blueshots.indexOf(el.attr("id")) !== -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (redshots.indexOf(el.attr("id")) !== -1) {
      return true;
    } else {
      return false;
    }
  }
}

function markHitShips(el) {
  if (currentPlayer === "blue") {
    console.log(el.attr("id"));
    let field = el.attr("id").split(":");
    squareToMark = "red-ships-table" + ":" + field[1] + ":" + field[2];
    squareToMark.addClass("shotHit");
    console.log(currentPlayer + "  is blue");
  } else {
    console.log(el.attr("id"));
    let field = el.attr("id").split(":");
    squareToMark = "blue-ships-table" + ":" + field[1] + ":" + field[2];
    squareToMark.addClass("shotHit");
    console.log((currentPlayer = "red"));
  }
}
function recordshots(el, currentPlayer) {
  if (currentPlayer === "blue") {
    blueshots.push(el.attr("id"));
    console.log("shot added to blueshots");
  } else {
    redshots.push(el.attr("id"));
    console.log("shot added to red shots");
  }
}

function findshipshit(el, currentPlayer) {
  console.log("figure out which  ship got hit");
}
function markshiphits(el) {
  console.log("markshiphits");
}
function removefromtargetfields(el, currentPlayer) {
  console.log("removing from target fields list");
}
function checkshipsunk() {
  console.log("checking to see if  ship sunk");
}
function checkgameover() {
  console.log("checking to see if game over");
}
//}
function unhoverShip(el) {
  //el.removeClass("hover");
  let field = el.attr("id").split(":");
  //console.log(field);
  var spaces = shipinplaylength;
  if (gamePhase === "layout") {
    if (field[0] == "blue-ships-table" || field[0] == "red-ships-table") {
      if (edgeCollision(el, currentorientation, spaces)) {
        elclass = "outofbounds";
      } else {
        elclass = "hover";
      }
      unmarksquares(el, currentorientation, shipinplaylength, elclass);
    } else {
      console.log("got here");
    }
  } else {
    if (gamePhase === "play") {
      if (field[0] == "blue-shots-table" || field[0] == "red-shots-table") {
        el.removeClass("hover");
      }
    }
  }
}
//function selectGamePhase() {
//  if(gamePhase ===)
//}

function chooseActiveTable() {}

function initgame() {
  gamePhase = "setup";
  buildGrid("blue-ships-table");
  buildGrid("blue-shots-table");
  buildGrid("red-ships-table");
  buildGrid("red-shots-table");
  makeShips();
  console.log("grids built");
  gamePhase = "layout";
  currentPlayer = "blue";
  currentorientation = "horiz";
  console.log("gamePhase = layout");
  messaging("setup");
  messaging("currentPlayer");
}
function clickShip(el) {
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  console.log(field);
  var spaces = shipinplaylength;
  if (field[0] == "blue-ships-table" || field[0] == "red-ships-table") {
    //this is placing
    if (gamePhase === "layout") {
      if (shipinplaylength > 1) {
        if (edgeCollision(el, currentorientation, spaces)) {
          elclass = "outofbounds";
        } else {
          elclass = "placed_ship";
          marksquares(
            el,
            currentorientation,
            shipinplaylength,
            shipinplay,
            elclass
          );

          var currentselection = createcurrentselection(
            el,
            currentorientation,
            shipinplaylength
          );

          addShipstotargetfields(currentPlayer, currentselection);
          addTargetFieldsToShips(currentPlayer, currentselection, shipinplay);
          markShipObject(shipinplay, currentorientation, currentselection);
          hideShipbutton(shipinplay);
        }
      } else {
        console.log(noship);
        messaging("noship");
      }
    }
  } else {
    //This is Shooting
    if (field[0] === "blue-shots-table" || field[0] === "red-shots-table") {
      if (gamePhase === "play") {
        $(el).removeClass("hover");
        if (checkrepeatshot(el, currentPlayer)) {
          messaging("repeated shot");
        } else {
          recordshots(el, currentPlayer);
          if (shipHit(el)) {
            console.log("its a hit");
            //$(el).addClass("shotHit");
          } else {
            console.log("its a miss");
            //$(el).addClass("shotMiss");
          }
          var ship = shipObjHit(el);
          if (ship) {
            console.log(ship.shiptype + " hit");
            $(el).addClass("shotHit");
          } else {
            console.log("its a ship object miss");
            $(el).addClass("shotMiss");
          }
        }
      } else {
        console.log("gamephase is not play");
      }
    }
  }
}
function markhitship() {
  console.log("need to write mark hit ship function");
}
function markShipObject(shipinplay, currentorientation, currentselection) {
  shipinplay.orientation = currentorientation;
  shipinplay.targets = currentselection;
  shipinplay.placed = true;
}

function hideShipsTable(currentPlayer) {
  console.log(currentPlayer);
  if (currentPlayer == "blue") {
    $("#blue-ships-table").addClass("hidden");
  } else {
    $("#red-ships-table").addClass("hidden");
  }
}

//var tableToHide = $("#blue-btn-carrier");

function hideShipbutton(shipinplay) {
  switch (shipinplay.player + shipinplay.shiptype) {
    case "blueCarrier":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#blue-btn-carrier");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueBattleship":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#blue-btn-battleship");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueCruiser":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#blue-btn-cruiser");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueSubmarine":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#blue-btn-submarine");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueDestroyer":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#blue-btn-destroyer");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redCarrier":
      console.log("redCarrier placed");
      var buttonToHide = $("#red-btn-carrier");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redBattleship":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#red-btn-battleship");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redSubmarine":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#red-btn-submarine");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redCruiser":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#red-btn-cruiser");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redDestroyer":
      console.log(shipinplay + " placed");
      var buttonToHide = $("#red-btn-destroyer");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;
  }
}
function resetVariablesDuringLayout() {
  shipinplay = {};
  currentselection = [];
  shipinplaylength = 0;
}

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
  for (i in currentselection) {
    var j = $(currentselection[i]);
    let k = j.attr("id").split(":");
    var l = parseInt(k[1]) + ":" + parseInt(k[2]);
    if (currentPlayer === "blue") {
      blueTargets.push(l);
    } else {
      redTargets.push(l);
    }
  }
}
function addTargetFieldsToShips(currentPlayer, currentselection, shipinplay) {
  console.log(currentPlayer);
  console.log(currentselection);
  for (i in currentselection) {
    var j = $(currentselection[i]);
    let k = j.attr("id").split(":");
    var l = parseInt(k[1]) + ":" + parseInt(k[2]);
    shipinplay.targets.push(l);
  }
}

function stringify(input) {
  datatostring = input;
  var strungdata = JSON.stringify(datatostring, null, 2);
  console.log(strungdata);
  return strungdata;
}

function markShipObject(shipinplay, currentorientation, currentselection) {
  shipinplay.orientation = currentorientation;
  shipinplay.placed = true;
}

function edgeCollision(el, currentorientation, shipinplaylength) {
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
