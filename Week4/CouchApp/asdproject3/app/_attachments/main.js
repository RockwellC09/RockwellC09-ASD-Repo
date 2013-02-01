//Christopher Rockwell
//Project 4
//ASD 1301


$('#home').on('pageinit', function(){
});	

//display all items page initialize
$('#displayPage').on('pageinit', function(){
	getData();
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
			},
	submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
			setTimeout(function (){
			$.mobile.changePage( '#displayPage' );
			window.location.reload();
			}, 1000);
		}
		
	});
/*
	$("#reset").click(function() {
		$("#amount").val('5');
		alert("Handler for .click() called.");
	});
*/
	
	$('#couch').click(function() {
		//keep ajax from chaching 
		$.ajaxSetup({ cache: false });
		//clear local storage
		//localStorage.clear();
		$.ajax({
			"url": '_view/data',
			"dataType": "json",
			"success": function(data) {
				$.each(data.rows, function(index, item) {
						var itemObj = {
							"name": ["Item Name:", item.value.name[1]],
							"brand": ["Item Brand:", item.value.brand[1]],
							"quantity": ["Quantity:", item.value.cost[1]],
							"cost": ["Total Cost:", item.value.cost[1]],
							"date": ["Pledge Date:", item.value.date[1]],
							"priority": ["Priority:", item.value.priority[1]],
							"timeFrame": ["Time Frame:", item.value.timeFrame[1]],
							"amountSaved": ["Amount Saved:", item.value.amountSaved[1]],
							"motivation": ["Motivation:", item.value.motivation[1]],
							"space": ["<br>", "<br>"]
						}
				});
				$.mobile.changePage( '#displayPage' );
				window.location.reload();
			}
		});
	});
	
	//reset button click
	$('#reset').click(function() {
		window.location.reload();
	});
	
	//icon click
	$('#icon').click(function() {
		$.mobile.changePage( '#home' );
	});
	
//	$('#clearData').click(function() {
//		if(localStorage.length === 0){
//            alert("There is no data to clear.");
//        } else {
//            var answer = confirm("Are you sure you want to delete all data?");
//            if (answer){
//                localStorage.clear();
//                alert("All items deleted.");
//                window.location.reload();
//            } else {
//                alert("Your items were not deleted.");
//            }
//        }
//	});
	var now = new Date();
	if (now.getMonth() < 10) {
		var today = now.getFullYear() + '-' + 0 + (now.getMonth() + 1) + '-' + now.getDate();
	} else {
		var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	}
    $('#pledge').val(today);
	//any other code needed for addItem page goes here
	
});

var getData = function(){
		
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		 $("#dis").append($(makeDiv));
		 $.ajax({
			"url": '_view/data',
			"dataType": "json",
			"success": function(data) {
				for(var i=0,j=data.rows.length;i<j;i++){
					var makeLi = document.createElement('li');
					var linksLi = document.createElement('li');
					makeList.appendChild(makeLi);
					var key = data.rows[i].value._id;
					var rev = data.rows[i].value._rev;
					var value = {
						"name": ["Item Name:", data.rows[i].value.name[1]],
						"brand": ["Item Brand:", data.rows[i].value.brand[1]],
						"quantity": ["Quantity:", data.rows[i].value.quantity[1]],
						"cost": ["Total Cost:", data.rows[i].value.cost[1]],
						"date": ["Pledge Date:", data.rows[i].value.date[1]],
						"priority": ["Priority:", data.rows[i].value.priority[1]],
						"timeFrame": ["Time Frame:", data.rows[i].value.timeFrame[1]],
						"amountSaved": ["Amount Saved:", data.rows[i].value.amountSaved[1]],
						"motivation": ["Motivation:", data.rows[i].value.motivation[1]],
						"space": ["<br>", "<br>"]
					}
					
					//convert the string from local storage value back to an object by using JSON.parse()
					var string = JSON.stringify(value);
					var obj = JSON.parse(string);
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
					makeItemLinks(key, linksLi, rev); //creates our edit and delete button.links for each item in local storage
				}
			}
		});
            //$.mobile.changePage( '#displayPage' );
};

var storeData = function(data, key, rev){
	//if there is no key, this means there is a brand new item and we need a new key.
	//else we'll set the id to the existing key that we're editing so that it will save over the data
     var val =[];
	$.each(data, function(i, field){
		val.push(field.value);
	});
     if (!key) {
	
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

	$.couch.db("asdcloud").saveDoc(item, {
		success: function(data) {
			//console.log(data);
		}
	});
	alert("Data Saved to Couch DB!");
     } else {
        var doc = {}
	console.log(key + " / " + rev);
		doc._id = key;
		doc._rev = rev;
		doc.name = ["Item Name:", val[0]];
		doc.brand = ["Item Brand:", val[1]];
		doc.quantity = ["Quantity:", val[2]];
		doc.cost = ["Total Cost:", "$" + val[3]];
		doc.date = ["Pledge Date:", val[4]];
		doc.priority = ["Priority:", val[5]];
		doc.timeFrame = ["Time Frame:", val[6]];
		doc.amountSaved = ["Amount Saved:", "$" + val[7]];
		doc.motivation = ["Motivation:", val[8]];
		doc.space = ["<br>", ""];
	$.couch.db("asdcloud").saveDoc(doc, {
		success: function(data) {
			//console.log(data);
		}
	});
	alert("Data Edited!");
     }
            
            $('body').scrollTop(0);
            
}; 

var	deleteItem = function (key, rev){
	var ask = confirm("Are you sure you want to delete this item?");
        if (ask){
		var doc = {
		_id: key,
		_rev: rev
		};
		$.couch.db("asdcloud").removeDoc(doc, {
				success: function(data) {
				    //console.log(data);
			       },
			       error: function(status) {
				   console.log(status);
			}
		});
            alert("Item deleted");
	    //wait one second for the the page change and refresh so the data can delete
	    setTimeout(function (){
			$.mobile.changePage( '#displayPage' );
			window.location.reload();
	     }, 1000);
        } else {
            alert("The item was not deleted");
        }		
};


var editItem = function (key, rev){
	
	$.couch.db("asdcloud").openDoc(key, {
		success: function(data) {
			//Grab the data from the item from local storage
			var value = JSON.stringify(data);
			var item = JSON.parse(value);
			var myForm = $('#add');
			var formData = myForm.serializeArray();
			
			//set all the form values to the item being edited values
			select(item);
			var cost = item.cost[1].replace(/\$/g,'');
			var cost2 = item.amountSaved[1].replace(/\$/g,'');
			$('#priority1').removeAttr('checked');
			$('#priority2').removeAttr('checked');
			$('#priority3').removeAttr('checked');
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
			$('#amount').val(cost2);
			$('#motivation').val(item.motivation[1]);
			
			//Remove the submit button and replace it with the Edit button
			$('#submit').closest('.ui-btn').hide();
			var editButton = $("<input type=\"button\" id=\"sub\" data-theme=\"b\" value=\"Edit\"></input>");
			$('#ed').append($(editButton));
			editButton.button();
			
			//Edit button click conditional
			$('#sub').click( key ,function() {
				var dataEdit = myForm.serializeArray();
				storeData(dataEdit, key, rev);
				//wait one second for the the page change and refresh so the data can store
				setTimeout(function (){
					$.mobile.changePage( '#displayPage' );
					window.location.reload();
				}, 1000);
			});
			//if enter is clicked this is force click the Edit button instead of doing the submit action
			$(document).ready(function() {
				$(window).keydown(function(event){
					if(event.keyCode == 13) {
						$('#sub').trigger('click');
					}
				});
			});
		}
	});



   
};
					
//var clearLocal = function(){
//	localStorage.clear();
//	alert("Data Cleared");
//};

//function to select the proper time frame for the Edit form
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

//get the proper image based off the priority
function getImage(priorityVal, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        newImg.setAttribute("id", "ex");
        newImg.setAttribute("style", "margin-top: -20px;")
         newImg.setAttribute("align", "right");
        var setSrc = newImg.setAttribute("src", "" + priorityVal + ".png");
        imageLi.appendChild(newImg);
    }

//calculate the progress and create the progress bar
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
function makeItemLinks(key, linksLi, rev) {

	   var editLink = document.createElement('input');
        editLink.setAttribute("type", "button");
        editLink.key = key;
	editLink.rev = rev;
        editLink.setAttribute("id", "edit");
        editLink.setAttribute("value", "Edit");
        editLink.setAttribute("onclick", "editItem(key, rev);");
        editLink.setAttribute("data-theme", "a");
        editLink.setAttribute("style", "width:120px; margin:0px 5px 20px -10px; display:inline;");
        editLink.setAttribute("class", "ui-btn-up-c ui-btn-inner ui-btn-corner-all");
        linksLi.appendChild(editLink);
        editLink.addEventListener("click", editItem);	

        var deleteLink = document.createElement('input');
        deleteLink.setAttribute("type", "button");
        deleteLink.key = key;
	deleteLink.rev = rev;
        deleteLink.setAttribute("id", "del");
        deleteLink.setAttribute("value", "Delete");
        deleteLink.setAttribute("onclick", "deleteItem(key, rev);");
        deleteLink.setAttribute("data-theme", "a");
        deleteLink.setAttribute("style", "width:120px; margin:0px 0px 20px 5px; display:inline;");
        deleteLink.setAttribute("class", "ui-btn-up-a ui-btn-inner ui-btn-corner-all");
        linksLi.appendChild(deleteLink);
        


}

$(function() {
	$('.meter > span').each(function() {
		$(this)
			.data("origWidth", $(this).width())
			.width(0)
			.animate({
				width: $(this).data("origWidth")
			}, 1200);
	});
});

