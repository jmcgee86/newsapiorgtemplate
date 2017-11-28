/*global $ APIKEY */
$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/sources",
        data: { category: "business", country: "us", language: "en", apiKey: APIKEY},
        success: function(data){
            if (data.status ==="ok"){
                console.log(data)
                for (var i=0; i < data.sources.length; i++){
                    var source = document.createElement("OPTION");
                    source.setAttribute("value", data.sources[i].id);
                    source.innerHTML = data.sources[i].name;
                    document.getElementById("selection").appendChild(source);
                    
                }
        }
        }
    })
     $("#source").submit(function(event){
        event.preventDefault();
        //alert(document.getElementById("selection").value);
        $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines?sources=" + document.getElementById("selection").value,
        data: { category: "business", country: "us", language: "en", apiKey: APIKEY},
        success: function(data){
            if (data.status ==="ok"){
                console.log(data)
              //document.getElementById("headlines").innerHTML = "testing";
              for (var i=0; i < data.articles.length; i++){
                  var item = document.createElement("LI");
                  item.innerHTML = data.articles[i].title;
                  	document.getElementById("headlines").appendChild(item);

                  

              }
                    
                }
        }
        
    })
        
    })
    
})