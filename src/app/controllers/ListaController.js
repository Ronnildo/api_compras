const Lista = require('../models/Lista');
const User = require('../models/User');
const Item = require('../models/Item');

const { password } = require('../../config/database');
const Yup = require("yup");
const Cell = require('../models/Cell');

class ListaController{
    async index(req, res){
        const {cell_id} = req.params;
        const cellExists = await Cell.findOne({where: {cell_id: cell_id}});

        const cell = await Cell.findByPk(cellExists.id, {
            attributes: ['id', 'cell_id'],
            include: {
                association: 'listas',
                attributes: ["id", "mes", "cell_id"]
            },  
        });
       
        return res.json(cell);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            mes: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: 'Campos inválidos'});
        }
        
        const {cell_id} = req.params;
        const cellExists = await Cell.findOne({where: {cell_id: cell_id}}, {
            attributes: ["id", "nameItem", "category"]
        });

        if(!cellExists){
            return res.status(401).json({msg: "Usuário não cadastrado!"});
        }
        
        const { mes } = req.body;
        const lista = await Lista.create({
            //user_id: req.userId,
            cell_id: cellExists.id,
            mes: mes,
        });

        return res.json(lista);
    }

    async update(req, res){
        const schema = Yup.object().shape({
            mesPass: Yup.string().required(),
            mes: Yup.string().required().when("mesPass", (mesPass, field) => 
                mesPass ? field.required() : field
            ),
            confMes: Yup.string().when("mes", (mes, field) => 
            mes ? field.required().oneOf([Yup.ref("mes")]): field)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Campos inválidos"});
        }

        const lista = await Lista.findOne({where: {mes: req.body.mesPass} });

        console.log(lista)

        if(!lista){
            return res.status(400).json({msg: "Lista para o mês não existe!"});
        }

        const { id, mes  } = await lista.update(req.body);

        return res.status(200).json({id, mes});
    }

    async delete(req, res){
        const { lista_id } = req.params;
        const lista = await Lista.findByPk(lista_id);
        console.log(lista);
        if(!lista){
            return res.status(401).json({msg: "Lista não existe!"});
        }

        const { mes } = await lista.destroy();
        return res.status(200).json(mes);
    }
}

module.exports = new ListaController();