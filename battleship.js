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

shipInPlay = {};
currentOrientation = "horiz";
blueShips = [];
redShips = [];
blueTargets = [];
redTargets = [];
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
          hoverShip($(this), shipInPlay);
        },
        function() {
          unhoverShip($(this), shipInPlay);
        }
      );

      $(td).click(function() {
        console.log("cell clicked");
        clickShip($(this), shipInPlay);

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

class Ship {
  constructor(
    shipId,
    shipColor,
    shipClass,
    shipType,
    player,
    length,
    targets,
    hits,
    placed,
    sunk
  ) {
    this.shipId = shipId;
    this.shipColor = shipColor;
    this.shipClass = shipClass;
    this.shipType = shipType;
    this.player = player;
    this.length = length;
    this.targets = targets;
    this.hits = hits;
    this.placed = placed;
    this.sunk = sunk;
  }
  isSunk = function() {
    if (this.targets.length == 0) {
      this.sunk = true;
      return true;
    } else {
      console.log(this + " has" + this.targets.length + " targets left");
      return false;
    }
  };
}
function isFleetSunk(currentPlayer) {
  var fleet = blueShips;
  if (currentPlayer === "blue") {
    fleet = redShips;
  }
  for (i = 0; i < fleet.length; i++) {
    if (!fleet[i].isSunk()) {
      return false;
    }
  }
  return true;
}
function isFleetPlaced(currentPlayer) {
  var fleet = redShips;
  if (currentPlayer === "blue") {
    fleet = blueShips;
  }
  for (i = 0; i < fleet.length; i++) {
    if (!fleet[i].placed) {
      console.log("iterater is " + i);
      return false;
    }
  }
  return true;
}
function makeShips() {
  redCarrier = new Ship(
    "redCarrier",
    "grey",
    "col_carrier",
    "Carrier",
    "red",
    5,
    [],
    [],
    false,
    false
  );
  redShips.push(redCarrier);
  redBattleShip = new Ship(
    "redBattleShip",
    "orange",
    "col_battleShip",
    "Battleship",
    "red",
    4,
    [],
    [],
    false,
    false
  );
  redShips.push(redBattleShip);
  redSubmarine = new Ship(
    "redSubmarine",
    "blue",
    "col_submarine",
    "Submarine",
    "red",
    3,
    [],
    [],
    false,
    false
  );
  redShips.push(redSubmarine);
  redCruiser = new Ship(
    "redCruiser",
    "green",
    "col_cruiser",
    "Cruiser",
    "red",
    3,
    [],
    [],
    false,
    false
  );
  redShips.push(redCruiser);
  redDestroyer = new Ship(
    "redDestroyer",
    "yellow",
    "col_destroyer",
    "Destroyer",
    "red",
    2,
    [],
    [],
    false,

    false
  );
  redShips.push(redDestroyer);
  blueCarrier = new Ship(
    "blueCarrier",
    "grey",
    "col_carrier",
    "Carrier",
    "blue",
    5,
    [],
    [],
    false,
    false
  );
  blueShips.push(blueCarrier);

  blueBattleShip = new Ship(
    "blueBattleShip",
    "orange",
    "col_battleShip",
    "Battleship",
    "blue",
    4,
    [],
    [],
    false,
    false
  );
  blueShips.push(blueBattleShip);
  blueSubmarine = new Ship(
    "blueSubmarine",
    "blue",
    "col_submarine",
    "Submarine",
    "blue",
    3,
    [],
    [],
    false,
    false
  );
  blueShips.push(blueSubmarine);
  blueCruiser = new Ship(
    "blueCruiser",
    "green",
    "col_cruiser",
    "Cruiser",
    "blue",
    3,
    [],
    [],
    false,
    false
  );
  blueShips.push(blueCruiser);
  blueDestroyer = new Ship(
    "blueDestroyer",
    "yellow",
    "col_destroyer",
    "Destroyer",
    "blue",
    2,
    [],
    [],
    false,

    false
  );
  blueShips.push(blueDestroyer);

  console.log("makeships done");
}

function shipHit(el) {
  let shot = el.attr("id").split(":");
  let target = parseInt(shot[1]) + ":" + parseInt(shot[2]);
  var targets = blueTargets;
  if (currentPlayer == "blue") {
    targets = redTargets;
  }
  for (i in targets) {
    if (targets.includes(target)) {
      return true;
    } else {
      return false;
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
    shipInPlay = blueCarrier;
    messaging("carrier");
  });
  $("#blue-btn-battleShip").on("click", function() {
    console.log("battleShip clicked");
    shipInPlay = blueBattleShip;
    messaging("battleShip");
  });
  $("#blue-btn-cruiser").on("click", function() {
    console.log("cruiser clicked");
    shipInPlay = blueCruiser;
    messaging("cruiser");
  });
  $("#blue-btn-submarine").on("click", function() {
    console.log("submarine clicked");
    shipInPlay = blueSubmarine;
    messaging("submarine");
  });
  $("#blue-btn-destroyer").on("click", function() {
    console.log("destroyer clicked");
    shipInPlay = blueDestroyer;
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
    currentOrientation = flipOrientation(currentOrientation);
  });
  $("#red-btn-carrier").on("click", function() {
    console.log("carrier clicked");
    shipInPlay = redCarrier;
    messaging("carrier");
  });
  $("#red-btn-battleShip").on("click", function() {
    console.log("battleShip clicked");
    shipInPlay = redBattleShip;
    messaging("battleShip");
  });
  $("#red-btn-cruiser").on("click", function() {
    console.log("cruiser clicked");
    shipInPlay = redCruiser;
    messaging("cruiser");
  });
  $("#red-btn-submarine").on("click", function() {
    console.log("submarine clicked");
    shipInPlay = redSubmarine;
    messaging("submarine");
  });
  $("#red-btn-destroyer").on("click", function() {
    console.log("destroyer clicked");
    shipInPlay = redDestroyer;
    messaging("destroyer");
  });
  $("#red-btn-hide").on("click", function() {
    console.log("hide button clicked");
    currentPlayer = "red";
    hideShipsTable(currentPlayer);
    messaging("hide");
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
    currentOrientation = flipOrientation(currentOrientation);
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
    case "gamePhasePlay":
      console.log("shot duplicated message");
      $("#status").html(
        "Ships placed, changing to play mode blue shoots  first"
      );
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

    case "battleShip":
      $("#status").html("You picked BattleShip.");
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

    case "noShip":
      $("#status").html(currentPlayer + " Please pick a ship");
      break;
    case "overlaps":
      $("#status").html(currentPlayer + " You have overlapped a ship");
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
  currentOrientation = "horiz";
  console.log("gamePhase = layout");
  messaging("setup");
  messaging("currentPlayer");
}

function hoverShip(el, ship) {
  let field = el.attr("id").split(":");
  var currentselection = createCurrentSelection(el, currentOrientation, ship);
  if (field[0] === "blue-ships-table" || field[0] === "red-ships-table") {
    if (gamePhase === "layout" && ship) {
      if (
        edgeCollision(el, currentOrientation, ship) ||
        doesOverlap(currentselection, currentPlayer)
      ) {
        elclass = "outofbounds";
        markSquares(el, currentOrientation, ship, elclass);
      } else {
        elclass = "hover";
        if (gamePhase === "layout") {
          markSquares(el, currentOrientation, ship, elclass);
        }
      }
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

function unhoverShip(el, ship) {
  let field = el.attr("id").split(":");
  var currentselection = createCurrentSelection(el, currentOrientation, ship);

  if (field[0] == "blue-ships-table" || field[0] == "red-ships-table") {
    if (gamePhase === "layout" && ship) {
      if (
        edgeCollision(el, currentOrientation, ship) ||
        doesOverlap(currentselection, currentPlayer)
      ) {
        elclass = "outofbounds";
      } else {
        elclass = "hover";
      }
      unmarkSquares(el, currentOrientation, ship, elclass);
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

function clickShip(el, ship) {
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  console.log(field);
  var currentselection = createCurrentSelection(el, currentOrientation, ship);
  if (field[0] == "blue-ships-table" || field[0] == "red-ships-table") {
    //this is placing
    if (gamePhase === "layout" && ship) {
      if (
        edgeCollision(el, currentOrientation, ship) ||
        doesOverlap(currentselection, currentPlayer)
      ) {
        elclass = "outofbounds";
      } else {
        elclass = ship.shipClass;
        markSquares(el, currentOrientation, ship, elclass);

        var currentselection = createCurrentSelection(
          el,
          currentOrientation,
          ship
        );

        addShipstotargetfields(currentPlayer, currentselection);
        addTargetFieldsToShip(currentPlayer, currentselection, ship);
        markShipObject(ship, currentOrientation);
        hideShipbutton(ship);
        if (isFleetPlaced(currentPlayer)) {
          currentPlayer = changeCurrentPlayer(currentPlayer);
        }

        if (isFleetPlaced(currentPlayer)) {
          gamePhase = "play";
          messaging("flip");

          messaging("playing");
        }
      }
    } else {
      console.log("noShip");
      messaging("noShip");
    }
  } else {
    //This is Shooting
    if (
      (field[0] === "blue-shots-table" && currentPlayer === "blue") ||
      (field[0] === "red-shots-table" && currentPlayer === "red")
    ) {
      if (gamePhase === "play") {
        $(el).removeClass("hover");
        if (checkRepeatShot(el, currentPlayer)) {
          messaging("repeated shot");
        } else {
          recordShots(el, currentPlayer);
          if (shipHit(el)) {
            console.log("its a hit");
            $(el).addClass("shotHit");
          } else {
            console.log("its a miss");
            $(el).addClass("shotMiss");
          }
          var ship = shipObjHit(el);
          if (ship) {
            console.log(ship.shipType + " hit");
            $(el).addClass("shotHit");
            addXToHitShip(el);
            if (ship.isSunk()) {
              console.log("isSunk is " + ship.isSunk());
              if (isFleetSunk(currentPlayer)) {
                console.log("game is over " + currentPlayer + " wins");
              } else {
                console.log("play continues");
              }
            }
          } else {
            console.log("its a ship object miss");
            $(el).addClass("shotMiss");
          }
          currentPlayer = changeCurrentPlayer(currentPlayer);
          messaging("flip");
        }
      } else {
        console.log("gamephase is not play");
      }
    }
  }
}

function markShipObject(ship, currentOrientation, currentselection) {
  ship.orientation = currentOrientation;
  ship.targets = currentselection;
  ship.placed = true;
}

function hideShipsTable(currentPlayer) {
  console.log(currentPlayer);
  if (currentPlayer == "blue") {
    $("#blue-ships-table").addClass("hidden");
  } else {
    $("#red-ships-table").addClass("hidden");
  }
}

function hideShipbutton(ship) {
  switch (ship.shipId) {
    case "blueCarrier":
      console.log(ship + " placed");
      var buttonToHide = $("#blue-btn-carrier");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueBattleShip":
      console.log(ship + " placed");
      var buttonToHide = $("#blue-btn-battleShip");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueCruiser":
      console.log(ship + " placed");
      var buttonToHide = $("#blue-btn-cruiser");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueSubmarine":
      console.log(ship + " placed");
      var buttonToHide = $("#blue-btn-submarine");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "blueDestroyer":
      console.log(ship + " placed");
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

    case "redBattleShip":
      console.log(ship + " placed");
      var buttonToHide = $("#red-btn-battleShip");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redSubmarine":
      console.log(ship + " placed");
      var buttonToHide = $("#red-btn-submarine");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redCruiser":
      console.log(ship + " placed");
      var buttonToHide = $("#red-btn-cruiser");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;

    case "redDestroyer":
      console.log(ship + " placed");
      var buttonToHide = $("#red-btn-destroyer");
      buttonToHide.addClass("hidden");
      resetVariablesDuringLayout();
      break;
  }
}

function checkRepeatShot(el, currentPlayer) {
  var checkShots = redshots;
  if (currentPlayer === "blue") {
    checkShots = blueshots;
  }
  if (checkShots.indexOf(el.attr("id")) !== -1) {
    return true;
  } else {
    return false;
  }
}

function addXToHitShip(el) {
  debugger;
  targetTable = "blue-ships-table";
  if (currentPlayer === "blue") {
    targetTable = "red-ships-table";
  }
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  var squareToMark = targetTable + ":" + field[1] + ":" + field[2];
  var square = document.getElementById(squareToMark);
  console.log("square to x " + square);
  $(square).removeClass("hover");
  $(square).addClass("shipHit");

  console.log(currentPlayer + "  is blue");
}

function markHitShips(el) {
  targetTable = "blue-ships-table";
  if (currentPlayer === "blue") {
    targetTable = "red-ships-table";
  }
  console.log(el.attr("id"));
  let field = el.attr("id").split(":");
  squareToMark = targetTable + ":" + field[1] + ":" + field[2];
  squareToMark.addClass("shotHit");
  console.log(currentPlayer + "  is blue");
}
function recordShots(el, currentPlayer) {
  if (currentPlayer === "blue") {
    blueshots.push(el.attr("id"));
    console.log("shot added to blueshots");
  } else {
    redshots.push(el.attr("id"));
    console.log("shot added to red shots");
  }
}

function resetVariablesDuringLayout() {
  shipInPlay = null;
  currentselection = [];
  elclass = {};
}
function pickShipColor() {
  console.log(" getting  color for ship placement");
}

function markSquares(el, currentOrientation, ship, elclass) {
  let field = el.attr("id").split(":");

  for (i = 0; i < ship.length; i++) {
    if (currentOrientation !== "horiz") {
      squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
    } else {
      squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
    }
    var square = document.getElementById(squareStr);
    console.log("fields are " + elclass);

    $(square).addClass(elclass);
  }
}

function unmarkSquares(el, currentOrientation, ship, elclass) {
  if (ship) {
    let field = el.attr("id").split(":");
    for (i = 0; i < ship.length; i++) {
      if (currentOrientation !== "horiz") {
        squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
      } else {
        squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
      }
      var square = document.getElementById(squareStr);
      console.log("square is" + elclass);
      $(square).removeClass(elclass);
    }
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

function createCurrentSelection(el, currentOrientation, ship) {
  var currentselection = [];
  if (ship) {
    let field = el.attr("id").split(":");
    for (i = 0; i < ship.length; i++) {
      if (currentOrientation !== "horiz") {
        squareStr = field[0] + ":" + (parseInt(field[1]) + i) + ":" + field[2];
      } else {
        squareStr = field[0] + ":" + field[1] + ":" + (parseInt(field[2]) + i);
      }
      var square = document.getElementById(squareStr);
      console.log("square is" + elclass);
      currentselection.push(square);
    }
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
function addTargetFieldsToShip(currentPlayer, currentselection, ship) {
  console.log(currentPlayer);
  console.log(currentselection);
  for (i in currentselection) {
    var j = $(currentselection[i]);
    let k = j.attr("id").split(":");
    var l = parseInt(k[1]) + ":" + parseInt(k[2]);
    ship.targets.push(l);
  }
}

function markShipObject(ship, currentOrientation) {
  ship.orientation = currentOrientation;
  ship.placed = true;
}

function doesOverlap(currentselection, currentPlayer) {
  var fleet = redShips;
  if (currentPlayer === "blue") {
    fleet = blueShips;
  }
  var selectionToTest = currentselection;

  for (i = 0; i < fleet.length; i++) {
    console.log(i);
    for (j = 0; j < selectionToTest.length; j++) {
      console.log(j);
      let testgroup = $(selectionToTest[j])
        .attr("id")
        .split(":");
      let testee = parseInt(testgroup[1]) + ":" + parseInt(testgroup[2]);

      if (fleet[i].targets.includes(testee)) {
        return true;
      }
    }
  }
  return false;
}

function edgeCollision(el, currentOrientation, ship) {
  if (ship) {
    console.log(el, currentOrientation, ship.length);
    let field = el.attr("id").split(":");
    console.log(field);
    var x = parseInt(field[1]);
    var y = parseInt(field[2]);

    var maxx = x + ship.length;
    var maxy = y + ship.length;

    if (currentOrientation === "horiz") {
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
  return false;
}
