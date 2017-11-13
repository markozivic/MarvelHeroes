//Collects data from search bar and sends API request
function makeRequest() {
     var url="http://gateway.marvel.com/v1/public/characters?nameStartsWith=";
     var name=document.getElementById("search").value;
     if(name==""){
          return;
     }
     //If character name contains space, replace it with %20
     if(name.includes(" ")){
          name=name.replace(" ","%20");
          url+=name;
     }
     else{
          url+=name;
     }
     url+="&limit=12&ts=";

     var xmlhttp = new XMLHttpRequest();
     if (!xmlhttp) {
          alert('Request was not created.');
          return false;
     }
     var timeStamp= Date.now();
     url+=timeStamp.toString()+"&apikey=";
     var privateKey="66b3ba7f2d53e14c8e723f59b5f0d38a2a040a29";
     var publicKey="338d6ebb1fd0ed5e26e64910afc48df7";
     url+=publicKey+"&hash=";
     var dataForHash=timeStamp.toString()+privateKey+publicKey;
     //Calculating hash
     var hash = CryptoJS.MD5(dataForHash);
     url+=hash.toString();
     //When API request is sent and everything is OK go to function for working with results
     xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
               addResultsToPage(this, document.getElementById("search").value.toLowerCase());
          }
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
}

//Reads through API response and displays data from the search
function addResultsToPage(xml, characterName) {
     var i=0;//Column counter
     var j=0;//Row counter
     var lastKey="";//Previous key in JSON
     var character="";//will hold character's name
     var imgUrl="";//contains url to thumbnail image
     //HTML string that is going to be displayed on page
     var showCharacter="<div class=\"row\" align=\"center\"><h1 class=\"jumbotron\">This are your heroes...</h1></div>";

     var response = JSON.parse(xml.responseText,(key,value)=>{
          if(key=="name" && lastKey=="id"){
               if(value.toLowerCase().indexOf(characterName)!==-1){
                    character=value;
               }
          }
          if(key=="path"){
               i=i+1;
               if(i%5==0){
                    j=j+1;
                    showCharacter+="<div class=\"row\" align=\"center\" id=\"row"+j.toString()+"\">"
               }
               imgUrl=value+"/standard_fantastic.jpg";
               showCharacter+="<div class=\"col-lg-3 col-sm-6 col-xs-12\" id=\"col"+i.toString()+"\">";
               showCharacter+="<img id=\"img"+i+"\"src=\""+imgUrl+"\" alt=\"Sorry, no image found!\" onerror=\"this.onerror=null;this.src=\'Images/noimage.png\';\">";
               showCharacter+="<p>"+character+"</p>";
               showCharacter+="<button id=\""+i+"\" type=\"button\" class=\"btn\" onclick=\"addToBookmarks(this.id)\">Bookmark</button>";
               showCharacter+="</div>";
               if(i%4==0){
                    showCharacter+="</div>";
               }
          }
          lastKey=key;
     });
     document.getElementById("div2").innerHTML = showCharacter;
}

//This function is used for adding image to bookmarked Images
function addToBookmarks(buttonId){
     var a= document.getElementById('download');
     a.download=document.getElementById('img'+buttonId).getAttribute('src');
     a.click();
}
