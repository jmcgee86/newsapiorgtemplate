/*global $ APIKEY */
$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://newsapi.org/v2/sources",
		data: {
			category: "business",
			country: "us",
			language: "en",
			apiKey: APIKEY
		},
		success: function(data) {
			if (data.status === "ok") {
				console.log(data)
				for (var i = 0; i < data.sources.length; i++) {
					var source = document.createElement("OPTION");
					source.setAttribute("value", data.sources[i].id);
					source.innerHTML = data.sources[i].name;
					document.getElementById("selection").appendChild(source);
				}
			}
		}
	})
	$("#source").submit(function(event) {
		event.preventDefault();
		document.getElementById("headlines").innerHTML = ""; //removes headlines from any previous selected sources
		$.ajax({
			method: "GET",
			url: "https://newsapi.org/v2/top-headlines?sources=" + document.getElementById("selection").value,
			data: {
				category: "business",
				country: "us",
				language: "en",
				apiKey: APIKEY
			},
			success: function(data) {
				if (data.status === "ok") {
					console.log(data)
					for (var i = 0; i < data.articles.length; i++) {
						var item = document.createElement("LI");
						var description = document.createElement("SPAN");
						var link = data.articles[i].url;
						item.setAttribute("href", link);
						item.innerHTML = '<a target="_blank" href= "' + link + '">' + data.articles[i].title + '</a>'
						description.innerHTML = data.articles[i].description;
						document.getElementById("headlines").appendChild(item);
						document.getElementById("headlines").appendChild(description);
					}
				}
			}
		})
	})
})