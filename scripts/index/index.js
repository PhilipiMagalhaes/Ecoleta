const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const close = document.querySelector('#modal .header a');

function addEventListeners(){
  buttonSearch.addEventListener('click', toggleModal);
  close.addEventListener('click', toggleModal); 
}
function toggleModal(){
  modal.classList.toggle('hide');
}

addEventListeners();