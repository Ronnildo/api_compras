const Lista = require('../models/Lista');
const User = require('../models/User');
const Item = require('../models/Item');

const { password } = require('../../config/database');
const Yup = require("yup");
const Cell = require('../models/Cell');

class ListaController{
    async index(req, res){
        const user = await User.findByPk(req.userId, {
            include: {
                association: 'user',
            }
        });

        const {lista_id, cell_id} = req.params;

        const cell = await Cell.findByPk(cell_id, {
            attributes: ['id', 'cell_id'],
            include: {
                association: 'listas',
            },  
        });

        // const itens = await Lista.findByPk(lista_id,{
        //     attributes: ['id', 'mes'],
        //     include:{
        //         association: 'itens'
        //     }
        // })
       
        return res.json({cell});
    }

    async store(req, res){

        const schema = Yup.object().shape({
            mes: Yup.string().required(),
            //usuario_id: Yup.number().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: 'Campos inválidos'});
        }

        const { mes } = req.body;

        const {cell_id} = req.params;
        console.log(cell_id)
        const cellExists = await Cell.findOne({where: {id: cell_id}});
        console.log(cellExists)
        if(!cellExists){
            return res.status(401).json({msg: "Usuário não cadastrado!"});
        }

        // const userCad = await User.findOne({
        //     where: {
        //         id: req.userId,
        //     }
        // });
        
        // if(!userCad){
        //     return res.status(401).json({msg: "Usuário não cadastrado!"});
        // }
        
        //console.log(req.userId)
        const existsMes  = await Lista.findOne({where: {mes: mes} });
        if(existsMes){
            return res.status(400).json({msg: "Você já possui uma lista para esse mês!"});
        }

        const lista = await Lista.create({
            //user_id: req.userId,
            cell_id: cell_id,
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
        const lista = await Lista.findByPk(req.params.id);
        console.log(lista);
        if(!lista){
            return res.status(401).json({msg: "Lista não existe!"});
        }

        const { mes } = await lista.destroy();
        return res.json({msg: "Lista excluida!"});
    }
}

module.exports = new ListaController();