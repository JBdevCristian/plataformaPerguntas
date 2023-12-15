const express = require("express"); //importando express
const app = express(); //iniciando express
const bodyParser = require("body-parser"); //Definindo bodyParser - utilizado para o armazenamento de dados de forms em HTML
const connection = require("./database/database"); //exportando banco
const Pergunta = require("./database/Pergunta"); //importando criação de tabela Pergunta
const Resposta = require("./database/Resposta"); //importando criação de tabela Resposta

const { where } = require("sequelize");

//database
connection
    .authenticate()
    .then(() => { //Caso o banco se conecte
        console.log('conexão feita com o banco');
    })
    .catch((msgErro) => {
        console.log('Erro');
    })

app.set('view engine', 'ejs'); //Chamando o Emulador de HTML
app.use(express.static('public')); //Definindo arquivos staticos (arquivos não processados pelo back-end)

//BodyParser 
app.use(bodyParser.urlencoded({extended: false})) //Decodificar o form
app.use(bodyParser.json()); //Ler dados de formulario via JSON 

//Rotas
app.get("/", (req, res) => { //Rota principal
    Pergunta.findAll({raw: true, order:[
        ['id','DESC'] //Ordenando do maior para o menor - DESC = Decrescente - ASC = Crescente
    ]}).then(perguntas => { //SELECT * PERGUNTAS (MYSQL)
        res.render("index",{ //Emulando o HTML no express
            perguntas: perguntas
        }); 
    }); 
});

app.get("/perguntar", (req, res) => { //Rota para realizar perguntas
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({ //salvando dados no formulario e encaminhado para o BANCO
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});


app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {

        if (pergunta != undefined) { //Encontrando pergunta

            Resposta.findAll({ //localizando perguntas
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']] //ordenando perguntas
            }).then(resposta => {

                res.render("pergunta", {
                    pergunta: pergunta, //localizando peguntas na view na parte de pergunta
                    respostas: resposta //localizando respostas na view na parte de respostas
                });
            })
        } else {
            res.redirect("/"); //Caso não encontra pergunta
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    if (corpo != "") {

        Resposta.create({  
            corpo: corpo,
            perguntaId: perguntaId
    
        }).then(() => {
            res.redirect("/pergunta/" + perguntaId) 
            
        });

    } else {
        res.redirect("/pergunta/" + perguntaId)
    }



});

app.listen(8080,()=> {console.log("App Rodando!");});