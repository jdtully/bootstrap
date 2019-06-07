  numRows = 10
  numCols = 10
  letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  currentPlayer = ["blue"]
  otherPlayer = ["red"]
  currentShip = []
  gamePhase = ["setup"]
  
  //set  rows  and  columns  to  variables  with a  selector


  //get the body
  var tableContainer = document.getElementById('table0');
  //create table
  var table = document.createElement('table');

  //create a table body
    var tblB = document.createElement('tbody');
  //append table body to the table
    table.appendChild(tblB);
  //nested loops  to create columns and  rows
  for(var i = 0; i<numRows; i++) {
    //create rows
    var tr = document.createElement('tr');
    //append rows  to body
    tblB.appendChild(tr);

    //loop for cols
    for (var j = 0; j<numCols; j++) {      
      // create cols
        var td = document.createElement('td');
        // put  test text in cells
            td.innerText=i+":" + j
        //add cols to rows
        tr.appendChild(td);
    }
  }
//append the table to the body
tableContainer.appendChild(table);

//set  rows  and  columns  to  variables  with a  selector

//after the body gets wrapped in  a  function there should  be a way to concatinate the current player  with the
//get the body
var tableContainer = document.getElementById('table1');
//create table
var table = document.createElement('table');

//create a table body
  var tblB = document.createElement('tbody');
//append table body to the table
  table.appendChild(tblB);
//nested loops  to create columns and  rows
for(var i = 0; i<numRows; i++) {
  //create rows
  var tr = document.createElement('tr');
  //append rows  to body
  tblB.appendChild(tr);

  //loop for cols
  for (var j = 0; j<numCols; j++) {      
    // create cols
      var td = document.createElement('td');
      // put  test text in cells
          td.innerText=i+":" + j
      //add cols to rows
      tr.appendChild(td);
  }
}
//append the table to the body
tableContainer.appendChild(table);



function makeShips() {
  let redCarrier = [1,2,3,4,5]
  let redBattleship = [1,2,3,4]
  let redSubmarine = [1,2,3]
  let redCruiser = [1,2,3]
  let rDestroyer = [1,2]
  let blueCarrier = [1,2,3,4,5]
  let blueBattleship = [1,2,3,4]
  let blueSubmarine = [1,2,3]
  let blueCruiser = [1,2,3]
  let blueDestroyer = [1,2]
}
function setUp () {
  buildGrid()
  makeShips()
  gamePhase


}
$(document).ready(function() {
  console.log("ready")
  debugger
  if(gamePhase == "setup") {
    console.log("gamePhase = setup")
    messaging("setup");
    messaging("currentplayer")
  }
  $("#button1").on ("click",(function() {
    messaging("reset");
  })); 
  $("#button2").on ("click",(function() {
    console.log("carrier clicked")
    messaging("carrier");
  })); 
  $("#button3").on ("click",(function() {
    console.log("battleship clicked")
    messaging("battleship");
  })); 
  $("#button4").on ("click",(function() {
    console.log("cruiser clicked")
    messaging("cruiser");
  })); 
  $("#button5").on ("click",(function() {
    console.log("submarine clicked")
    messaging("submarine");
  })); 
  $("#button6").on ("click",(function() {
    console.log("destroyer clicked")
    messaging("destroyer");
  })); 
  $("#button7").on ("click",(function() {
    console.log("hide button clicked")
    messaging("hide"); 
  })); 
  $("#button8").on ("click",(function() {
    console.log("switchplayer button clicked")
    messaging("switch");
  })); 
});

function messaging(message) {
  switch (message) {
      case "reset":
          console.log("reset Clicked");
          $('#status').html("New game! blue first!.");
          break;

      case "winner": 
          console.log ('winner is ' + currentPlayer);
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
          $('#status').html("You sank " + otherPlayer+ "'s" + shipType );
          break;

      case "start":
          $('#status').html("New game! X goes first!.");
          break;
      
      case "pickship":
          $('#status').html("You picked "+ shiptype + ".")
          break;

      case "hit":
          console.log ("Hit")
          $('#status').html("You hit" + otherPlayer + "vessel!" );
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
      case "currentplayer":
          $('#currentplayer').html("current player is " + currentPlayer);
          break;
      
  }
}
function start() {
  console.log("this is  to make it stop complaining")
}


function pickship(shipType) {
    switch (shiptype) {
        case "carrier":
            if(currentPlayer ==="blue") {
              currentShip = currentPlayer + blueCarrier
              console.log("Carrier Clicked");
              $('#status').html("Carrier Selected");
              break;
            }
  
        case "battleship": 
            console.log ("Battleship Clicked");          
            break;
  
        case "cruiser":
            console.log ("Cruiser Clicked")
            break;
  
        case "submarine":
            console.log ("Cruiser Clicked")
            break;
  
        case "destroyer":
            console.log ("Cruiser Clicked")
            break;
    }
}


function pickship() {
  console.log("Need  to write pickship")
}

//function switchPlayers() {
  //if(currentplayer === "blue");
  console.log("need to write switchPlayers")
//}
