const theButtonTwo = document.querySelector('.thebuttontwo');
const theBoxTwo = document.querySelector('.box-two');
const boxTextTwo = document.querySelector('.box-text-two');
const boxHeadingTwo = document.querySelector('.box-text-two>h1');
const boxBodyTwo = document.querySelector('.box-text-two>p');

// close box

document.querySelector('.cross').addEventListener('click', toggleBox);

//open the box

document.querySelector('.step-two').addEventListener('click', toggleBox)

function toggleBox() {
    document.querySelector('.box-two').classList.toggle('hidden');
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

    theButtonTwo.addEventListener('click', changeText);

    
    let i = 7;

    function changeText() {

      boxTextTwo.classList.add('fade-out');
      boxHeadingTwo.innerHTML = text[i].heading;
      boxBodyTwo.innerHTML = text[i].body;
      boxTextTwo.classList.add('fade-in');
      i++;
      // console.log(i);
    if (i === 14) {
            boxHeadingTwo.innerHTML = text[6].heading;
            boxBodyTwo.innerHTML = text[6].body;
            theButtonTwo.innerHTML = 'Play a game';

            theButtonTwo.addEventListener('click', openGameOne);
        }

    theButtonTwo.innerHTML="Continue"
}}


/*function openGameOne() {

  }*/

    theBoxTwo.classList.add('scale-up');
    boxTextTwo.classList.add('fade-out');
    boxHeadingTwo.innerHTML = "";
    boxBodyTwo.innerHTML = "";
    document.querySelector('.pyramid-game-hidden').classList.remove('hidden');
    theButtonTwo.innerHTML = 'Done';
    theButtonTwo.addEventListener('click', () => {
    document.querySelector('.pyramid-game-hidden').classList.add('hidden');
    theBoxTwo.classList.remove('scale-up');
        theButtonTwo.innerHTML = 'Finish';
        boxHeadingTwo.innerHTML="Good job!"
        boxBodyTwo.innerHTML="Select a plate to get a recipe."
        document.querySelector('.plates-two').classList.remove('hidden');
        document.querySelector('.step-two').classList.remove('inactive');

        theButtonTwo.addEventListener('click', () => {
          document.querySelector('.recipe-hidden').classList.add('hidden');
          theBoxTwo.classList.add('hidden');
        })
    })

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
    document.querySelector('.plates-two').addEventListener('click', () => {
        theBoxTwo.classList.add('scale-up');
        document.querySelector('.plates-two').classList.add('fade-out');
        document.querySelector('.recipe-hidden').classList.remove('hidden');
        let randRecipe = Math.floor(Math.random() * 3);
        boxHeadingTwo.innerHTML = recipes[randRecipe].title;
        boxBodyTwo.innerHTML = recipes[randRecipe].description;
        document.querySelector('.ingredients').innerHTML = recipes[randRecipe].ingredients;
        document.querySelector('.recipe-steps').innerHTML = recipes[randRecipe].recipe;
        document.querySelector('.reference>span').innerHTML = recipes[randRecipe].link;
        document.querySelector('.reference>span').setAttribute("href", "recipes[randRecipe].link");
        theButtonTwo.addEventListener('click', () => {
          document.querySelector('.recipe-hidden').classList.add('hidden');
          theBoxTwo.classList.add('hidden');
        });
    })
}

