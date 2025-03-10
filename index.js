/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    const gameDisplay=`
    
    <p>${gameName} is currently crowdfunding!</p>
    <img src="${gameImage}"></img>

    <p>Description: ${gameDescription}</p>

    `
    for(var i=0;i<games.length;i++){
        var x=document.createElement('div');
        x.classList.add('game-card');
        var gameName=games[i].name;
        var gameImage=games[i].img;
        var gameDescription=games[i].description;
        var gamePledged=games[i].pledged;
        var gameNeeded=games[i].goal;
        const gameDisplay=`
    <br>
            <p>${gameName} is currently crowdfunding!</p>
            <img class="game-img" src="${gameImage}"></img>
            <p><b>Goal: </b>$${gameNeeded.toLocaleString()}</p>
            <p><b>Total Raised: </b>$${gamePledged.toLocaleString()}</p>
            <p><b>Status: </b>${gamePledged<gameNeeded? "Just $"+(gameNeeded-gamePledged).toLocaleString()+" to go!":"Funded!"}</p>
            <p>Description: ${gameDescription}</p>

    `;

        x.innerHTML=gameDisplay;
        document.getElementById('games-container').appendChild(x);

    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributions= GAMES_JSON.reduce( (acc,game) => {
    return acc+ game.backers;
},0);
const templateInner=`
<p> ${contributions}</p>
`
contributionsCard.innerHTML=templateInner;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised= GAMES_JSON.reduce( (acc,game) => {
    return acc+ game.pledged;
},0);
const templateInner2=`
<p>$${totalRaised.toLocaleString()}</p>
`
raisedCard.innerHTML=templateInner2;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames=GAMES_JSON.length;
gamesCard.innerText=numGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames= GAMES_JSON.filter( (game)=>{
        return game.pledged < game.goal;

    });
    console.log(listOfUnfundedGames.length)
    addGamesToPage(listOfUnfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    

}

// filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let listOfFundedGames= GAMES_JSON.filter( (game)=>{
        return game.pledged >= game.goal;

    });
    console.log(listOfFundedGames.length)
    addGamesToPage(listOfFundedGames);

}
// filterFundedOnly();
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',filterUnfundedOnly);
fundedBtn.addEventListener('click',filterFundedOnly);
allBtn.addEventListener('click',showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames=GAMES_JSON.reduce((acc, game)=>{
    return acc + (game.pledged<game.goal ?1 :0); 
},0);

// create a string that explains the number of unfunded games using the ternary operator
const descriptionString= `
<p> $${totalRaised.toLocaleString()} has been raised so far for ${GAMES_JSON.length} games. ${unfundedGames} have not reached their goals. Help us fund these games!</p>
`
console.log(descriptionString);


// create a new DOM element containing the template string and append it to the description container
var explainUnfunded= document.createElement('p');
explainUnfunded.innerHTML=descriptionString;
descriptionContainer.appendChild(explainUnfunded);
/************************************************************************************
 * CODE: toLocaleString<div>1ivy
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 * FINAL CODE: zoohowcedar
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
// Compare function!
const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
//console.log(sortedGames);
// use destructuring and the spread operator to grab the first and second games
let [topGame,secondGame,...otherGames]=sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
var newItem=document.createElement('p');
newItem.innerText=`${topGame.name} with a total of: $${topGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(newItem);

// do the same for the runner up item
var newItem=document.createElement('p');
newItem.innerText=`${secondGame.name} with a total of: $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(newItem);