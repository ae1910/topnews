
let categoryNewsAPI = "https://newsapi.org/v2/top-headlines?country=us&category=";

let data = [];

const activeSec = document.getElementsByClassName("active")[0];
let c = activeSec.textContent;
let category = c.toLowerCase();

function insertSectionNews(data, categoryNme) {
    let main = document.querySelector("main");

    let sectionTitle = document.createElement("div");
    sectionTitle.classList.add("category-title");
    main.appendChild(sectionTitle);

    let title = document.createElement("h2");
    title.textContent = categoryNme.toUpperCase();
    sectionTitle.appendChild(title);


    let previewGrids = document.createElement("div");
    previewGrids.classList.add("article-grid");
    main.appendChild(previewGrids);
    let card = document.createElement("a");
    card.classList.add("main-card");
    
    card.href = data.articles[0].url;
    previewGrids.appendChild(card);

    let metaDiv = document.createElement("div");
    metaDiv.classList.add("card-metadata");
    card.appendChild(metaDiv);

    let topRow = document.createElement("div");
    topRow.classList.add("card-top-row");
    metaDiv.appendChild(topRow);

    let sourceName = document.createElement("p");
    sourceName.classList.add("source-name");
    sourceName.textContent = data.articles[0].source.name;
    topRow.appendChild(sourceName);

    let authorName = document.createElement("p");
    authorName.classList.add("card-author");
    if(data.articles[0].author == null || data.articles[0].author.substr(0, 4) == "http") {
        authorName.textContent = "";
    } else {
        authorName.textContent = `By: ${data.articles[0].author}`;
    }
    topRow.appendChild(authorName);

    let cardTitle = document.createElement("h1");
    cardTitle.textContent = data.articles[0].title;
    metaDiv.appendChild(cardTitle);
    
    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description");
    cardDescription.textContent = data.articles[0].description;
    metaDiv.appendChild(cardDescription);

    let cardDate = document.createElement("p");
    cardDate.classList.add("card-date");
    let date = new Date(data.articles[0].publishedAt)
    cardDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    metaDiv.appendChild(cardDate);

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-image");
    cardImg.src = data.articles[0].urlToImage;
    card.appendChild(cardImg);

    for(let i = 1; i < data.totalResults; i++) {
        let card = document.createElement("a");
        card.classList.add("preview-card");
        card.href = data.articles[i].url;
        previewGrids.appendChild(card);

        let cardImg = document.createElement("img");
        cardImg.classList.add("card-image");
        cardImg.src = data.articles[i].urlToImage;
        card.appendChild(cardImg);

        let metaDiv = document.createElement("div");
        metaDiv.classList.add("card-metadata");
        card.appendChild(metaDiv);

        let topRow = document.createElement("div");
        topRow.classList.add("card-top-row");
        metaDiv.appendChild(topRow);

        let sourceName = document.createElement("p");
        sourceName.classList.add("source-name");
        sourceName.textContent = data.articles[i].source.name;
        topRow.appendChild(sourceName);

        let authorName = document.createElement("p");
        authorName.classList.add("card-author");
        if(data.articles[i].author == null || data.articles[i].author.substr(0, 4) == "http") {
            authorName.textContent = "";
        } else {
            authorName.textContent = `By: ${data.articles[i].author}`;
        }
        topRow.appendChild(authorName);

        let cardTitle = document.createElement("h1");
        cardTitle.textContent = data.articles[i].title;
        metaDiv.appendChild(cardTitle);

        let cardDate = document.createElement("p");
        cardDate.classList.add("card-date");
        let date = new Date(data.articles[i].publishedAt)
        cardDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        metaDiv.appendChild(cardDate);
    }
}
window.onload = function() {
    fetchCategoryNews();
}


async function fetchCategoryNews() {
    const requestURL = categoryNewsAPI + category + "&apiKey=" + apiKey;
    const request = new Request(requestURL);
    const response = await fetch(request);
    data = [];
    if(response.status >= 200 && response.status < 300) {
        const categoryNews = await response.json();
        data = categoryNews;
    } else {
        console.log(response.status, response.statusText);
    }

    insertSectionNews(data, category);
}