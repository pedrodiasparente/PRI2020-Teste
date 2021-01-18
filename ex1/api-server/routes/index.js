var express = require('express');
var router = express.Router();

var Casamento = require('../controllers/casamento')

/* GET home page. */
router.get('/api/casamentos', function(req, res) {
  if(req.query.nome != null) {
    Casamento.listAll()
      .then(dados => {
        var casmts = []
        dados.forEach(c => {
          if(c.title.includes(req.query.nome)) casmts.push(c)
        })

        res.status(200).jsonp({casamentos:casmts})
      })
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  else if (req.query.ano != null) {
    Casamento.listYear(req.query.ano)
      .then(dados => res.status(200).jsonp({casamentos:dados}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  else if (req.query.byAno == 'true') {
    Casamento.listByAno()
      .then(dados => {
      
        anos = {}
        dados.forEach((registo) => {
          if (anos[registo.date] == null){

            anos[registo.date] = []
            anos[registo.date].push(registo)

          } else {

            anos[registo.date].push(registo)
          }
        })

        res.status(200).jsonp({datas:anos})
      })
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  else Casamento.list()
    .then(dados => res.status(200).jsonp({casamentos:dados}))
    .catch(err => res.status(500).jsonp({erro: err}))
});

router.get('/api/casamentos/noivos', function(req, res) {
  Casamento.listAll()
    .then(dados => {
      var noivos = []
      dados.forEach(registo => {
        noivos.push({ noivo: registo.title.split(':')[1].split('c.c.')[0], _id: registo._id})
      })

      noivos.sort((a, b) => (a.noivo > b.noivo) ? 1 : -1)

      res.status(200).jsonp({noivos: noivos}) 
    
    })
    .catch(err => res.status(500).jsonp({erro: err}))
});

router.get('/api/casamentos/:id', function(req, res) {
  Casamento.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp({casamento:dados}))
    .catch(err => res.status(500).jsonp({erro: err}))
});

module.exports = router;
