
function searchTermStorage() {

      let input = document.getElementById("bookInput").value;

      localStorage.setItem("searchTerm", input);
 }

function categorySelectedStorage() {

      let menuSelection = document.getElementById('menu').value;

      localStorage.setItem("menu", menuSelection);
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
    $(".dropdown-menu li a").click(function(){
     var selText = $(this).text();
     $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    });

populateDropdown();

// Finds value of dropdown menu
$(document).ready(function(){

  $('#fldCategory UL LI A').click(function (e) {
    var sVal = e.currentTarget.text;
    $('#fldCategory BUTTON').html(sVal + ' <span class="caret"></span>');
		$(this).parents('.dropdown').find('.dropdown-toggle').html(sVal+' <span class="caret"></span>');
    alert(sVal);
		let activeMenu = [];
		//Attempting to push value selected into the empty array to be compared to the API data
		activeMenu.push ({
        sVal: $(this).val()
		});
		// uri to get the history subject
  });
});
dropdownValue();

// TODO: Function to retrieve the category the user selected NOT WORKING YET
//function searchByCategory() {
//
//	// Declare empty array to hold the active dropdown value
//			let dropdownChoice = [];
//
//	// Check for active value in dropdown TODO: Need to figure out how to write this without options and select since our dropdown uses ul and li
//			let menu = document.getElementsByClassName("caret");
//			let activeValue = menu.options[menu.selectedIndex].value;// get selected option value
//			let text = menu.options[menu.selectedIndex].text;
//
//	// Push active value to the caret array
//			dropdownChoice.push(text);
//
//		// Fetch the api loop through the categories to find the data that matches
//	// volumeInfo.categories[]
//	        fetch("https://www.googleapis.com/books/v1/volumes?q=" + document.getElementById("menu").value)
//	         .then(a =>a.json())
//             .then(response =>{
//                    for(let i=0;i<response.items.length;i++) {
//                        let item = response.items[i];
//
//                 }
//             }
//
//
//			return dropdownChoice;
//
//	}