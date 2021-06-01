const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://admin:u5KgF5xvB.hApaK@cluster0.tu1et.mongodb.net/produtos_db?retryWrites=true&w=majority";
mongoose.connect(mongoUri,{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('open', () => {
    console.log('conexão realizada')
})

const ProdutoSchema = new mongoose.Schema({
    nome:String,
    marca:String,
    quantidade:Number
});

//Collection
const produtoModel = mongoose.model('produtos', ProdutoSchema);
module.exports = produtoModel;