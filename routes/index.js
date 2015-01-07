var express = require('express');
var router = express.Router();
var rest = require('restler')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GIFScript' })
})

/* GET chat room */
router.get('/chat', function(req, res) {
  res.render('chat', { title: 'GIFScript' })
})

/* GET GIF form */
router.get('/gifs/new', function(req, res) {
  res.render('gif_form')
})

/* GET GIFs from Giphy search */
router.get('/gifs/search', function(req,res) {
  var queryString = req.query.giphysearch.split(" ").join("+")
  var giphyKey = process.env.GIPHY_PUBLIC_KEY
  var giphySearchURL = 'http://api.giphy.com/v1/gifs/search?q=' + queryString + '&api_key=' + giphyKey

  rest.get(giphySearchURL).on('complete', function(data) {
    // console.log(data.data[0].images.downsized.url)
    var gifs = data.data
    var firstTenGIFs = []
    console.log(data)
    for (var i = 0; i <= gifs.length -1 && i <= 9; i++) {
      firstTenGIFs.push(gifs[i].images.downsized.url)
    }
    res.render('giphy_results', { urls: firstTenGIFs })
  })
})

module.exports = router;
