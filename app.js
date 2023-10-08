// Code can be run on code.org's App Lab.

var adult = 0;
var senior = 0;
var child = 0;
var total = 0;
var seats = 0;
var sold = 0;
var movieName = "";
var movieId = 0;
var username = "";

hideElement("label8");
hideElement("label6");
setScreen("screen4");

onEvent("buttonLogin", "click", function( ) {
  username = getProperty("text_input1", "text");
	readRecords("FandangoUsers", {username:username, password:getProperty("text_input2", "text")}, function(records){
	  if (records.length<=0){
	    showElement("label8");
	    hideElement("label6");
	    return;
	  }
  	hideElement("label8");
  	setScreen("screen3");
	  setText("labelWelcome", "Welcome " + username + "!");
	});
});

onEvent("buttonReg", "click", function( ) {
	username = getProperty("text_input1", "text");
	readRecords("FandangoUsers", {username:username}, function(records){
	  if (records.length>=1){
	    showElement("label6");
	    hideElement("label8");
	    return;
	  }
	  createRecord("FandangoUsers", {username:username, password:getProperty("text_input2", "text")}, function() {});
	  hideElement("label8");
	  setScreen("screen3");
	  setText("labelWelcome", "Welcome " + username + "!");
	});
});

function readMovie(){
  readRecords("Fandango", {movie:movieName}, function(records){
    seats = records[0].seats;
    sold = records[0].sold;
    if (sold>=seats){
      setText("buttonBuy", "Sold Out");
      setProperty("buttonBuy", "background-color", "#CCCCCC");
    }
  });
}

onEvent("buttonSW", "click", function( ) {
	setScreen("screen1");
	movieName = "starwars";
	movieId = 1;
	readMovie();
});

onEvent("buttonAV", "click", function( ) {
	setScreen("screen1");
	movieName = "avengers";
	movieId = 2;
	readMovie();
});

onEvent("buttonAVA", "click", function( ) {
	setScreen("screen1");
	movieName = "avatar";
	movieId = 3;
	readMovie();
});

onEvent("buttonAM", "click", function( ) {
	if (adult>0){
	  adult--;
	  total=total-10;
	  setText("labelTotal", total);
	  setText("labelAX", adult);
	}
});

onEvent("buttonAP", "click", function( ) {
  if (adult+senior+child>=seats-sold)
    return;
    
  adult++;
  total=total+10;
  setText("labelTotal", total);
  setText("labelAX", adult);	
});

onEvent("buttonSM", "click", function( ) {
	if (senior>0){
	  senior--;
	  total=total-7;
	  setText("labelTotal", total);
	  setText("labelSX", senior);
	}
});

onEvent("buttonSP", "click", function( ) {
  if (adult+senior+child>=seats-sold)
    return;
	senior++;
	total=total+7;
	setText("labelTotal", total);
	setText("labelSX", senior);
});

onEvent("buttonCM", "click", function( ) {
	if (child>0){
	  child--;
	  total=total-5;
	  setText("labelTotal", total);
	  setText("labelCX", child);
	}
});

onEvent("buttonCP", "click", function( ) {
  if (adult+senior+child>=seats-sold)
    return;
	child++;
	total=total+5;
	setText("labelTotal", total);
	setText("labelCX", child);
});

onEvent("buttonBuy", "click", function( ) {
  readMovie();
  if (sold>=seats) {
    return;
  }
  updateRecord("Fandango", {id: movieId, seats:seats, sold:sold+adult+senior+child, movie:movieName}, function() {
    setScreen("screen2");
  });
});
