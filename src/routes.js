const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const AuthMiddleware = require('./app/middlewares/auth');

const ListaController = require('./app/controllers/ListaController');
const ItemController = require('./app/controllers/ItemController');
const CellUserController = require('./app/controllers/CellUserController');


const routes =  new Router();

routes.get('/', (req, res) => {
    return res.json({msg: 'API Compras'});
});


routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.post('/cell', CellUserController.store);
routes.get('/cells', CellUserController.index);

// Listas
routes.post('/cell/:cell_id/lista', ListaController.store);
routes.get('/cell/:cell_id/lista/:lista_id/listas', ListaController.index);
routes.put('/lista', ListaController.update);
routes.delete('/lista/:id', ListaController.delete);
//routes.post('/lista', ListaController.store);

// Itens
routes.post('/lista/:lista_id/item', ItemController.store);
routes.get('/lista/:lista_id/itens', ItemController.index);
routes.put('/item', ItemController.update);
routes.delete('/item/:id', ItemController.delete);


routes.use(AuthMiddleware);
// User
routes.put('/user', UserController.update);
routes.get('/user', UserController.index)

//Test





// routes.get("/user", async (req, res) => {
//     const user = await User.create({
//         name: "Ronnildo",
//         email: 'ronildo@gmail.com',
//         password_hash: '123456'
//     });
//     res.json(user);
// });

module.exports  =  routes;