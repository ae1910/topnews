let mainSearchBox = document.getElementById("main-search-bar");
let mainSearchInput = document.querySelector("#main-search-bar .search-txt"); 
let currentList = 0;

function submitForm(input, e) {
    sessionStorage.setItem("query", input.value);
    if(input.value == "" || input.value == null) {
        e.preventDefault();
        return false;
    }
}

mainSearchBox.addEventListener("submit", (e) => {
    submitForm(mainSearchInput, e);
});

let showMoreBtn = document.querySelector(".show-more");
showMoreBtn.addEventListener("click", () => {
    currentList += 10;
    insertSearchResults(data, currentList);
});

let sortBy = document.querySelector(".search-data select").value;

window.onload = function() {
    fetchQueryNews();
}

document.querySelector('.search-data select').onchange = function() {
    document.querySelector('.search-grid').innerHTML = "";
    sortBy = document.querySelector(".search-data select").value;
    fetchQueryNews();
};