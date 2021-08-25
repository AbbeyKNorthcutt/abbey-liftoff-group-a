
function searchTermStorage() {

      let input = document.getElementById("bookInput").value;

      localStorage.setItem("searchTerm", input);

 }

function categorySelectedStorage() {

      let menuSelection = document.getElementById("caret").value;

      localStorage.setItem("categorySelected", span);
 }

 function search() {
      let bookCount = 0;

      fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:" + localStorage.getItem("searchTerm") +"&maxResults=40&startIndex=0")
              .then(a =>a.json())
              .then(response =>{

      // fetch("https://www.googleapis.com/books/v1/volumes?q=" + document.getElementById("dropdownMenuButton1").value + document.getElementById("bookInput").value)


                 for(let i=0;i<response.items.length;i++) {
                    let item = response.items[i];

                    // TODO: Compare the book item's subject to the category that the user selected (see searchByCategory below)
//                    if (item.volumeInfo.subject == searchByCategory()) {

                        bookCount++;

                        document.getElementById("list-output").innerHTML +=
                                "<div>"+
                                "<br"+"<b><img src=" + item.volumeInfo.imageLinks.thumbnail + "<br>"+
                                "<br>" + "<b>Title: </b>" + item.volumeInfo.title + "<br>" +
                                "<b>Author: </b>" + item.volumeInfo.authors + "<br>" +
                                "<b>Published Date: </b>" + item.volumeInfo.publishedDate + "<br>" +
                                "<b>Description: </b>" + item.volumeInfo.description.slice(0, 200) +                              "..." + "<br>"
                                +"</div>"+"<br>";
                                document.getElementById("searchResultNumber").innerHTML = "Search Results: " + bookCount;
                 }
//                 }


              })

   }


// Function to populate the dropdown menu with the user selected category
function populateDropdown(){

    $( document ).ready(function() {
         $('.dropdown').each(function (key, dropdown) {
             var $dropdown = $(dropdown);
             $dropdown.find('.dropdown-menu li a').on('click', function () {
                 $dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
             });
         });
     });

}

populateDropdown();

// TODO: Function to retrieve the category the user selected NOT WORKING YET
function searchByCategory() {

	// Declare empty array to hold the active dropdown value
			let dropdownChoice = [];

	// Check for active value in dropdown
			let menu = document.getElementsByClassName("caret");
			let activeValue = menu.options[menu.selectedIndex].value;// get selected option value
			let text = menu.options[menu.selectedIndex].text;

	// Push active value to the caret array
			dropdownChoice.push(text);

		// Fetch the api loop through the categories to find the data that matches
	// volumeInfo.categories[]

			return dropdownChoice;

	}