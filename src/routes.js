const { Router } = require("express");
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const AuthMiddleware = require("./app/middlewares/auth");

const ListaController = require("./app/controllers/ListaController");
const ItemController = require("./app/controllers/ItemController");
const CellUserController = require("./app/controllers/CellUserController");

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ msg: "API Compras" });
});

routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

routes.post("/cell/", CellUserController.store);
routes.get("/cells", CellUserController.index);

// Listas
routes.post("/lista/:cell_id", ListaController.store);
routes.get("/cell/listas", ListaController.index);
routes.get("/cell/:cell_id/listas", ListaController.index);
routes.put("/updatelista", ListaController.update);
routes.delete("/lista/:lista_id", ListaController.delete);
//routes.post('/lista', ListaController.store);

// Itens
routes.post("/lista/:lista_id/item", ItemController.store);
routes.get("/lista/:lista_id/itens", ItemController.index);
routes.put("/updateitem", ItemController.update);
routes.delete("/item/:item_id", ItemController.delete);

//routes.use(AuthMiddleware);
// User
routes.put("/user", UserController.update);
routes.get("/user", UserController.index);

//Test

// routes.get("/user", async (req, res) => {
//     const user = await User.create({
//         name: "Ronnildo",
//         email: 'ronildo@gmail.com',
//         password_hash: '123456'
//     });
//     res.json(user);
// });

module.exports = routes;
