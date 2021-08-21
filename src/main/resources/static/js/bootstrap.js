
function searchTermStorage() {

      let input = document.getElementById("bookInput").value;

      localStorage.setItem("searchTerm", input);

 }

 function search() {


      fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:" + localStorage.getItem("searchTerm")+"&maxResults=40&startIndex=0")
              .then(a =>a.json())
              .then(response =>{

                 for(let i=0;i<response.items.length;i++) {
                    let item = response.items[i];

                    //document.getElementById("list-output").innerHTML+="<h2>"+response.items[i];
                    document.getElementById("list-output").innerHTML +=
                            "<div>"+
                            "<br"+"<b><img src=" + item.volumeInfo.imageLinks.thumbnail + "<br>"+
                            "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
                            "<b>Author: </b>" + item.volumeInfo.authors + "<br>" +
                            "<b>Published Date: </b>" + item.volumeInfo.publishedDate + "<br>" +
                            "<b>Description: </b>" + item.volumeInfo.description.slice(0, 200) +                              "..." + "<br>"
                            +"</div>"+"<br>";
                 }
              })

   }


   // JQuery to show selected category in dropdown menu
   $(".dropdown-menu li a").click(function(){
     var selText = $(this).text();
     $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
   });
