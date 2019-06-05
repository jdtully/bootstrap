//learning to add elements  to a webpage via javascript

var div = document.createElement("div");
div.innerHTML = "This is a div javascript made.";
document.getElementById("message").appendChild(div);
  
$( "#button1" ).click(function() {
  console.log("clicked");
});


//get the body
var body =  document.getElementsByTagName("body") [0];
//create table
  var table = document.createElement('table');
//create a table body
  var tblB = document.createElement('tbody');
//append table body to the table
  table.appendChild(tblB);
//nested loops  to create columns and  rows
for(var i = 0; i<10; i++) {
  //create rows
  var tr = document.createElement('tr');
  //append rows  to body
  tblB.appendChild(tr);

  //loop for cols
  for (var j = 0; j<10; j++) {
    // create cols
      var td = document.createElement('td');
      td.innerText=i+":" + j
      //add cols to rows
      tr.appendChild(td);
  }
}
//append the table to the body
body.appendChild(table);



