function searchTermStorage() {
    let input = document.getElementById("bookInput").value;
    localStorage.setItem("searchTerm", input);
}

function bookSelectionStorage(bookSelection) {
    let input = bookSelection.id;
    localStorage.setItem("storedBook", input);

}
function categorySelectedStorage() {
    let selCategory = document.getElementById("sel1").value;
    console.log(selCategory);
      localStorage.setItem("selCategory", selCategory);
    }

function dropdownSelectionStorage() {
    let dropdownInput = document.getElementById("selectedDropdown").innerHTML;
    localStorage.setItem("storedDropdownSelection", dropdownInput);
}

function displayDropdownSelection() {
          $('.dropdown-menu a').click(function(){
          $('#selectedDropdown').text($(this).text());
          });
}


//function categorySelectedStorage() {
  // let menuSelection = document.getElementById("caret").value;

   //localStorage.setItem("categorySelected", menuSelection);
//}

function showMore(elem){
    let id = elem.id;
    document.getElementById('book-full-desc-'+ id).removeAttribute("hidden");
    document.getElementById('book-partial-desc-'+ id).setAttribute("hidden", true);
}

function mapSelectOptionToGoogleAPI(selectedOption) {
    if(localStorage.getItem("storedDropdownSelection") === 'Title'){
    return 'intitle';
    }else if(localStorage.getItem("storedDropdownSelection") === 'Author'){
    return 'inauthor';
    }else if(localStorage.getItem("storedDropdownSelection") === 'Publisher'){
         return 'inpublisher';
    }else {
       return '';
    }
 }

function search() {
    let bookCount = 0;

    let selOpt = localStorage.getItem("storedDropdownSelection");

    console.log("Inside search method :value of selected dropdown is : "+selOpt);
    let selectCategory = mapSelectOptionToGoogleAPI(selOpt);
    if(selectCategory != ''){
    selectCategory += ":";
    }

    fetch("https://www.googleapis.com/books/v1/volumes?q="+ selectCategory + localStorage.getItem("searchTerm")+"&maxResults=40&startIndex=0")
        .then(a =>a.json())
        .then(response =>{
            localStorage.removeItem("selCategory");
            for(let i=0;i<response.items.length;i++) {
                let item = response.items[i];
                let descDisplayLen = item.volumeInfo.description != undefined ? item.volumeInfo.description.length : 0;
                let descFull = item.volumeInfo.description;
                let descDisplay = '';
                if(descDisplayLen > 200){
                    descDisplayLen = 200;
                    descDisplay = item.volumeInfo.description.slice(0, descDisplayLen);
                    descDisplay = descDisplay + "<a class='ellipsis' style='color:red' onclick='showMore(this)'; id='" + i + "'> Read more</a>";
                }
                else if(descDisplay==''||descDisplay == null){
                                descDisplay ="No Description is available";
                                }
                else{
                    descDisplay = item.volumeInfo.description;
                }

                let desCategory=item.volumeInfo.categories;
                if(desCategory==''||desCategory==null||desCategory=='undefined'){
                desCategory="No Categories Details is available";
                }

                let disPublisher=item.volumeInfo.publisher;
                if(disPublisher==''||disPublisher==null||disPublisher=='undefined'){
                                disPublisher="Publisher details not available";
                                }

                let disAuthor=item.volumeInfo.authors;
                if(disAuthor==''||disAuthor==null||disAuthor=='undefined'){
                                                disAuthor="Author details not available";
                                                }

                let disThumbnail = item.volumeInfo.imageLinks;
                if(disThumbnail === ''|| typeof disThumbnail === null || typeof disThumbnail ===                  "undefined") {
                disThumbnail = "Image not available";
                } else {
                    disThumbnail = "<img src=" + item.volumeInfo.imageLinks.thumbnail + ">";
                }
                bookCount++;
                document.getElementById("list-output").innerHTML +=
                    "<div id='book-partial-desc-" + i + "'>"+
                    "<br"+"<b>" + disThumbnail + "<br>"+
                    "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
                    "<b>Author: </b>" + disAuthor + "<br>" +
                    "<b>Publisher: </b>" + disPublisher + "<br>" +
                    "<b>Categories: </b>" + desCategory + "<br>" +
                    "<b>Description: </b>" + descDisplay + "<br>"
                    +"</div>"+"<br>" +
                    "<div id='book-full-desc-" + i + "' hidden>"+
                    "<br"+"<b>" + disThumbnail + "<br>"+
                    "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
                    "<b>Author: </b>" + item.volumeInfo.authors + "<br>" +
                    "<b>Publisher: </b>" + item.volumeInfo.publisher + "<br>" +
                    "<b>Categories: </b>" + item.volumeInfo.categories + "<br>" +
                    "<b>Description: </b>" + descFull + "<br>"
                    +"</div>"+"<br>";
                document.getElementById("searchResultNumber").innerHTML = "Search Results: " + bookCount;
            }
        })
}

