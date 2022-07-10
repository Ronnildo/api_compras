const Item = require('../models/Item');
const User = require('../models/User');
const { password } = require('../../config/database');
const Yup = require("yup");
const Listas = require('../models/Lista');

class ItemController{
    async index(req, res){

        const {lista_id} = req.params;

        const listas = await Listas.findByPk(lista_id,{
            include:{
                association: 'lista'
            }
        })

        return res.json(listas);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            nameItem: Yup.string().required(),
            category: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Campos inválidos"});
        }
        const  { lista_id } = req.params;
        console.log(lista_id)

        const {nameItem, category} = req.body;

        const listExist = await Listas.findByPk(lista_id);
        if(!listExist){
            return res.status(401).json({msg: "Lista não existe!"});
        }

        const item = await Item.create({
            lista_id: lista_id,
            nameItem: nameItem,
            category: category,
        });
        return res.status(200).json(item);
    }

    async update(req, res){
        const schema = Yup.object().shape(
            {
                nameItemPass: Yup.string().required(),
                nameItem: Yup.string().required()
                .when("nameItemPass", (nameItemPass, field) => 
                nameItemPass ? field.required(): field),
                confNovoName: Yup.string()
                .when("nameItem", (nameItem, field) => 
                nameItem ? field.required().oneOf([Yup.ref('nameItem')]): field),
                category: Yup.string(),
            }
        );
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Campos Inválidos"});
        }

        const { nameItemPass, category } = await req.body;
        const item = await Item.findOne({where: {category}});

        console.log(nameItemPass);
        
        if(nameItemPass != item.nameItem){
            return res.status(401).json({msg: "Nome do item diferente do cadastrado!"});
        }

        const { id, nameItem } = await item.update(req.body);

        return res.status(200).json({id, nameItem});
    }

    async delete(req, res){
        const item = await Item.findByPk(req.params.id);

        if(!item){
            return res.status(401).json({msg: "Item inválido"});
        }

        console.log(item);

        const { nameItem } = await item.destroy();

        return res.status(200).json({msg: "Item excluído!"});
    }
}

module.exports = new ItemController(); ;
 