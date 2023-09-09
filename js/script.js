let latestNewsAPI = `https://newsapi.org/v2/top-headlines?country=us&apiKey=`;
let categoryNewsAPI = "https://newsapi.org/v2/top-headlines?country=us&category=";

let data = [];

let prevBtn = document.getElementsByClassName("prev")[0];
let nextBtn = document.getElementsByClassName("next")[0];
let dot1 = document.getElementsByClassName("dot1")[0];
let dot2 = document.getElementsByClassName("dot2")[0];
let dot3 = document.getElementsByClassName("dot3")[0];
let dot4 = document.getElementsByClassName("dot4")[0];


let slideIndex = 0;
function plusSlides(n) {
    showSlides(slideIndex += n)
}
function currentSlide(n) {
    showSlides(slideIndex = n)
}

prevBtn.addEventListener("click", () => {
    plusSlides(-1);
});
nextBtn.addEventListener("click", function() {
    plusSlides(1);
});
dot1.addEventListener("click", function() {
    currentSlide(1);
});
dot2.addEventListener("click", function() {
    currentSlide(2);
});
dot3.addEventListener("click", function() {
    currentSlide(3);
});
dot4.addEventListener("click", function() {
    currentSlide(4);
});

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slider-item");
    let dots = document.getElementsByClassName("manual-btn");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }    
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("check")
    }
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].classList.add("check");
    // setTimeout(showSlides, 8000); // Change image every 2 seconds
}
function autoSlides() {
    let i;
    let slides = document.getElementsByClassName("slider-item");
    let dots = document.getElementsByClassName("manual-btn");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("check");
    }
    slideIndex++; 
    if (slideIndex > slides.length) {slideIndex = 1;}
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].classList.add("check");
    setTimeout(autoSlides, 8000); // Change image every 2 seconds
}


function insertLatestNews(data) {
    let slider = document.querySelector(".slider");
    for(let i = 0; i < 4; i++) {
        let slide = document.createElement("a");
        slide.classList.add("slider-item");
        slide.href = data.articles[i].url;
        slider.appendChild(slide);

        let slideImg = document.createElement("div");
        slideImg.classList.add("slide-image");
        slideImg.style.backgroundImage = `url("${data.articles[i].urlToImage}")`;
        slide.appendChild(slideImg);

        let metaDiv = document.createElement("div");
        metaDiv.classList.add("metadata");
        slide.appendChild(metaDiv);

        let textDiv = document.createElement("div");
        metaDiv.appendChild(textDiv);

        let slideSource = document.createElement("p");
        slideSource.classList.add("slider-source");
        slideSource.textContent = data.articles[i].source.name.toUpperCase();
        textDiv.appendChild(slideSource);

        let slideAuthorDate = document.createElement("p");
        slideAuthorDate.classList.add("slider-author-date");
        let date = new Date(data.articles[i].publishedAt) 
        if(data.articles[i].author == null) {
            slideAuthorDate.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        } else {
            slideAuthorDate.textContent = `${data.articles[i].author}  |  ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        }
        textDiv.appendChild(slideAuthorDate);

        let slideTitle = document.createElement("h1");
        slideTitle.textContent = data.articles[i].title;
        metaDiv.appendChild(slideTitle);

        let slideDescription = document.createElement("p");
        slideDescription.classList.add("slider-description");
        slideDescription.textContent = data.articles[i].description;
        metaDiv.appendChild(slideDescription);
    }
    autoSlides();
    showSlides(slideIndex);
}

function insertSectionNews(data, categoryNme) {
    let main = document.querySelector("main");

    let sectionTitle = document.createElement("div");
    sectionTitle.classList.add("section-title");
    main.appendChild(sectionTitle);

    let title = document.createElement("h2");
    title.textContent = categoryNme.toUpperCase();
    sectionTitle.appendChild(title);

    let divider = document.createElement("hr");
    sectionTitle.appendChild(divider);

    let link = document.createElement("a");
    link.href = categoryNme + ".html";
    link.textContent = "See More"
    sectionTitle.appendChild(link);


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

    for(let i = 1; i < 4; i++) {
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
    fetchLatestNews();
    fetchCategoryNews();
}


async function fetchLatestNews() {
    const requestURL = latestNewsAPI + apiKey;
    const request = new Request(requestURL);
    const response = await fetch(request);
    data = [];
    if(response.status >= 200 && response.status < 300) {
        const latestNews = await response.json();
        data = latestNews;
    } else {
        console.log(response.status, response.statusText);
    }
    
    insertLatestNews(data);
}

const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
async function fetchCategoryNews() {
    for(let i = 0; i < categories.length; i++) {
        category = categories[i];
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
}