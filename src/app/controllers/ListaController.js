const Lista = require('../models/Lista');
const User = require('../models/User');

const { password } = require('../../config/database');
const Yup = require("yup");

class ListaController{
    async index(req, res){
        const user = await User.findByPk(req.userId, {
            include: {
                association: 'user',
            }
        });

        const {lista_id} = req.params;

        const listas = await Lista.findByPk(lista_id,{
            include:{
                association: 'lista'
            }
        })
       
        return res.json({user, listas});
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

        const userCad = await User.findOne({
            where: {
                id: req.userId,
            }
        });
        
        if(!userCad){
            return res.status(401).json({msg: "Usuário não cadastrado!"});
        }
        
        //console.log(req.userId)
        const existsMes  = await Lista.findOne({where: {mes: mes} });
        if(existsMes){
            return res.status(400).json({msg: "Você já possui uma lista para esse mês!"});
        }

        const lista = await Lista.create({
            user_id: req.userId,
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