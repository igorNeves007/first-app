var express = require('express');
var router = express.Router();
const app = express();

const expressLayouts = require("express-ejs-layouts");
router.use(express.static('public'));



router.get('/', (req, res) => {
  res.render('pages/home.ejs');
  console.log("Acessou a home");
});

router.get('/about', (req, res) => {
  res.render('pages/about');
  console.log("Acessou o Sobre");
});

router.get('/cadastro', (req, res) => {
  res.render('pages/cadastro', { users: users });
  console.log("Acessou o Cadastro");
});

router.post('/cadastro/update', (req, res) => {
  users[req.body.id].name = req.body.name;
  users[req.body.id].email = req.body.email;
  users[req.body.id].address = req.body.address;
  users[req.body.id].age = req.body.age;
  users[req.body.id].height = req.body.height;
  users[req.body.id].vote = req.body.vote;

  console.log("Dados recebidos: ", req.body);
  console.log("Atualizou um cadastro");
});

router.get('/list', (req, res) => {
  res.render('pages/list');
});

router.get('/listagem', (req,res) => {

  res.json(users);

});

router.post('/cadastro/add',(req,res)=>{
  let user={name:"",email:"",address:"",height:"",age:"",vote:""};

  user.name = req.body._name;
  user.email = req.body._email;
  user.address = req.body._address;
  user.height = req.body._height;
  user.age = req.body._age;
  user.vote = req.body._vote;

  users.push(user);
  console.log("Usuário cadastrado: ",user);
  console.log("Lista dos usuários: ",users)
  console.log("Adicionou um usuário");
});

router.post('/cadastro/remove',(req,res)=>{
  let name = req.body.name;
  console.log("Removeu um usuário");
  if(users.length==0){
      console.log("Erro: Não há elemento a ser removido!");
      return res.status(400).json({
          status:'error',
          error:`Removed element: ${name}`
      });

  } else {
      for(let cont=0;cont<users.length;cont++){
          if(users[cont].name==name){
              users.splice(cont,1);
              console.log("Elemento Removido: ",name);
              return res.status(200).json({
                  status:'sucess',
                  data:users
              });
          } else if(cont==users.length-1){
              console.log("Erro ao remover elemento: ",name);
              return res.status(400).json({
                  status:'error',
                  error:`Removed element: ${name}`
              });
          }
      }
  }
});

module.exports = router;