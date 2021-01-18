var mongoose = require('mongoose')
var Casamento = require('../models/casamento')

module.exports.listAll = () => {
    return Casamento.find()
        .exec()
}

module.exports.listByAno = () => {
    return Casamento.find()
        .sort('date')
        .exec()
}

module.exports.list = () => {
    return Casamento.find()
        .select({ "date": 1, "title":1,"_id": 1})
        .exec()
}

module.exports.listYear = (ano) => {
    return Casamento.find({date:ano})
        .exec()
}

module.exports.lookUp = id => {
    return Casamento.findOne({ _id: id }).exec()
}

module.exports.insert = c => {
    var newCasamento = new User(c)
    return newCasamento.save()
}

module.exports.remove = id => {
    return Casamento.deleteOne({ _id: id })
}

module.exports.edit = (id, c) => {
    return Casamento.findByIdAndUpdate(id, c, { new: true })
}