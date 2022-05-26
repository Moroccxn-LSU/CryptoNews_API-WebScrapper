const PORT = 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const articles = [];

app.get('/', (req, res) => {
    res.json('Welcome to my Crypto News API');
});

//Only one article for Bitcoin is retrieved currently trying to fix and/or duplicates entries
//I believe it is due to DOM complications on Yahoo's finance site
app.get('/crypto-news', (req, res) => {
    axios.get('https://finance.yahoo.com/cryptocurrencies/').then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a:contains("Bitcoin")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({
                title,
                url
            });
        });
        res.json(articles);
    }).catch((error) => console.log(error));
});

app.listen(
    PORT, () => console.log(`Server is up on PORT ${PORT}`)
);

//Website I want to use instead of yahoo due to DOM difficulties
//https://cryptonews.net/