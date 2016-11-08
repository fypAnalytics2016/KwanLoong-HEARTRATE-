window.onload = function () {
	
	var updateChart = function (heartrate) {
		console.log("["  + heartrate + "]");
		};
	
		//array part (sum all collected heartrate and find average) not working
	var sum = function(myArray123){
	var total = 0;
		for (var i = 0, len = myArray123.length; i < len; i++)
		{
			total += myArray123[i];
		}
			return total;
		};

		
	//start heart rate monitor
	document.getElementById("start").addEventListener("click",function (){
		window.webapis.motion.start("HRM", onchangedCB);
        
		function onchangedCB(hrmInfo) 
		{
			var myArray= [];
			if(hrmInfo.heartRate > 0) 
			   {
				myArray.push(hrmInfo.heartRate);
				   updateChart(hrmInfo.heartRate);
				  
				   summation = sum(myArray);
					$('#textbox').html(hrmInfo.heartRate);
					 var hrchart = "<center>Heart Rate: " + summation +  "bps</center>";
						$('#heartrate').html(hrchart);
					$('#heartbox').html(hrchart);
			   } else if (hrmInfo.heartRate == -3) {
				   $('#textbox').html("Wear It Nicely.");
			   }
			   else
			   {
				   $('#textbox').html("Measuring...");
			   }
		}		
	});
	
	//stop heart rate monitoring
	document.getElementById("stop").addEventListener("click",function (){
		var stopOpt = confirm("Stop the heart rate measurement?");
			if (stopOpt == true){
				window.webapis.motion.stop("HRM");
				$('#textbox').html("Stopped measuring.");
				var ttlAvg = summation
				document.getElementById("heartrate").innerHTML = ('<br>Average Heartrate: ') + summation;
				document.getElementById("btn").innerHTML = ('<input type="submit" name="Submit" value="post">');
				document.getElementById('ttlavg').value = +summation;
				var Ptime = document.getElementById('time').value;
				document.getElementById('period').value =  ("Time: ")+ d;
					}
	});		
	
	
	//disable enter key 
	function stopRKey(evt) { 
		  var evt = (evt) ? evt : ((event) ? event : null); 
		  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
		  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
		} 
		document.onkeypress = stopRKey; 
	
	//age 1-100 loop
		$(function(){
		    var $select = $(".age");
		    for (i=1;i<=100;i++){
		        $select.append($('<option></option>').val(i).html(i))
		    }
		});

	//exit key
		document.addEventListener('tizenhwkey', function(e) {
	        if(e.keyName == "back")
	            window.webapis.motion.stop("HRM");
	            tizen.application.getCurrentApplication().exit();
	    });
		
}
