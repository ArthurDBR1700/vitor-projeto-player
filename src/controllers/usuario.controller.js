import crypto from "crypto";
import * as usuarioModel from "../models/usuario.model.js";

export async function listar(req,res) {
    const usuario = await usuarioModel.listarUsuarios();
    res.status(200).json(usuario);
}

export async function buscarPorId(req,res){
    const id = req.params.id;
    const usuario = await usuarioModel.buscarUsuariosPorId(id);
    
    if (!usuario){
        return res.status(404).json({msg: "Usuario nao encontrado"})
    }

    res.status(200).json(usuario)
}

export async function criar(req,res) {
    const {nome, email, senha} = req.body;

    if (!nome || !email || !senha){
        return res.status(400).json({msg:"Nome, email e senha é obrigatorio"})
    }

   const senha_hash = crypto
      .createHash("sha256")
      .update(senha)
      .digest("hex");

   const id = await usuarioModel.criarUsuario(
        {nome, email, senha_hash}
   )

   res.status(201).json({
        msg:"Usuario criado",
        id
   })
}

export async function login(req, res){

    const {email, senha} = req.body

    if(!email || !senha){
        return res.status(400).json({msg:"Email e senha sao obrigatorios"})
    }

    const usuario = await usuarioModel.buscarUsuariosPorEmail(email);

    if(!usuario){
        return res.status(401).json({msg:"Credenciais invalidas"})
    }

    const senha_hash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex");

    if(senha_hash !== usuario.senha_hash){
        return res.status(401).json({msg:"Credenciais invalidas"});
    }

    return res.status(200).json({
        msg:"Login realizado com sucesso",
        usuario :{
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
        }
    })
}