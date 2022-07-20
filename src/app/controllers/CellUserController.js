const Yup = require('yup');

const { password } = require('../../config/database');
const Cell = require('../models/Cell');

class CellController{
    async index(req, res){
        const user = await Cell.findAll({
            attributes: ["id", "cell_id"]
        });
        return res.json({"data": user});
      }
    async store(req, res){
        const schema = Yup.object().shape({
            cell_id: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Campos inválidos"});
        }

        const { cell_id } = req.body;
        console.log(cell_id)
        const idExists = await Cell.findOne({where: {cell_id: cell_id}});
        console.log(idExists)
        if(idExists){
            return res.status(400).json({msg: "Usuário já existe"});
        }

        const cellUser = Cell.create({
            cell_id: cell_id
        });

        return res.status(200).json(cellUser);
    }
}

module.exports = new CellController();