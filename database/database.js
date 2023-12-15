const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '23268265', { // definindo conexão junto ao mysql const connection = new Sequelize*('NomeDaLista', 'Usuario', 'senha da lista')
    host: 'localhost', //Qual IP
    dialect: 'mysql' // Qual tipo de banco 
});


module.exports = connection; //exportando conexão