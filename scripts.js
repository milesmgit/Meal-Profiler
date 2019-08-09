
//  create a print function to write to the DOM using getElementByID
const print1 = message => document.getElementById('output').innerHTML = message;





// will be using checkboxes for pushing selected ingredients to this array of ingredientObjects for calculations.

const ingredientArray = [];











// get the ingredientSearchResult paragraph
const ingredientSearchResult = document.getElementById('ingredientSearchResult');


populateIngredientArray = (ingredientObject, checkboxId, ingredientSearchResult, amountInput) => {
  // Get the checkbox
  const checkBox = document.getElementById(checkboxId);
  //  [this group selects the text input elements that will be used to input ingredient amounts]
  const amountTextInput = document.getElementById('amountTextInput');



  // If the checkbox is checked, display the output text
  if (checkBox.checked === true){

    if (isNaN(parseFloat(amountInput.value))){
      ingredientSearchResult.innerHTML ="That is not a number.  Enter a number and check the checkbox.";
    }
    else {
      ingredientSearchResult.innerHTML ="Ingredient : " + ingredientObject.ingredient;
    }


    // put the value of the parsedFloat textbox into the object key <amount>
    ingredientObject.amount = parseFloat(amountInput.value);



    const liquidRadioGroup = document.querySelectorAll('[name=liquidRadio]');
    const solidRadioGroup = document.querySelectorAll('[name=solidRadio]');

    if (ingredientObject.state === 'Liquid'){

      // check to see which radio button is selected and place its value into the object key <unit>
      for(let i = 0; i < liquidRadioGroup.length; i++){
        if (liquidRadioGroup[i].checked){
          ingredientObject.unit = liquidRadioGroup[i].value;

        }
      }
    } else {
        // check to see which radio button is selected and place its value into the object key <unit>
        for(let i = 0; i < solidRadioGroup.length; i++){
          if (solidRadioGroup[i].checked){
            ingredientObject.unit = solidRadioGroup[i].value;

          }
        }
     }



    // push the object onto an array so that the Calculate2 function can process the array.
    ingredientArray.push(ingredientObject);
    ingredientSearchResult.style.color = 'blue';

  } else {



    // returns the index [i] of the <tomatoIngredient> in the <ingredientArray>
    let removeIngredient = ingredientArray.indexOf(ingredientObject);
    // removes the <tomatoIngredient>  found at its index from the <ingredientArray> and stores the value in the variable <removed>
    const removed = ingredientArray.splice(removeIngredient, 1);
    ingredientSearchResult.style.color = 'black';
  }




}









// get the search button
const searchButton = document.getElementById('searchButton');

// Get the searchInput text field
const searchInput = document.getElementById("searchInput");



/*
on button click, script will fire that
1) searches the array of objects and if search term toLowerCase() is found, will return
the value of the object.
2) builds the page with radio buttons (for meansurement units) according to the <state> key of the ingredientData element
3) includes two versions of the output div according to the <state> key.  one for volume measurement, one for solid.
4) includes a checkbox to commit selection, and an add button to move the ingredient to the staging area, and reset
5) the output div area for another search term.
6)

*/

searchButton.addEventListener('click', () => {
// search function that returns object data by user input into the search box.

// this is without ES2015 arrow function, but still works fine.
// function isResult(ingredient) {
//   let searchInputValue = searchInput.value;
//   return ingredient.name === searchInputValue;
// }
//
// console.log(ingredientData.find(isResult));

// arrow function ES2015 for a search result pending on user input via a search text box.
const result = ingredientData.find( ingredient => ingredient.name === searchInput.value.toLowerCase());
console.log(result);
let resultIndex = ingredientData.indexOf(result);
console.log(ingredientData.indexOf(result));
console.log(resultIndex);

// const ingredientSearchResult = document.getElementById('ingredientSearchResult');

// display message to user according to search result.
if(result === undefined){
  ingredientSearchResult.innerHTML = searchInput.value + " is not in our database at this time.  Please search again.";
} else {   // preface inquiries with result to get the returned search item: example.  result.ingredient or result.unit
  ingredientSearchResult.innerHTML = "Ingredient : " + result.ingredient;
}

// test for <state> and build out an html element list
if(result.state === 'Liquid'){
  // grab the liquidHTML div
  const stateHTML = document.getElementById('stateHTML');
  // [this group selects the radio button elements that will be used to capture unit measurements]



  // create html for this group.
  stateHTML.innerHTML = `
      <input type="radio"  name="liquidRadio" value="Fluid Ounces" checked> Fluid Ounces<br>
      <input type="radio"  name="liquidRadio" value="Milliliters"> Milliliters<br>
      <input type="radio"  name="liquidRadio" value="Teaspoons"> Teaspoons<br>
      <input type="radio"  name="liquidRadio" value="Tablespoons"> Tablespoons<br>

      <input type='text' id='amountTextInput' placeholder="Numerical value [ENTER]">
      <input type="checkbox" id="checkbox" onclick="populateIngredientArray(ingredientData[${resultIndex}], 'checkbox', ingredientSearchResult, amountTextInput)">
      <div id='calculate'>
            <button id='calculateButton'>Calculate Meal</button>
      </div>
  `;


} else {

    stateHTML.innerHTML = `
      <input type="radio"  name="solidRadio" value="Ounces" checked>  Ounces<br>
      <input type="radio"  name="solidRadio" value="Grams"> Grams<br>

      <input type='text' id='amountTextInput'>
      <input type="checkbox" id="checkbox" onclick="populateIngredientArray(ingredientData[${resultIndex}], 'checkbox', ingredientSearchResult, amountTextInput)">
      <div id='calculate'>
            <button id='calculateButton'>Calculate Meal</button>
      </div>
  `;

}



})



// Execute a function when the user releases a key on the keyboard, or
// presses the search button.
searchInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchButton").click();
  }
});
