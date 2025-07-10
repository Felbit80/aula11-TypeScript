import { Request, Response, NextFunction } from "express";

export function validarTarefa(req: Request, res: Response, next: NextFunction) {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ erro: "O campo 'titulo' é obrigatório e deve ser uma string não vazia." });
  }

  next();
}