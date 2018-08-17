/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const studentItem = document.querySelectorAll('.student-item');
const studentList = document.querySelector('.student-list');

let currentPage = 1;
let itemsPerPage = 10;
let visibleStudents = studentItem.length;
let numberOfLinks = Math.ceil(visibleStudents / itemsPerPage);


//Dynamically Creating Search Field 
const searchField = () =>{
    const pageHeader = document.querySelector('.page-header');    
    const searchFieldContainer = document.createElement('div');      
    const search = 
    `<div>
        <input class="input" type="text"  placeholder="Search" >
        <button class="submit"> Search </button>
        <span id="error"></span>
    </div>`;
    
    searchFieldContainer.setAttribute('class', 'search');        
    pageHeader.appendChild(searchFieldContainer);
    searchFieldContainer.innerHTML = search;   
}

//creating Container For the links
const paginationContainer = () =>{ 
    const studentList = document.querySelector('.page');    
    const linkContainer = document.createElement("div");
    
    linkContainer.setAttribute('class', 'pagination-container');
    
    const ul = document.createElement("ul");
    studentList.appendChild(linkContainer);
    linkContainer.appendChild(ul);
    ul.setAttribute('class', 'pagination-ul');
}

//detect live input from search field
const searchResults = () =>{
    const searchButton = document.querySelector('.submit');
    const searchInput = document.querySelector('.input'); 
    let searchValue;
    
    // when typing(more specifically when key is up) run the function 'searchThroughItems' to find the items
    searchInput.addEventListener("keyup",function(e){
        searchValue = e.target.value.toLocaleLowerCase().replace(/^[ ]+|[ ]+$/g,'');
        searchThroughItems(searchValue,e);        
    });   
    
    // when search button is click run the function 'searchThroughItems' to find the items
    searchButton.addEventListener("click",function(e){
        e.preventDefault();  
        console.log(e)
        searchThroughItems(searchValue,e);
    }); 
    
}

//search through all and checks witch items matches and adds them to the the array
const searchThroughItems = (searchValue, event) =>{
    const throwError = document.querySelector('#error');
    let inputValue = searchValue;
    let itemsShown = 0;        
    let specificItems = [];
    //removing previous errors
    throwError.innerHTML ="";
    
    for(let i = 0; i < studentItem.length; i++){
        let studentName = studentItem[i].children[0].children[1].innerHTML.toLocaleLowerCase().replace(/^[ ]+|[ ]+$/g,'');

        if(!(studentName.indexOf(inputValue)) && inputValue){                
            itemsShown++;
            visibleStudents = itemsShown;
            numberOfLinks = Math.ceil(visibleStudents / itemsPerPage);
            
            specificItems.push(studentItem[i]);            
            //update how many links are shown and what items are shown
            paginationLinks(numberOfLinks, itemsPerPage, specificItems);
            
        }else if(!inputValue){
            visibleStudents = studentItem.length;
            numberOfLinks = Math.ceil(visibleStudents / itemsPerPage);
            //update how many links are shown and what items are shown
            paginationLinks(numberOfLinks, itemsPerPage,  studentItem);
            //if the search field is empty and the seach button is clicked then throw a message of Please 'Enter A Name'
            if(event.type === 'click'){
               throwError.innerHTML ="Please Enter A Name";
            }
        }
    }    
    
    // if no item is found the error message appears 
    if(itemsShown === 0 && inputValue){
        throwError.innerHTML ="";
        throwError.innerHTML ="No items Found";
        paginationLinks(1, itemsPerPage, specificItems);
    }
}

//Removes All Items From the DOM
//Show Items on the correct page
const showItems = (itemPerPage, currentPage, Allitems) => { 
    //Removes All Items
   for(let i = 0; i < studentItem.length; i++){ studentList.innerHTML = ""; }
   //Show Items
   for(let i = (currentPage - 1) * itemPerPage; i < Allitems.length; i++){       
       if(i < (currentPage * itemPerPage)){ studentList.appendChild(Allitems[i]); }
   }       
}

//Creates the number of Links depeding of how many items there are
const paginationLinks = (numberOfPages, itemsPerPage, Allitems) =>{ 
    const ul = document.querySelector('.pagination-ul');    
    ul.innerHTML = "";
    
    for(var i = 0; i < numberOfPages; i++){
        ul.innerHTML += `<li> <a href="#" class="paginationLink" id="${i}"> ${i+1} </a> </li>`;
    }
    //calling activePage to add functionality to the updated links, and show items on the correct page
    activePage(numberOfPages, itemsPerPage, Allitems);
}

//Adding functionality to all Links in the DOM and check witch page is active
const activePage = (numberOfPages, itemsperpage, Allitems) =>{
    const activeLink = document.querySelectorAll('.paginationLink');
    let previousPage = 1;
    //setting the active page when it load and/or updates to (1)
    currentPage = 1;
    activeLink[0].classList.add('active');
    //when some one types in the search fielld this updates automatically and doesn't wait for a click event and Show Items on the correct page
    showItems(itemsperpage, currentPage, Allitems);
    
    //Adding functionality to all Links in the DOM and check witch page is active
    for(var i = 0; i < numberOfPages; i++){  
        activeLink[i].addEventListener('click', function(e){
            e.preventDefault();
            
            currentPage = parseInt(this.textContent);
            //get the right page number and all items that match,To show items in the correct page
            showItems(itemsperpage, currentPage, Allitems);
            //funding the active page
            for(var i = 0; i < numberOfPages; i++){ 
                if(currentPage !== previousPage){
                    activeLink[currentPage-1].classList.add('active');
                    activeLink[previousPage-1].classList.remove('active');
                    previousPage = currentPage;
                }
            }
        });
    } 
}


searchField();
paginationContainer();
paginationLinks(numberOfLinks, itemsPerPage, studentItem);
showItems(itemsPerPage, currentPage, studentItem); 
searchResults();