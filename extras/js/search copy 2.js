const primaryNav = document.querySelector(".nav-items");
const navToggle = document.querySelector(".mobile-toggle");

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

function insertSearchResults(data, currentList) {
    mainSearchInput.value = sessionStorage.getItem("query");
    let totalResult = document.querySelector(".search-data p");
    totalResult.textContent = `Showing ${data.totalResults} results`;

    let searchGrid = document.querySelector(".search-grid");

    if(num = 0) {
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
            cardTitle.textContent = data.articles[i].title;
            metaDiv.appendChild(cardTitle);
            
            let cardDescription = document.createElement("p");
            cardDescription.classList.add("search-description");
            cardDescription.textContent = data.articles[i].description;
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
        console.log(currentList);
    }
    if(currentList >= data.articles.length) {
        showMoreBtn.style.display = "none";
    }
}


async function fetchQueryNews() {
    let query = encodeURIComponent(sessionStorage.getItem("query"))
    const requestURL = `http://localhost:8383/results/${query}/${sortBy}`;
    const request = new Request(requestURL);
    const response = await fetch(request);
    data = [];
    if(response.status >= 200 && response.status < 300) {
        const searchNews = await response.json();
        data = searchNews;
    } else {
        console.log(response.status, response.statusText);
    }

    insertSearchResults(data, currentList);
}