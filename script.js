// close box

document.querySelector('.cross').addEventListener('click', toggleBox);

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

    document.querySelector('.box-text+button').addEventListener('click', changeText);
    
    let i = 0;

    function changeText() {
        document.querySelector('.box-text').classList.add('fade-out');
        document.querySelector('.box-text>h1').innerHTML = text[i].heading;
        document.querySelector('.box-text>p').innerHTML = text[i].body;
        document.querySelector('.box-text').classList.add('fade-in');
        i++;
        console.log(i);

        if (i === 7) {
            console.log('hey');
            document.querySelector('.box-text>h1').innerHTML = text[6].heading;
        document.querySelector('.box-text>p').innerHTML = text[6].body;
            document.querySelector('.box-text+button').innerHTML = 'Play a game';

    document.querySelector('.box-text+button').addEventListener('click', openGameOne);

        }
    
}}