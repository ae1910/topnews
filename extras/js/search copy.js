const primaryNav = document.querySelector(".nav-items");
const navToggle = document.querySelector(".mobile-toggle");
let currentList = 0;

navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute('data-visible');
    if(visibility === "false") {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else if(visibility === "true") {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
});


let searchBox = document.getElementById("search-bar");
let navSearchBox = document.getElementById("nav-search-bar");
let searchInput = document.querySelector("#search-bar .search-txt");
let navSearchInput = document.querySelector("#nav-search-bar .search-txt");

function submitForm(input, e) {
    sessionStorage.setItem("query", input.value);
    if(input.value == "" || input.value == null) {
        e.preventDefault();
        return false;
    }
}

let icon = document.getElementsByClassName("submit")[0];
searchBox.addEventListener("submit", (e) => {
    submitForm(searchInput, e);
});
navSearchBox.addEventListener("submit", (e) => {
    submitForm(navSearchInput, e);
});


let newsQuery = document.querySelectorAll("#newsQuery");
const apiKey = "11e74ae98b274160b207ecf48612fbe4";
const searchAPI = "https://newsapi.org/v2/everything?q=";

function insertSearchResults(data, currentList) {
    mainSearchInput.value = sessionStorage.getItem("query");
    let totalResults = document.querySelector(".search-data p");
    totalResults.textContent = `Showing ${data.totalResults} results`;

    let searchGrid = document.querySelector(".search-grid");

    if(data.totalResults = 0) {
        let noResults = document.createElement("p");
        noResults.classList.add("no-results");
    } else {
        for(let i = currentList; i < currentList + 10; i++) {
            let card = document.createElement("a");
            card.classList.add("search-card");
            card.href = data.articles[i].url;
            searchGrid.appendChild(card);
    
            let cardDate = document.createElement("p");
            cardDate.classList.add("search-date");
            let date = new Date(data.articles[i].publishedAt)
            cardDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
            card.appendChild(cardDate);
    
            let cardInfo = document.createElement("div");
            cardInfo.classList.add("card-info");
            card.appendChild(cardInfo);
    
            let metaDiv = document.createElement("div");
            metaDiv.classList.add("search-metadata");
            cardInfo.appendChild(metaDiv);
    
            let sourceName = document.createElement("p");
            sourceName.classList.add("source-name");
            sourceName.textContent = data.articles[i].source.name;
            metaDiv.appendChild(sourceName);
    
            let cardTitle = document.createElement("h1");
            cardTitle.textContent = data.articles[0].title;
            metaDiv.appendChild(cardTitle);
            
            let cardDescription = document.createElement("p");
            cardDescription.classList.add("search-description");
            cardDescription.textContent = data.articles[0].description;
            metaDiv.appendChild(cardDescription);
    
            let authorName = document.createElement("p");
            authorName.classList.add("card-author");
            if(data.articles[i].author == null || data.articles[i].author.substr(0, 4) == "http") {
                authorName.textContent = "";
            } else {
                authorName.textContent = `By: ${data.articles[0].author}`;
            }
            metaDiv.appendChild(authorName);
    
            let cardImg = document.createElement("img");
            cardImg.classList.add("card-image");
            cardImg.src = data.articles[i].urlToImage;
            cardInfo.appendChild(cardImg);
        }
        currentList += 10;
    }
    if(currentList >= data.totalResults) {
        showMoreBtn.style.display = "none";
    }
}

let showMoreBtn = document.querySelector(".show-more");
console.log(showMoreBtn);
showMoreBtn.addEventListener("click", () => {
    insertSearchResults(data, currentList);
});


async function fetchQueryNews() {
    link =  searchAPI + encodeURIComponent(sessionStorage.getItem("query")) + "&sortBy=" + sortBy +"&apiKey=" + apiKey;
    console.log(link);
    const requestURL = link;
    const request = new Request(requestURL);
    const response = await fetch(request);
    data = [];
    if(response.status >= 200 && response.status < 300) {
        const searchNews = await response.json();
        data = searchNews;
        console.log(data);
    } else {
        console.log(response.status, response.statusText);
    }

    insertSearchResults(data, currentList);
}