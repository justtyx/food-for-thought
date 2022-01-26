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
        // console.log(i);
    } else if (i === 7) {
            console.log('hey');
            boxHeading.innerHTML = text[6].heading;
            boxBody.innerHTML = text[6].body;
            theButton.innerHTML = 'Play a game';

            theButton.addEventListener('click', openGameOne);
        }
}}


function openGameOne() {
    
// fetch food pyramid data
fetch(`https://spring21-427e.restdb.io/rest/food-pyramid`, {
    "method": "GET",
    "headers": {
      "x-apikey": "6034a7eb5ad3610fb5bb6548"
    }
  })
  .then((res) => res.json())
  .then(response => {
    loadGameOne(response);
  })
  .catch(err => {
    console.error(err);
  });

  function loadGameOne(gameOneData) {
    console.log(gameOneData);

    const pyramidTemplate = document.querySelector('.food-pyramid-img').content;
    
    gameOneData.forEach(item => {
       
        //clone it
        const clone = pyramidTemplate.cloneNode(true); 
        //change content
        console.log(item);
        clone.querySelector('img.pyramid-items').src = item.image;
        clone.querySelector('img.pyramid-items').class = `pyramid-items draggable item-shelf-${item.shelf}`;
       
        //apend
        document.querySelector('.food-item-img').appendChild(clone);
    });

    const draggableElements = document.querySelectorAll(".draggable");
    const droppableElements = document.querySelectorAll(".droppable");

    draggableElements.forEach(elem => {
      elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
      // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
      // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.class); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

//Events fired on the drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  const droppableElementData = event.target.getAttribute("data-draggable-class");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    const draggableElement = document.getElementByClass(draggableElementData);
    event.target.classList.add("dropped");
    // event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following: 
    // event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
  }
}

  }

    theBox.classList.add('scale-up');
    boxText.classList.add('fade-out');
    boxHeading.innerHTML = "";
    boxBody.innerHTML = "";
    document.querySelector('.pyramid-game-hidden').classList.remove('hidden');
    theButton.innerHTML = 'Done';
    theButton.addEventListener('click', () => {
    document.querySelector('.pyramid-game-hidden').classList.add('hidden');
    theBox.classList.remove('scale-up');
        theButton.innerHTML = 'Finish';
        boxHeading.innerHTML="Good job!"
        boxBody.innerHTML="Select a plate to get a recipe."
        document.querySelector('.plates').classList.remove('hidden');
        document.querySelector('.step-two').classList.remove('inactive');
    })
}

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

//open theme 2