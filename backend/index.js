const express = require('express')
const app = express()
const port = 3000

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const produtoModel = require('./model/Produto');

// const produto = new produtoModel({
//     nome:'teste',
//     marca:'test',
//     quantidade:123
// })

// produto.save().then(()=> {
//     console.log('salvou')
// }).
// catch((err) => console.warn(err))

//Listagem de proudtos
app.get('/produtos', (req, res) => {
    produtoModel.find({}).then(produtos=>res.json(produtos))
})

app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;
    produtoModel.findOne({_id:id}).then(produto=>res.json(produto))
})

app.get('/produtos/pesquisar/:nomeProduto', (req, res) => {
    const nomeProduto = req.params.nomeProduto;
    produtoModel.find({nome: {$regex: nomeProduto, $options: 'i'}}).then(produto=>res.json(produto))
})


app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;
    produtoModel.deleteOne({_id:id})
    .then(produto=>res.json(id))
    .catch((err)=> {
        res.json({sucesso:false})
    })
})


app.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    console.log('update de produto', req.body);
    produtoModel.findOneAndUpdate({_id:id}, req.body,{upsert: true})
    .then(produto=>res.json({sucesso:true}))
    .catch((err)=> {
        res.json({sucesso:false})
    })
})

app.post('/produtos', (req, res) => {

    console.log(req.body);
    
    const produto = new produtoModel(req.body);

    produto.save().then((resultProduto)=> {        
        res.json({sucesso:true})
    }).
    catch((err) => res.json({sucesso:false}))

   
})
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})