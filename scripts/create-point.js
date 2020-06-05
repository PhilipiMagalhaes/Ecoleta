const itemsToCollect = [...document.querySelectorAll('.items-grid li')];
const itemsInput = document.querySelector('input[name=items]');
let selectedItems = [];

function alreadySelected(selectedItems, itemId) {
    return selectedItems.findIndex(selectedItem => {
        return selectedItem === itemId
    });
}
function addOrRemoveItems(item) {
    if (alreadySelected(selectedItems, item.dataset.id) >= 0) {
        selectedItems = selectedItems.filter(selectedItem => {
            return selectedItem != item.dataset.id;
        })
    }
    else {
        selectedItems.push(item.dataset.id);
    }
}
function handleSelectionItem(event) {
    const item = event.target;
    item.classList.toggle('selected');
    addOrRemoveItems(item);
    itemsInput.value = selectedItems;
}
function addOnClickItemsEventListeners(){
    itemsToCollect.map(item => {
        item.addEventListener('click', handleSelectionItem)
    });
}

addOnClickItemsEventListeners();