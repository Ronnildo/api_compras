const User = require("../models/User");
const authConfig = require('../../config/auth');
const jwt = require("jsonwebtoken");
const Yup = require("yup");


class SessionController {
  async store(req, res) {

    const esquema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    
    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: "Campos invalidos" });
    }
    
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: "Usuário não existe" });
    }

    const pass = await User.findOne({where: {password_hash: password}});

    if(!pass){
      return res.status(401).json({error : "Password errado"});
    }
    

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.dataLimite,
      }),
    });
  }
}

module.exports = new SessionController();
