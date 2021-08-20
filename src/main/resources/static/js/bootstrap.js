
function searchTermStorage() {

      let input = document.getElementById("bookInput").value;

      localStorage.setItem("searchTerm", input);

 }

 function search() {


      fetch("https://www.googleapis.com/books/v1/volumes?q=" + localStorage.getItem("searchTerm"))
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
                            "<b>Description: </b>" + item.volumeInfo.description + "<br>"
                            +"</div>"+"<br>";
                 }
              })

   }