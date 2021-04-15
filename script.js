// load the airtable library, call it "Airtable" 
// var and let is interchangable. let is more modern verion
//console.log is to make sure aritable is working
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
//connect our airtable base to our website using ur unique API key
// usually API key is kept private bc it can be hacked
// click "help" and "API Documentation"
// if API doesnt show, go to account and click generate API Key and refresh
var base = new Airtable({ apiKey: "keyoBnsbDmjnnwAGR" }).base(
  "appnUPQYZW1W27EzS"
);

// get our airtable data, specify how to retrieve it
// if name of base has space in between words, replace space to underscore
// e.g. if name is pretty cakes, it becomes base("pretty_cakes")
// base name and column names has to be lowercase ^
base("kiko_shanghai").select({}).eachPage(gotPageOfStores, gotAllStores);

// an empty array to hold our cake data
// an array is a list of things that's written in square brackets in js
// e.g. ["cake"], but this is an empty array so left blank
// const is another variable. alternative to var
const stores = [];

// callback function that receives our data
function gotPageOfStores(records, fetchNextPage) {
    console.log("gotPageOfStores()");
    // add the records from this page to our books array
    // push is another word for add
    stores.push(...records);
    // request more pages
    fetchNextPage();
  }

  // call back function that is called when all pages are loaded
function gotAllStores(err) {
    console.log("gotAllStores()")

 // report an error, you'd want to do something better than this in production
 if (err) {
    console.log("error loading stores");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogStores();
  showStores(); 
};

// just loop through the books and console.log them
function consoleLogStores() {
    console.log("consoleLogStores()");
    stores.forEach((store) => {
      console.log("Stores:", store);
    });
  }
  
  // loop through the books, create an h2 for each one, and add it to the page
  // cake.fields.____ blank should be name of first column
  function showStores() {
    console.log("showStores()");
    stores.forEach((store) => {

      //creating div container
      var storeContainer = document.createElement("div");
      storeContainer.classList.add("store-container");
      document.querySelector(".container").append(storeContainer);

      //adding 1rst column (category)
      var storeName = document.createElement("h2");
      storeName.classList.add("name");
      storeName.innerText = store.fields.name;
      storeContainer.append(storeName);
      
      //adding 1rst column (category)
      var storeCategory = document.createElement("h3");
      storeCategory.classList.add("category");
      storeCategory.innerText = store.fields.category;
      storeContainer.append(storeCategory);

     //adding 2nd column (from)
     var storeFrom = document.createElement("p");
     storeFrom.classList.add("from");
     storeFrom.innerText = store.fields.from;
     storeContainer.append(storeFrom);

     //adding 3rd column(pix) for images using "img" and src 
     var storePix = document.createElement("img");
     storePix.classList.add("pix");
     storePix.src = store.fields.pix[0].url;
     storeContainer.append(storePix);

      // add event listener
      // when user clicks on cake container
      //img and description will appear or disappear
      storeContainer.addEventListener("click", function() {
      storeFrom.classList.toggle("active");
      storePix.classList.toggle("active");
      storeCategory.classList.toggle("active");
      })
      
      //get genre field from airtable
      //loop through array and add each genre as a class
      //to song container
      //genre can be word u want
      var storeLocations = store.fields.from;
      storeLocations.forEach(function(from) {
      storeContainer.classList.add(from)
      });

      var filterCategory = document.querySelector('.category');
      filterCategory.addEventListener("click", function() {

        if(storeContainer.classList.contains("category")) {
          storeContainer.style.background = "red";
        } else {
          storeContainer.style.background = "white";
        }
      })

      });
    }