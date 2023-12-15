const Sequelize = require('sequelize');
const connection = require("./database");

//definindo model - Criando tabela utilizando SEQUELIZE
const Pergunta = connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING, //STRING para textos pequenos
        allowNull: false // false utilizado para não salvar informações vazias
    },
    descricao:{
        type: Sequelize.TEXT, //TEXT para textos grandes
        allowNull: false // false utilizado para não salvar informações vazias
    }
});

//sincronizando/forçando caso não exista banco de dados
Pergunta.sync({force: false}).then(() => { //force: false - para caso exista uma tabela com as mesmas informações não criar novamente
    console.log('Tabela Criada');
}); 

module.exports = Pergunta;
