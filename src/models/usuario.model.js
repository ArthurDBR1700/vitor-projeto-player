import { conexao } from "../config/db.js";
import crypto from "crypto";

export async function listarUsuarios() {
    const [resultado] = await conexao.query(
        "SELECT id, nome, email, senha_hash, criado_em FROM usuarios"
    );
    return resultado;
}

export async function buscarUsuariosPorId(id) {
    const [resultado] = await conexao.query(
        "SELECT id, nome, email, senha_hash, criado_em FROM usuarios WHERE id = ?",
        [id]
    );
    return resultado[0];
}

export async function buscarUsuariosPorEmail(email) {
    const [resultado] = await conexao.query(
        "SELECT id, nome, email, senha_hash, criado_em FROM usuarios WHERE email = ?",
        [email]
    );
    return resultado[0];
}


export async function criarUsuario({ nome, email, senha_hash }) {
    const [resultado] = await conexao.query(
        `INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)`,
        [nome, email, senha_hash]
    );
    return resultado.insertId;
}