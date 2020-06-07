window.onload = function() {
	var date = new Date();
	var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
	var currentDay = weekday[date.getDay()];
	var currentHour = date.getHours(); //0-23
	var currentMinute = date.getMinutes(); //0-59

	var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

	if(days.includes(currentDay)){

		var openElement = document.getElementById("open");
		var paraWrapper = document.getElementById("MSpara");

		if(currentDay == "Monday" || currentDay == "Tuesday" || currentDay == "Wednesday" || currentDay == "Thursday" || currentDay == "Friday" || currentDay == "Saturday"){
			if(currentHour >= 10 && currentHour < 16){
				openElement.innerHTML = "<h2>Open now!</h2><h3>Until 4pm</h3>";
				openElement.style.visibility = "visible";
				openElement.style.zIndex = "9999";
				paraWrapper.style.marginTop = "210px";
			}
		}
		else if(currentDay == "Sunday"){
				// openElement.innerHTML = "<h2>Closed today!</h2><h3></h3>";
				// openElement.style.visibility = "visible";
				// openElement.style.zIndex = "9999";
				//paraWrapper.style.marginTop = "210px";
		}
	}
}