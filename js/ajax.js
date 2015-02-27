/*
Assignment 6 : Ajax and JSON
Author : Shalini Krishnamoorthi
File Name : ajax.js
Version 1 : 02/25/2015
*/

$(document).ready(function(){
	$("input").val("");
	$("input").focus();

	var searchUrl = "http://api.bing.net/qson.aspx?Query=";
	var searchUrlEnding = "&JsonType=callback&JsonCallback=?";

	$('input').on('keyup', function (evt) {

		getInfo($(this).val());

		if(evt.keyCode === 13){
			var find_text = $(this).val();

			var url_start = "http://www.bing.com/search?q="
			var url_mid = "&go=Submit&qs=n&form=QBLH&pq="
			var url_end = "&sc=0-0&sp=-1&sk=&cvid=f238866945f6432c8ff42ae727f1a055"
			var final_url = encodeURI(url_start + find_text + url_mid + find_text+url_end);	

	   		window.open(final_url);

		}
	});


	function getInfo(query) {
		
		var url = encodeURI(searchUrl + query + searchUrlEnding);	

		var promise = $.ajax({
				url: url,
				dataType: 'jsonp',
				});

		promise.done(function(response){
			
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
		
		$('input').empty();

		dlEl = $("<datalist>").attr("id","autocomp"); 

		$.each(array, function(i,value){

			dlEl.append($("<option>").text(value.Text));
		
		});

		dlEl.appendTo($("input"));
	}
	
});




