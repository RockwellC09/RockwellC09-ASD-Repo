//Christopher Rockwell
//Project 4
//MiU 1211


// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function(){
    
    // getElementBy Id function
    function $get(x) {
        
        var element = document.getElementById(x);
        return element;
    }
    
    // create selection using JavaScript
    function makeSel(){
        
        var formsTag = document.getElementsByTagName("form"),
        getLabel = $get('times'),
        makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "time");

        for (i=0, j=timeFrames.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText2 = " ";
            var optText = timeFrames[i];
            if (i==0) {
                makeOption.setAttribute("value", optText2);
            } else {
                makeOption.setAttribute("value", optText);
            }
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        getLabel.appendChild(makeSelect);
    }
    
    // variable defaults
    var timeFrames = ["Select an Option", "0-6 months", "6 months to a year", "Between 1-3 years", "More than 3 years"];
    makeSel();
    var priorityValue;
    var isFirefox = testCSS('MozBoxSizing');
    var errorMsg = ('errors');
    
    //setting up an input button to display the current range position.
    var element = document.createElement("input");
          element.setAttribute("id", "textInput");
          element.setAttribute("type", "text");
          element.setAttribute("value", "1");
          element.setAttribute("oninput", "document.getElementById('quantity').value = this.value");
          element.setAttribute("style", "width:35px; text-align: center; ");
          element.setAttribute("onclick", "document.getElementById(id).select();");
    
    var foo = document.getElementById("quan");
    function testCSS(prop) {
    return prop in document.documentElement.style;
}
    //show the range position input button only if the browser isn't Firefox
    function noRange(){
        if (isFirefox === false){
            foo.appendChild(element);
        }
    }
    noRange();
    
    //find the value of selected radio button
    function getSelectedRadio(){
        var radios = document.forms[0].priority;
        for (i=0, j=radios.length;i<j;i++){
            if (radios[i].checked){
                priorityValue =radios[i].value;
            }
        }
    }
    
    function toggleControls(n){
        switch (n){
            case "on":
                $get('add-item').style.display = "none";
                $get('clearLink').style.display = "inline";
                $get('displayLink').style.display = "none";
                $get('addNew').style.display = "inline";
                break;
            case "off":
                $get('add-item').style.display = "block";
                $get('clearLink').style.display = "inline";
                $get('displayLink').style.display = "inline";
                $get('addNew').style.display = "none";
                $get('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    // function to store data entered by user
    function saveData(key){
        //if there is no key, this means there is a brand new item and we need a new key.
        //else we'll set the id to the existing key that we're editing so that it will save over the data
        if (!key) {
            var id =  Math.floor((Math.random()*10000000)+1); 
        } else {
            var id = key;
        }
        
        //gather all form field values and store them in an object
        //Object properties contain array with the form label and input values
        getSelectedRadio();
        var item = {}
            item.name = ["Item Name:", $get('item-name').value];
            item.brand = ["Item Brand:", $get('item-brand').value];
            item.quantity = ["Quantity:", $get('quantity').value];
            item.cost = ["Total Cost:", $get('total-cost').value];
            item.date = ["Pledge Date:", $get('pledge').value];
            item.priority = ["Priority:", priorityValue];
            item.timeFrame = ["Time Frame:", $get('time').value];
            item.amountSaved = ["Amount Saved:", $get('amount').value];
            item.motivation = ["Motivation:", $get('motivation').value];
            item.space = ["<br>", "<br>"];
            
        //save data into local storage: Using Stringify to convert our object into a string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Saved!");
    }
    
    //write data from local stroage to the browser
    function getData(){
        if (localStorage.length === 0){
            alert("There is no data in local storage so default data was added.");
            autoFillData();
        }
        
        toggleControls("on");
        
        title.innerHTML = "<a href=\"index.html\"><h1>WishList</h1></a><img src=\"images/icon.png\" style=\"margin-top:-40px; margin-right:10px;\" alt=\"Logo\" align=\"right\">";
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $get('items').style.display = "block";
        for(var i=0,j=localStorage.length;i<j;i++){
            var makeLi = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList)
            getImage(obj.priority[1], makeSubList);
            getProgress(obj, makeSubList);
            for (var x in obj){
                var makeSubListItem =document.createElement('li');
                makeSubList.appendChild(makeSubListItem);
                if (obj[x][1] === "High!!!")   {
                    makeSubListItem.style.color = "#D9343C";
                } else if (obj[x][1] === "Medium!!")   {
                    makeSubListItem.style.color = "#C4B50C";
                } else if(obj[x][1] === "Low!"){
                    makeSubListItem.style.color = "#2051BA";
                } else {
                    makeSubListItem.style.color = "#0d726f";
                }
                optSubText = "<strong> " + obj[x][0] +"</strong> "+ "<p>" + obj[x][1] + "</p>";
                makeSubListItem.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); //creates our edit and delete button.links for each item in local storage
        }
    }
    
    function getProgress(obj, makeSubList) {
        var getVal = obj.amountSaved[1].replace(/\$/g,'');
        var getMax = obj.cost[1].replace(/\$/g,'');
        var percent = (getVal * 100) / getMax;
        var percentRound = Math.round(percent * 10) / 10;
        var prog = document.createElement('li');
        prog.innerHTML = "<strong>Progress: </strong><progress max="+ getMax +" value="+ getVal +"></progress> " + percentRound + "%"
        makeSubList.appendChild(prog);
        
    }
    
    //get the image based of the priority selected
    function getImage(priorityVal, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        newImg.setAttribute("id", "ex");
        var setSrc = newImg.setAttribute("src", "images/" + priorityVal + ".png");
        imageLi.appendChild(newImg);
    }
    
    //auto populate Local Storage
    function autoFillData() {
        //The actual json object data required for this to work is coming from our json.js file. which was loaded in out HTML page.
        //Store the JSON object into Local Storage
        for(var n in json) {
            var id = Math.floor((Math.random()*10000000)+1);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    //Make item links
    //create edit and delete links for each item in storage
    function makeItemLinks(key, linksLi) {
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML  = deleteText;
        linksLi.appendChild(deleteLink);
    }
    
    function editItem() {
        //Grab the data from the item from local storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //show form
        title.innerHTML = "<h1>Edit Item</h1>";
        toggleControls("off");
    
        $get('item-name').value = item.name[1];
        $get('item-brand').value = item.brand[1];
        //set range slider display's value
        if (isFirefox === false){
            $get('textInput').value = item.quantity[1];
        }
        $get('quantity').value = item.quantity[1];
        $get('total-cost').value = item.cost[1];
        $get('pledge').value = item.date[1];
        var radios = document.forms[0].priority;
        for (var i = 0; i < radios.length; i++){
            if (radios[i].value == "Low!" && item.priority[1] == "Low!") {
                radios[i].setAttribute("checked", "checked");
            } else if (radios[i].value == "Medium!!" && item.priority[1] == "Medium!!") {
                radios[i].setAttribute("checked", "checked");
            } else if (radios[i].value == "High!!!" && item.priority[1] == "High!!!") {
                radios[i].setAttribute("checked", "checked");
            }
        }
        $get('time').value = item.timeFrame[1];
        $get('amount').value = item.amountSaved[1];
        $get('motivation').value = item.motivation[1];
        
        //remove event listener from submit button
        save.removeEventListener("click", saveData);
        
        //change the submit value to edit button
        $get('submit').value = "Edit Item";
        var editSubmit = $get('submit');
        //save the property estabished in this function as a property of the editSubmit event
        //so we can use that value when we save the data to be edited
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    
    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this item?");
        if (ask){
            localStorage.removeItem(this.key);
            alert("Item deleted");
            window.location.reload();
        } else {
            alert("The item was not deleted");
        }
    }
    
    function validate(e) {
        var getItemName = $get('item-name');
        var getCost = $get('total-cost');
        var getTime = $get('time');
        var getAmount = $get('amount');
        
        //reset error messages
        errorMsg.innerHTML = "";
        getItemName.style.border = "3px solid #858384";
        getCost.style.border = "3px solid #858384";
        getTime.style.border = "none";
        getAmount.style.border = "3px solid #858384";
        
        //get error messages
        var messages = [];
        //item name validation
        if (getItemName.value === "") {
            var nameError = "Please enter the item name.";
            getItemName.style.border = "3px solid #D9343C";
            messages.push(nameError);
        }
        
        //item cost validation
        if(getCost.value === ""){
            var costError = "Please enter the total cost of this item.";
            getCost.style.border = "3px solid #D9343C";
            messages.push(costError);
        }
        
        //item time frame validation
        if (getTime.value === " ") {
            var timeError = "Please select a purchase time frame for this item.";
            getTime.style.border = "3px solid #D9343C";
            messages.push(timeError);
        }
        
        //item amount saved validation
        if (getAmount.value === "") {
            var amountError = "Please enter the amount you have saved toward this item.";
            getAmount.style.border = "3px solid #D9343C";
            messages.push(amountError);
        }
        
        if (messages.length >= 1) {
            for (var i = 0, j = messages.length; i<j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messages[i];
                errorMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else {
                //if all is ok, save the data! Send the key value again, which came from the editData function
                saveData(this.key);
            }
    }
    
    // clear all data submitted
    function clearData(){
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
    }
    
    //function home() {
    //    var url = document.URL;
    //    var homeLink = url.replace("additem.html", "index.html");
    //    window.open(homeLink,"_self")
    //}
    
    // set link and click events
    var displayLink = $get('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = $get('clearLink');
    clearLink.addEventListener("click", clearData);
    var save = $get('submit');
    save.addEventListener("click", validate);
    //var add = $get('add');
    //add.addEventListener("click", home);
    //var add2 = $get('add2');
    //add2.addEventListener("click", home);
});

