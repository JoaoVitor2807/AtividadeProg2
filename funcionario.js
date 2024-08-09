const sequelize = require('sequelize')
const banco = require("./banco")
const { salario } = require('./salario');

var funcionario = banco.conexao.define(
    "funcionario",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        nome:{
            type:sequelize.STRING,
            allowNull:false
        },
        idade:{
            type:sequelize.INTEGER.UNSIGNED,
        },
        carga_horaria:{
            type:sequelize.INTEGER.UNSIGNED
        }
    },
    {timestamps: false}
);

module.exports = {funcionario}