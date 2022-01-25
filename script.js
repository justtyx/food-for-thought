const theButton = document.querySelector('.thebutton');
const theBox = document.querySelector('.box');
const boxText = document.querySelector('.box-text');
const boxHeading = document.querySelector('.box-text>h1');
const boxBody = document.querySelector('.box-text>p');

// close box

document.querySelector('.cross').addEventListener('click', toggleBox);

//open the box

document.querySelector('.step-one').addEventListener('click', toggleBox)

function toggleBox() {
    document.querySelector('.box').classList.toggle('hidden');
}

// fetch slides
fetch(`https://spring21-427e.restdb.io/rest/fft-text`, {
  "method": "GET",
  "headers": {
    "x-apikey": "6034a7eb5ad3610fb5bb6548"
  }
})
.then((res) => res.json())
.then(response => {
  loadText(response);
})
.catch(err => {
  console.error(err);
});

// intro continue btn

function loadText(text) {
    console.log(text);

    theButton.addEventListener('click', changeText);
    
    let i = 0;

    function changeText() {

        if (i < 7) {

        
        boxText.classList.add('fade-out');
        boxHeading.innerHTML = text[i].heading;
        boxBody.innerHTML = text[i].body;
        boxText.classList.add('fade-in');
        i++;
        console.log(i);
    } else if (i === 7) {
            console.log('hey');
            boxHeading.innerHTML = text[6].heading;
            boxBody.innerHTML = text[6].body;
            theButton.innerHTML = 'Play a game';

            theButton.addEventListener('click', openGameOne);

    function openGameOne() {
        theBox.classList.add('scale-up');
        boxText.classList.add('fade-out');
        boxHeading.innerHTML = "";
        boxBody.innerHTML = "";
        theButton.innerHTML = 'Done';
        theButton.addEventListener('click', () => {
        theBox.classList.remove('scale-up');
            theButton.innerHTML = 'Finish';
            boxHeading.innerHTML="Good job!"
            boxBody.innerHTML="Select a plate to get a recipe."
            document.querySelector('.plates').classList.remove('hidden');
            document.querySelector('.step-two').classList.remove('inactive');
        })
    }
        }
}}

// recipes after the game
// fetch recipes
fetch(`https://spring21-427e.restdb.io/rest/recipes`, {
  "method": "GET",
  "headers": {
    "x-apikey": "6034a7eb5ad3610fb5bb6548"
  }
})
.then((res) => res.json())
.then(response => {
  showRecipe(response);
})
.catch(err => {
  console.error(err);
});

function showRecipe(recipes) {
    console.log(recipes);
    document.querySelector('.plates').addEventListener('click', () => {
        theBox.classList.add('scale-up');
        document.querySelector('.plates').classList.add('fade-out');
        document.querySelector('.recipe-hidden').classList.remove('hidden');
        let randRecipe = Math.floor(Math.random() * 3);
        boxHeading.innerHTML = recipes[randRecipe].title;
        boxBody.innerHTML = recipes[randRecipe].description;
        document.querySelector('.ingredients').innerHTML = recipes[randRecipe].ingredients;
        document.querySelector('.recipe-steps').innerHTML = recipes[randRecipe].recipe;
        document.querySelector('.reference>span').innerHTML = recipes[randRecipe].link;
        document.querySelector('.reference>span').setAttribute("href", "recipes[randRecipe].link");
        theButton.addEventListener('click', toggleBox);
    })
}