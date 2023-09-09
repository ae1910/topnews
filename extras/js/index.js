const port = 8383;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.listen(port, () => console.log(`Server running on port ${port}`))


app.get('/recent', async (req,res) => {
    const requestURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`;
    const request = new Request(requestURL);
    const response = await fetch(request);
    if(response.status >= 200 && response.status < 300) {
        const latestNews = await response.json();
        res.json(latestNews);
    } else {
        console.log(response.status, response.statusText);
    }
})

app.get('/categories/:category', async (req,res) => {
    const category = req.params.category;
    const requestURL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.API_KEY}`;
    const request = new Request(requestURL);
    const response = await fetch(request);
    if(response.status >= 200 && response.status < 300) {
        const categoryNews = await response.json();
        res.json(categoryNews);
    } else {
        console.log(response.status, response.statusText);
    }
})

app.get('/results/:query/:sortBy', async (req,res) => {
    const query = req.params.query;
    const sortBy = req.params.sortBy;
    const requestURL = `https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&apiKey=${process.env.API_KEY}`;
    const request = new Request(requestURL);
    const response = await fetch(request);
    if(response.status >= 200 && response.status < 300) {
        const searchNews = await response.json();
        res.json(searchNews);
    } else {
        console.log(response.status, response.statusText);
    }
})