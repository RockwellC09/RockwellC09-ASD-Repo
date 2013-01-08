//Christopher Rockwell
//Project 4
//MiU 1211


$('#home').on('pageinit', function(){
});	

//display all items page initialize
$('#displayPage').on('pageinit', function(){
	getData();
});	

//low priority page initialize
$('#prior1').on('pageinit', function(){
	low();
});	

//medium priority page initialize
$('#prior2').on('pageinit', function(){
	medium();
});	

//high priority page initialize
$('#prior3').on('pageinit', function(){
	high();
});	

//items less than $500 browse page initialize
$('#cost1').on('pageinit', function(){
	cost1();
});	

//items between $500 and $1000 browse page initialize
$('#cost2').on('pageinit', function(){
	cost2();
});	

//items more than $1001 browse page initialize
$('#cost3').on('pageinit', function(){
	cost3();
});	

//items with a time frame 0-6 months page initialize
$('#time1').on('pageinit', function(){
	time1();
});	

//items with a time frame 6 months to a year page initialize
$('#time2').on('pageinit', function(){
	time2();
});

//items with a time frame between 1-3 years page initialize
$('#time3').on('pageinit', function(){
	time3();
});

//items with a time frame more than 3 years page initialize
$('#time4').on('pageinit', function(){
	time4();
});	

//items with a progress between 0-25% page initialize
$('#prog1').on('pageinit', function(){
	progress1();
});	

//items with a progress between 26-50% page initialize
$('#prog2').on('pageinit', function(){
	progress2();
});

//items with a progress between 51-75% page initialize
$('#prog3').on('pageinit', function(){
	progress3();
});

//items with a progress between 76-99% page initialize
$('#prog4').on('pageinit', function(){
	progress4();
});		

//additems page initialize		
$('#additems').on('pageinit', function(){
		var myForm = $('#add');
		    myForm.validate({
		    errorPlacement: function(error, element) {
				if (element.attr("name") === "time") {
				error.insertAfter($(element).parent());
			} else {
				error.insertAfter(element);
			}/* $('body').scrollTop(0); */
		},
		messages: {
			time: {
				required: "Please select a time frame. <br>",
				},
			itemName: {
				required: "Please enter a item name. <br>",
				},
			totalCost: {
				required: "Please enter the total cost. <br>",
				},
			amount: {
				required: "Please enter the amount saved. <br>",
				}	
		},
			invalidHandler: function(form, validator) {
			}
		/*
	submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
*/
		
	});
/*
	$("#reset").click(function() {
		$("#amount").val('5');
		alert("Handler for .click() called.");
	});
*/
	$("#display").click(function() {
		if (localStorage.length === 0){
	            alert("There is no data in local storage so default data was added.");
	            autofillData();
	        }
		$.mobile.changePage( '#displayPage' );
		window.location.reload();
	});
	$("#submit").click(function() {
		var data = myForm.serializeArray();
		storeData(data);
		window.location.reload();
		
	});
	
	//reset button click
	$("#reset").click(function() {
		window.location.reload();
	});
	
	//icon click
	$("#icon").click(function() {
		$.mobile.changePage( '#home' );
	});
	
	$("#clearData").click(function() {
		if(localStorage.length === 0){
            alert("There is no data to clear.");
        } else {
            var answer = confirm("Are you sure you want to delete all data?");
            if (answer){
                localStorage.clear();
                alert("All items deleted.");
                window.location.reload();
                return false;
            } else {
                alert("Your items were not deleted.");
            }
        }
	});
	var now = new Date();
	if (now.getDate() < 10) {
		var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + 0 + now.getDate();
	} else {
		var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	}
    $('#pledge').val(today);
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 for(var n in json) {
            var id = Math.floor((Math.random()*10000000)+1);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
};

var getData = function(){
		
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		 $("#dis").append($(makeDiv));
		for(var i=0,j=localStorage.length;i<j;i++){
            var makeLi = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            if (i %2 != 0) {
	            makeSubList.setAttribute("id", "sub");
            } else {
	            makeSubList.setAttribute("id", "sub2");
           }
            makeLi.appendChild(makeSubList);
            getImage(obj.priority[1], makeSubList);
            getProgress(obj, makeSubList);
             for (var x in obj){
                var makeSubListItem =document.createElement('li');
                makeSubList.appendChild(makeSubListItem);
                makeSubListItem.style.color = "white";
                optSubText = "<strong> " + obj[x][0] +"</strong> "+ "<p style=\"display:inline;\">" + obj[x][1] + "</p>";
                makeSubListItem.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
                }
            makeItemLinks(localStorage.key(i), linksLi); //creates our edit and delete button.links for each item in local storage
            }
            $.mobile.changePage( '#displayPage' );
};

var storeData = function(data, key){
	//if there is no key, this means there is a brand new item and we need a new key.
	//else we'll set the id to the existing key that we're editing so that it will save over the data
     if (!key) {
     		var id =  Math.floor((Math.random()*10000000)+1); 
     } else {
         	var id = key;
     }	
	
	var val =[];
	$.each(data, function(i, field){
		val.push(field.value);
  });

  var item = {};
            item.name = ["Item Name:", val[0]];
            item.brand = ["Item Brand:", val[1]];
            item.quantity = ["Quantity:", val[2]];
            item.cost = ["Total Cost:", "$" + val[3]];
            item.date = ["Pledge Date:", val[4]];
            item.priority = ["Priority:", val[5]];
            item.timeFrame = ["Time Frame:", val[6]];
            item.amountSaved = ["Amount Saved:", "$" + val[7]];
            item.motivation = ["Motivation:", val[8]];
            item.space = ["<br>", ""];

            localStorage.setItem(id, JSON.stringify(item));
            
            if (!key) {
            	alert("Data Saved!");
     		   } else {
	     		 alert("Data Edited!");
     		   }
            
            $('body').scrollTop(0);
            
}; 

//function to get all items with a low priority and write them to the prior page for the browse button
function low() {
	var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var priorList = document.createElement('li');
		priorList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.priority[1] == "Low!") {
			if(count %2 != 0) {
			priorList.setAttribute("id", "alt");
			}
		count++;
		priorList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#low").append($(priorList));
		}
	}

}

//function to get all items with a medium priority and write them to the prior2 page for the browse button
function medium() {
	
		var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var priorList = document.createElement('li');
		priorList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.priority[1] == "Medium!!") {
			if(count %2 != 0) {
			priorList.setAttribute("id", "alt");
			}
		count++;
		priorList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#medium").append($(priorList));
		}
	}
}

//function to get all items with a High priority and write them to the prior3 page for the browse button
function high() {
	
		var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var priorList = document.createElement('li');
		priorList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.priority[1] == "High!!!") {
			if(count %2 != 0) {
			priorList.setAttribute("id", "alt");
			}
		count++;
		priorList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#high").append($(priorList));
		}
	}
}

function cost1() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var costList = document.createElement('li');
		costList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		var getVal = obj.cost[1].replace(/\$/g,'');
		if (getVal < 500 && getVal > 0) {
			if(count %2 != 0) {
			costList.setAttribute("id", "alt");
			}
		count++;
		costList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#lowCost").append($(costList));
		}
	}

}

function cost2() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var costList = document.createElement('li');
		costList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		var getVal = obj.cost[1].replace(/\$/g,'');
		if (getVal < 1000 && getVal > 501) {
			if(count %2 != 0) {
			costList.setAttribute("id", "alt");
			}
		count++;
		costList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#medCost").append($(costList));
		}
	}

}

function cost3() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var costList = document.createElement('li');
		costList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		var getVal = obj.cost[1].replace(/\$/g,'');
		if (getVal > 1001) {
			if(count %2 != 0) {
			costList.setAttribute("id", "alt");
			}
		count++;
		costList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#highCost").append($(costList));
		}
	}

}

function time1() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var timeList = document.createElement('li');
		timeList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.timeFrame[1] == "0-6 months") {
			if(count %2 != 0) {
			timeList.setAttribute("id", "alt");
			}
		count++;
		timeList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#lowTime").append($(timeList));
		}
	}

}

function time2() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var timeList = document.createElement('li');
		timeList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.timeFrame[1] == "6 months to a year") {
			if(count %2 != 0) {
			timeList.setAttribute("id", "alt");
			}
		count++;
		timeList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#medTime").append($(timeList));
		}
	}

}

function time3() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var timeList = document.createElement('li');
		timeList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.timeFrame[1] == "Between 1-3 years") {
			if(count %2 != 0) {
			timeList.setAttribute("id", "alt");
			}
		count++;
		timeList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#medHighTime").append($(timeList));
		}
	}

}

function time4() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var timeList = document.createElement('li');
		timeList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (obj.timeFrame[1] == "More than 3 years") {
			if(count %2 != 0) {
			timeList.setAttribute("id", "alt");
			}
		count++;
		timeList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#highTime").append($(timeList));
		}
	}

}

function progress1() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var progList = document.createElement('li');
		progList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (percentRound > 0 && percentRound < 26) {
			if(count %2 != 0) {
			progList.setAttribute("id", "alt");
			}
		count++;
		progList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#lowProgress").append($(progList));
		}
	}

}

function progress2() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var progList = document.createElement('li');
		progList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (percentRound > 25 && percentRound < 51) {
			if(count %2 != 0) {
			progList.setAttribute("id", "alt");
			}
		count++;
		progList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#medProgress").append($(progList));
		}
	}

}

function progress3() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var progList = document.createElement('li');
		progList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (percentRound > 50 && percentRound < 76) {
			if(count %2 != 0) {
			progList.setAttribute("id", "alt");
			}
		count++;
		progList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#medHighProgress").append($(progList));
		}
	}

}

function progress4() {
			var count = 0;
	for(var i=0,j=localStorage.length;i<j;i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var getVal = obj.amountSaved[1].replace(/\$/g,'');
          var getMax = obj.cost[1].replace(/\$/g,'');
          var percent = (getVal * 100) / getMax;
          var percentRound = Math.round(percent * 10) / 10;
		var progList = document.createElement('li');
		progList.setAttribute("class", "ui-li ui-li-static ui-btn-up-c");
		if (percentRound > 75 && percentRound < 100) {
			if(count %2 != 0) {
			progList.setAttribute("id", "alt");
			}
		count++;
		progList.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px 0px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:0px 0px 0px 10px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
									+ "<strong> " + obj.name[0] +"</strong> " + obj.name[1] + "<br>"
									+ "<strong> " + obj.brand[0] +"</strong> " + obj.brand[1] + "<br>"
									+ "<strong> " + obj.quantity[0] +"</strong> " + obj.quantity[1] + "<br>" 
								     + "<strong> " + obj.cost[0] +"</strong> " + obj.cost[1] + "<br>"
								     + "<strong> " + obj.date[0] +"</strong> " + obj.date[1] + "<br>" 
								     + "<strong> " + obj.priority[0] +"</strong> " + obj.priority[1] + "<br>" 
								     + "<strong> " + obj.timeFrame[0] +"</strong> "+ "" + obj.timeFrame[1] + "<br>"
								     + "<strong> " + obj.amountSaved[0] +"</strong> " + obj.amountSaved[1] + "<br>" 
								     + "<strong> " + obj.motivation[0] +"</strong> "+ "" + obj.motivation[1] + "</p>";
		$("#highProgress").append($(progList));
		}
	}

}

var	deleteItem = function (key){
	var ask = confirm("Are you sure you want to delete this item?");
        if (ask){
            localStorage.removeItem(key);
            alert("Item deleted");
            window.location.reload();
        } else {
            alert("The item was not deleted");
        }		
};


var editItem = function (){
	//Grab the data from the item from local storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var myForm = $('#add');
        var data = myForm.serializeArray();
        
        select(item);
        
        var cost = item.cost[1].replace(/\$/g,'');
        var cost2 = item.amountSaved[1].replace(/\$/g,'');
        $('#priority2').removeAttr('checked');
        if (item.priority[1] == "Low!") {
                $('#priority1').prop('checked', true);
            } else if (item.priority[1] == "Medium!!") {
                $('#priority2').prop('checked', true);
            } else if (item.priority[1] == "High!!!") {
                $('#priority3').prop('checked', true);
            }
            
        //show form
        $.mobile.changePage( '#additems' );
        
        $('#itemName').val(item.name[1]);
        $('#itemBrand').val(item.brand[1]);
        $('#quantity').val(item.quantity[1]); 
        $('#totalCost').val(cost);
        $('#pledge').val(item.date[1]);
        $('#priority2').removeAttr('checked');
        $('#amount').val(cost2);
        $('#motivation').val(item.motivation[1]);
        
        
        var key = this.key;
        
        //$('#submit').hide();
        $('#submit').closest('.ui-btn').hide();
        var editButton = $("<button id=\"sub\" data-theme=\"b\">Edit</button>");
        //editButton.setAttribute("type", "submit");
        //editButton.setAttribute("id", "sub");
        //editButton.setAttribute("class", "ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b");
        //editButton.setAttribute("style", "width:100%; height:35px;");
        //editButton.setAttribute("value", "Edit")
        $("#ed").append($(editButton));
        editButton.button();
        //$('#sub').attr("onclick", "ed()");
        
        
        $('#sub').click( key ,function() {
        var data = myForm.serializeArray();
        storeData(data, key);
        window.location.reload();
        });

   
};
					
var clearLocal = function(){
	localStorage.clear();
	alert("Data Cleared");
};

function select(item) {
	switch(item.timeFrame[1])
        {
        case "0-6 months":
	        	$('#sel1').attr('selected', 'selected');
	     		break;
	   case "6 months to a year":
	     		$('#sel2').attr('selected', 'selected');
	     		break;
	   case "Between 1-3 years":
			$('#sel3').attr('selected', 'selected');
			break;
	   default:
	   		$('#sel4').attr('selected', 'selected');
	   	}
}

function getImage(priorityVal, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        newImg.setAttribute("id", "ex");
        newImg.setAttribute("style", "margin-top: -20px;")
         newImg.setAttribute("align", "right");
        var setSrc = newImg.setAttribute("src", "images/" + priorityVal + ".png");
        imageLi.appendChild(newImg);
    }

function getProgress(obj, makeSubList) {
        var getVal = obj.amountSaved[1].replace(/\$/g,'');
        var getMax = obj.cost[1].replace(/\$/g,'');
        var percent = (getVal * 100) / getMax;
        var percentRound = Math.round(percent * 10) / 10;
        var prog = document.createElement('li');
        prog.style.color = "white";
        prog.innerHTML = "<h3 style=\"text-align: center; margin:0px 0px 10px 0px;\">Progress</h3><h4 style=\"text-align: center; margin:0px 0px -15px 0px;\">" + percentRound + "%</h4><div class=\"meter red\" style=\"margin:20px 15px 10px -25px;\"><span style=\"width: " + percentRound + "% \"></span></div>"
        makeSubList.appendChild(prog);
        
    }
    

//Make item links
//create edit and delete links for each item in storage
function makeItemLinks(key, linksLi) {

	   var editLink = document.createElement('input');
        editLink.setAttribute("type", "button");
        editLink.key = key;
        editLink.setAttribute("id", "edit");
        editLink.setAttribute("value", "Edit");
        editLink.setAttribute("onclick", "editItem(key);");
        editLink.setAttribute("data-theme", "a");
        editLink.setAttribute("style", "width:120px; margin:0px 5px 20px -10px; display:inline;");
        editLink.setAttribute("class", "ui-btn-up-c ui-btn-inner ui-btn-corner-all");
        linksLi.appendChild(editLink);
        editLink.addEventListener("click", editItem);	

        var deleteLink = document.createElement('input');
        deleteLink.setAttribute("type", "button");
        deleteLink.key = key;
        deleteLink.setAttribute("id", "del");
        deleteLink.setAttribute("value", "Delete");
        deleteLink.setAttribute("onclick", "deleteItem(key);");
        deleteLink.setAttribute("data-theme", "a");
        deleteLink.setAttribute("style", "width:120px; margin:0px 0px 20px 5px; display:inline;");
        deleteLink.setAttribute("class", "ui-btn-up-a ui-btn-inner ui-btn-corner-all");
        linksLi.appendChild(deleteLink);
        


}

$(function() {
	$(".meter > span").each(function() {
		$(this)
			.data("origWidth", $(this).width())
			.width(0)
			.animate({
				width: $(this).data("origWidth")
			}, 1200);
	});
});

