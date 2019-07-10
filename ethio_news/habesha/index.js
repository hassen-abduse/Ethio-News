var express = require('express');
var router = express.Router();
var path = __dirname + '/views/';
const cheerio = require('cheerio');
var url = require('url');
const request = require('request');

var page_url = 'https://www.bbc.com/amharic';
var result = [];


/* GET home page. */
router.get('/', (req, res) => {
  // request for the bbc amharic and scrap the latest posts
  request('https://www.bbc.com/amharic', function (err, resp, body) {
    if (err) {
      console.log(err)
      res.json({ success: true, message: 'It is working but has some errors' })
    }


    var $ = cheerio.load(body);
    // fetch the latest news form bbc amharic
    var latestNews = $('div#comp-top-stories-2 > div.dove > div.dove-item ');

    // array of text and link to the latest news on bbc amharic
   
    var data = [];

    // populate the array from the fetched result
    latestNews.each(function (i, e) {
      // console.log();
      data.push({
        text: $(this).first().children().last().text(),
        link: $(this).first().children().last().get(0).attribs.href
      })
    });
    res.render(path + 'index', { data: data });
  });
});
// to read a single post(New detail)
router.get('/read/amharic/:newsId', (req,res) => {
  console.log('the news id is ', req.params.newsId);
 request('https://www.bbc.com/amharic/'+req.params.newsId, function(err, resp, body){
   if(err){
     res.json({
       success: false,
       message: 'Error while fetching news from BBC'
     })
   }

   console.log(body);
   var $ = cheerio.load(body);
   console.log($('story-body__h1').length)
   res.json({
     success: true,
     message: 'working for...'
   })
 });
});

router.get('/post', function (req, res, next) {

  // this scraps only a static website

  request('https://www.bbc.com/amharic', (error, Response, html) => {
    if (!error && Response.statusCode == 200) {
      const $ = cheerio.load('html');

      const siteHeading = $('.title-link_title');

      const output = siteHeading.find('h3').text();
      console.log(output);
    }
  })
  res.render(path + 'about');

})



module.exports = router;
