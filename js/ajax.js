/*
Assignment 6 : Ajax and JSON
Author : Shalini Krishnamoorthi
File Name : ajax.js
Version 1 : 02/25/2015
*/

$(document).ready(function(){
	$("input").val("");
	$("input").focus();

	 // http://api.bing.net/qson.aspx?Query=INSERT_QUERY_HERE&JsonType=callback&JsonCallback=?
	var searchUrl = "http://api.bing.net/qson.aspx?Query=";
	var searchUrlEnding = "&JsonType=callback&JsonCallback=?";

	$('input').on('keyup', function (evt) {
		//console.log("inside key up");

		getInfo($(this).val());

		if(evt.keyCode === 13){
			//console.log("user has selected");
			var find_text = $(this).val();
			//console.log(find_text);

			var url_start = "http://www.bing.com/search?q="
			var url_mid = "&go=Submit&qs=n&form=QBLH&pq="
			var url_end = "&sc=0-0&sp=-1&sk=&cvid=f238866945f6432c8ff42ae727f1a055"
			var final_url = encodeURI(url_start + find_text + url_mid + find_text+url_end);	

			/* http://www.bing.com/search?q=god&go=Submit&qs=n&form=QBLH&pq=god&sc=0-0&sp=-1&sk=&cvid=f238866945f6432c8ff42ae727f1a055 */
	   		window.open(final_url);

		}
	});


	function getInfo(query) {
		
		var url = encodeURI(searchUrl + query + searchUrlEnding);	
		//console.log(url);

		var promise = $.ajax({
							url: url,
							dataType: 'jsonp',
							});
		
		promise.done(function(response){
			//console.log("inside promise.done")
			//console.log(response);
			if(response.SearchSuggestion.Section)
			{	
				autoComplete(response.SearchSuggestion.Section);
			}
			else{
				console.log("Response array is empty");
			}
		});

		promise.fail(function(response){
			console.log("Error");
		});
	}


	function autoComplete(array) {
		//console.log("Inside autoComplete");
		//console.log(array);
		
		$('.results').empty();
		
		var dlEl = $("<datalist>").attr("id","autocomp"); 

		$.each(array, function(i,value){
			//console.log(value.Text);
						
				
			$("<option>").attr("value", value.Text).appendTo(dlEl);
				
			/* //links are not working in drop down list 
			//http://www.bing.com/search?q=hello&qs=HS&pq=hello&sc=8-5&sp=1&cvid=91f7951644eb463d98d475394088d1c8&FORM=QBLH
			
			var start = "http://www.bing.com/search?q=";
			var middle = "&qs=HS&pq=";
			var end = "&sc=8-5&sp=1&cvid=91f7951644eb463d98d475394088d1c8&FORM=QBLH";
			var link = encodeURI(start+ value.Text+middle+value.Text+end);
	

			$("<a>").attr("href",link).text(value.Text).appendTo($("<option>").appendTo(dlEl)); 

			// click event not working on link
			$("a").click(function(evt){
				var href = $(this).attr("href");
				console.log("************ " +href);
				window.open(href);				
			}); */
		});

		dlEl.appendTo($(".results"));

	}
});
