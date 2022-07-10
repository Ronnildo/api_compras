const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const AuthMiddleware = require('./app/middlewares/auth');

const ListaController = require('./app/controllers/ListaController');
const ItemController = require('./app/controllers/ItemController');


const routes =  new Router();

routes.get('/', (req, res) => {
    return res.json({msg: 'API Compras'});
});



routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(AuthMiddleware);

// User
routes.put('/user', UserController.update);
routes.get('/user', UserController.index)

//Test

// Listas
routes.get('/lista/:lista_id', ListaController.index);
routes.post('/lista', ListaController.store);
routes.put('/lista', ListaController.update);
routes.delete('/lista/:id', ListaController.delete);

// Itens
routes.post('/lista/:lista_id/item', ItemController.store);
routes.put('/item', ItemController.update);
routes.delete('/item/:id', ItemController.delete);
routes.get('/lista/:lista_id/item', ItemController.index);



// routes.get("/user", async (req, res) => {
//     const user = await User.create({
//         name: "Ronnildo",
//         email: 'ronildo@gmail.com',
//         password_hash: '123456'
//     });
//     res.json(user);
// });

module.exports  =  routes;