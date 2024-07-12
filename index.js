const express = require('express')
const banco = require("./banco")
const salario = require("./salario")
const funcionario = require("./funcionario")

const app = express()
app.use(express.json())

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

banco.conexao.sync( function(){
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen(PORTA, function(){
    console.log("Servidor iniciado na porta" + PORTA);
})

app.get("/funcionario/", async function(req,res){
    const resultado = await funcionario.funcionario.findAll()
    res.send(resultado)
})

app.get("/salario/",async function(req, res) {
    const resultado = await salario.salario.findAll()
    res.send(resultado);
})

app.get("/funcionario/:id",async function(req, res) {
    const funcSelecionado = await funcionario.funcionario.findByPk(req.params.id, 
        { include: { model: salario.salario } } 
    )
    console.log("teste")
    if( timeSelecionado == null ){
        res.status(404).send({})
    }else{
        res.send(funcSelecionado);
    }
})

app.get("/salario/:id",async function(req, res) {
    const salarioSelecionado = await salario.salario.findByPk(req.params.id,
        { include: {model: funcionario.funcionario } }
    )
    if( atletaSelecionado == null ){
        res.status(404).send({})
    }else{
        res.send(salarioSelecionado);
    } 
})

app.get("/salario/funcao/:funcao",async function(req, res) {
    const salariosSelecionados = await salario.salario.findAll({
        where: {funcao:req.params.funcao}
    }
    )
    if( salariosSelecionados == null ){
        res.status(404).send({})
    }else{
        res.send(salariosSelecionados);
    }
})

app.get("/funcionario/local/:carga_horaria",async function(req, res) {
    const funcionariosSelecionados = await funcionario.funcionario.findAll({
        where: {local:req.params.local}
    }
    )
    if( funcionariosSelecionados == null ){
        res.status(404).send({})
    }else{
        res.send(funcionariosSelecionados);
    }
})

app.post("/funcionario/",async function(req,res){
    const resultado = await funcionario.funcionario.create({
        nome:req.body.nome,
        idade:req.body.idade,
        carga_horaria:req.body.carga_horaria
    })
    res.send(resultado)
})

app.post("/salario/",async function(req,res){
    const resultado = await salario.salario.create({
        funcao:req.body.funcao,
        funcionarioId:req.body.funcionarioId,
        valor:req.body.valor
    })
    res.send(resultado)
})

app.put("/funcionario/:id",async function(req,res){
    const resultado = await funcionario.funcionario.update({
        nome:req.body.nome
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await funcionario.funcionario.findByPk(req.params.id))
    }
})

app.put("/salario/:id",async function(req,res){
    const resultado = await salario.salario.update({
        funcao:req.body.funcao,
        funcionarioId:req.body.funcionarioId,
        valor:req.body.valor
    },
    {
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await atleta.atleta.findByPk(req.params.id))
    }
})

app.delete("/funcionario/:id",async function(req,res){
    const resultado = await funcionario.funcionario.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})

app.delete("/sakario/:id",async function(req,res){
    const resultado = await salario.salario.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})