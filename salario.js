const sequelize = require('sequelize')
const banco = require("./banco");
const { funcionario } = require('./funcionario');

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

salario.hasMany(funcionario.funcionario)
funcionario.funcionario.belongsTo(salario)

module.exports = {salario}