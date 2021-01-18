var express = require('express');
var router = express.Router();
var axios = require('axios')

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4MjkxNiwiZXhwIjoxNjExMDExNzE2fQ.F9YZWVSqsCR0FqQi-EJu1avHXjr3llMxYiUygCizfxL2fMktb6Wgc0xGdyeoV8AhjC0-BE0u21onDZg--Hu3uft748jKDz63gjZbjdmxEJCBgYrvx6X0y2an1noLnIFRMAv83ePjyvOOwK2VH2uhsq4X0-tisWDUcbwC1omEbAz5s1_LIfqzZZV2JhkGiiiEctxDrzc_8HijU_xYYOIqrI5Rikruih5F41Kscid6jpKKyAoNE0NUeCNYamjCE2x2w_pMH09su3M9IueRP0HKH6hwaVY8VxHXvHof9i52mkcjJO_xIPEeowXfXyFo3Rzs9F5SknYni-mU5_0HZLgM-A'

router.get('/', function(req,res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => {
      res.render('index', {classes: dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
})

router.get('/:cod', function(req,res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.cod + '?token=' + token)
    .then(dados => {
      if(req.params.cod.split('.')[2] != null) {
        axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.cod + '/procRel?token=' + token)
          .then(rels => {
            res.render('classe1', {c: dados.data, r: rels.data})
          })
          .catch(err => {
            res.status(500).jsonp({erro:err})
          })
      
      }
      else res.render('classe1', {c: dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
})



/* queries */
router.get('/queries/q1', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=3&token=' + token)
    .then(dados => {
      var counter = 0
      dados.data.forEach(i => {
        if(i.codigo.split('.')[0] == '750') {
          counter++
        }
      })
      console.log(counter)
      res.status(200).jsonp(dados.data)
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/queries/q2', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=4&token=' + token)
    .then(dados => {
      console.log(dados.data.length)
      res.status(200).jsonp(dados.data)
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/queries/q3', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=3&token=' + token)
    .then(dados => {
      var counter = 0
      dados.data.forEach(i => {
        if(i.codigo.split('.')[0] == '750' && i.codigo.split('.')[1] == '30') {
          console.log(i)
          counter++
        }
      })
      console.log(counter)
      res.status(200).jsonp(dados.data)
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/queries/q4', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c750.30.001/procRel?token=' + token)
    .then(dados => {
      console.log(dados.data.length)
      res.status(200).jsonp(dados.data)
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});


module.exports = router;