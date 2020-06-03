const apiEstadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const ufSelect = document.querySelector('select[name=uf]');
const ufInput = document.querySelector('[name = ufName]');
const citySelect = document.querySelector('select[name=city]');
const cityInput = document.querySelector('[name=cityName]');

function setCityApiUrl(UFId) {
    return `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFId}/municipios`
}
function getUFs() {
    fetchFunction(apiEstadosUrl, ufSelect);
}
function fetchFunction(apiUrl, select) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.nome.localeCompare(b.nome))
                .map(dataItem => {
                    select.innerHTML += `<option value="${dataItem.id}">${dataItem.nome}</option>`;
                });
        });
}
function getCities(event) {
    const UFId = event.target.value;
    const apiUrl = setCityApiUrl(UFId);
    fetchFunction(apiUrl, citySelect);
    citySelect.disabled = false;
}
function ufSelectChangeListener() {
    ufSelect.addEventListener('change', getCities);
    ufSelect.addEventListener('change', setUfValue);
}
function citySelectChangeListener() {
    citySelect.addEventListener('change', setCityInput)
}
function setUfValue(event) {
    const indexOfSelectedUF = event.target.selectedIndex;
    ufInput.value = event.target.options[indexOfSelectedUF].text;
}
function setCityInput(event) {
    const indexOfSelectedCity = event.target.selectedIndex;
    cityInput.value = event.target.options[indexOfSelectedCity].text;
}


getUFs();
ufSelectChangeListener();
citySelectChangeListener();
