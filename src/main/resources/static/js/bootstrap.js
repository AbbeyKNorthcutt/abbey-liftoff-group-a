function searchTermStorage() {
    let input = document.getElementById("bookInput").value;
    localStorage.setItem("searchTerm", input);
}

function bookSelectionStorage(bookSelection) {
    let input = bookSelection.id;
    localStorage.setItem("storedBook", input);

}
function carouselBookOne(bookSelection){
    let input = bookSelection.id;
    localStorage.setItem("storedBook", "GZAoAQAAIAAJ");
}

function carouselBookTwo(bookSelection){
    let input = bookSelection.id;
    localStorage.setItem("storedBook", "zM-vZ-JiSFYC");
}

function carouselBookThree(bookSelection){
    let input = bookSelection.id;
    localStorage.setItem("storedBook", "-D8WBAAAQBAJ");
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
                let id = item.id;
                let descDisplayLen = item.volumeInfo.description != undefined ? item.volumeInfo.description.length : 0;
                let descFull = item.volumeInfo.description;
                let descDisplay = '';
                if(descDisplayLen > 200){
                    descDisplayLen = 200;
                    descDisplay = item.volumeInfo.description.slice(0, descDisplayLen);
                    descDisplay = descDisplay + "<a class='ellipsis' style='color:red' onclick='showMore(this)'; id='" + i + "'> Read more</a>";
                }
                else if(descDisplay===''|| typeof descDisplay === null || typeof descDisplay === "undefined"){
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
                    "<div class='tile' id='book-partial-desc-" + i + "'>"+
                    "<br>"+ "<b><a onclick='bookSelectionStorage(this)' href='/book'; id='" + id + "'>" + disThumbnail + "</b>" + "<br>"+
                    "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
                    "<b>Author: </b>" + disAuthor + "<br>" +
                    "<b>Publisher: </b>" + disPublisher + "<br>" +
                    "<b>Categories: </b>" + desCategory + "<br>" +
                    "<b>Description: </b>" + descDisplay + "</a><br>"
                    +"</div>"+"<br>" +


                    "<div class='tile' id='book-full-desc-" + i + "' hidden>"+
                    "<br"+"<b><a onclick='bookSelectionStorage(this)' href='/book'; id='" + id + "'>" + disThumbnail + "</b><br>"+
                    "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
                    "<b>Author: </b>" + item.volumeInfo.authors + "<br>" +
                    "<b>Publisher: </b>" + item.volumeInfo.publisher + "<br>" +
                    "<b>Categories: </b>" + item.volumeInfo.categories + "<br>" +
                    "<b>Description: </b>" + descFull + "</a><br>"
                    +"</div>"+"<br>";
                document.getElementById("searchResultNumber").innerHTML = "Search Results: " + bookCount;
            }
        })
}

function displaySelectedBookInfo() {
   fetch("https://www.googleapis.com/books/v1/volumes/" + localStorage.getItem("storedBook"))
      .then(a => a.json())
      .then(response => {

         let item = response;

         let desCategory=item.volumeInfo.categories;
         if(desCategory==''||desCategory==null||desCategory=='undefined'){
             desCategory="No Categories Details is available.";
         }

         let disPublisher=item.volumeInfo.publisher;
         if(disPublisher==''||disPublisher==null||disPublisher=='undefined'){
            disPublisher="Publisher details not available.";
         }

         let disAuthor=item.volumeInfo.authors;
         if(disAuthor==''||disAuthor==null||disAuthor=='undefined'){
            disAuthor="Author details not available.";
         }

         let disThumbnail = item.volumeInfo.imageLinks;
         if(disThumbnail === ''|| typeof disThumbnail === null || typeof                                   disThumbnail === "undefined") {
            disThumbnail = "Image not available.";
         } else {
            disThumbnail = "<img src='" + item.volumeInfo.imageLinks.thumbnail + "'>";
         }

         let disDescription = item.volumeInfo.description;
         if (disDescription === '' || typeof disDescription === null || typeof disDescription ===          "undefined") {
            disDescription = "Description not available.";
         }

         let disPageCount = item.volumeInfo.pageCount;
         if (disPageCount === '' || typeof disPageCount === null || typeof disPageCount ===                "undefined") {
            disPageCount = "Page count not available.";
         }

         let disMaturityRating = item.volumeInfo.maturityRating;
         if (disMaturityRating === '' || typeof disMaturityRating === null || typeof                       disMaturityRating === "undefined") {
            disMaturityRating = "Maturity rating not available.";
         }

         let disRatingsCount = item.volumeInfo.ratingsCount;
         if (disRatingsCount === '' || typeof disRatingsCount === null || typeof disRatingsCount           === "undefined") {
             disRatingsCount = "Ratings count not available.";
         }

         let disAverageRating = item.volumeInfo.averageRating;
         if (disAverageRating === '' || typeof disAverageRating === null || typeof disAverageRating        === "undefined") {
            disAverageRating = "Average rating not available.";
         } else {
            disAverageRating = item.volumeInfo.averageRating + " out of 5."
         }

        let disSnippet = item.searchInfo;
        if (disSnippet === '' || typeof disSnippet === null || typeof disSnippet === "undefined") {
            disSnippet = "No text snippet available."
        } else {
            disSnippet = "<em>" + item.searchInfo.textSnippet + "</em>";
        }

        let disPrice = item.saleInfo.retailPrice;
        if (disPrice === '' || typeof disPrice === null || typeof disPrice === "undefined") {
            disPrice = "No pricing info available."
        } else {
            disPrice = item.saleInfo.retailPrice.amount + " " + item.saleInfo.retailPrice                     .currencyCode;
        }

         document.getElementById("bookInfo").innerHTML +=
            "<div class='tile'>" +
            "<br" + "<b>" + disThumbnail + "<br>" +
            "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
            "<b>Author: </b>" + disAuthor + "<br>" +
            "<b>Published Date: </b>" + disPublisher + "<br>" +
            "<b>Description: </b>" + disDescription + "<br>" +
            "<b>Page Count: </b>" + disPageCount + "<br>" +
            "<b>Maturity Rating: </b>" + disMaturityRating + "<br>" +
            "<b>Number of Ratings: </b>" + disRatingsCount + "<br>" +
            "<b>Average Score: </b>" + disAverageRating + "<br>" +
            "<b>Snippet: </b>" + disSnippet + "<br>" +
            "<b>Price: </b>" + disPrice + "<br>"
            "</div>" + "<br>";
      })
}

