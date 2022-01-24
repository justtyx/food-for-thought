document.querySelector('.cross').addEventListener('click', toggleBox);

function toggleBox() {
    document.querySelector('.box').classList.toggle('hidden');
}