const sequelize = require('sequelize')
const banco = require("./banco")

var salario = banco.conexao.define(
    "salario",
    {
        
    },
    {timestamps: false}
);

module.exports(salario)