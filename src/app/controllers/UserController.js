const User = require("../models/User");
const { password } = require('../../config/database');
const Yup = require("yup");
const Listas = require("../models/Lista");

class UserController {
  async index(req, res){
    const user = await User.findAll({
      attributes: ["name", "email"],
      include: [
        {
          model: Listas,
          as: "lista",
          attributes: ["mes"],
        },
      ],
    });
    return res.json(user);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ msg: "Campos inválidos" });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ msg: "Email já cadastrado!" });
    }
    const { id, name, email, password_hash } = await User.create(req.body);
    return res.json({ id, name, email, password_hash });
  }

  async update(req, res) {

    const esquema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      passwordAntigo: Yup.string().min(6),
      password_hash: Yup.string()
        .min(6)
        .when("passwordAntigo", (passwordAntigo, field) =>
          passwordAntigo ? field.required() : field
        ), //validação condicional
      confPassword: Yup.string().when("password_hash", (password_hash, field) =>
        password_hash ? field.required().oneOf([Yup.ref("password_hash")]) : field
      ), //validar o novo password
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "Campos invalidos" });
    }

    const { email, passwordAntigo } = req.body;
    const user = await User.findOne({where: {email}});

    console.log(user.email)

    if (email != user.email) {
      const existsUserEmail = await User.findOne({ where: { email } });
      if (existsUserEmail) {
        return res.status(400).json({ error: "old password not informed" });
      }
    }

    console.log(passwordAntigo);
    const password_hash = passwordAntigo;
    const pass = await User.findOne({ where: { password_hash } });

    if (!pass) {
      return res
        .status(400)
        .json({ error: "Old password different from the registered password" });
    }
    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

module.exports = new UserController();
