const sequelize = require('sequelize')
const banco = require("./banco")

var salario = banco.conexao.define(
    "salario",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        funcao:{
            type:sequelize.STRING,
            allowNull: false
        },
        valor:{
            type:sequelize.DOUBLE,
            
        }
    },
    {timestamps: false}
);

module.exports(salario)