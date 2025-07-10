import express, { Request, Response } from "express";
import resposta from "./ex003";
import { validarTarefa } from "./ex004";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/status", (req: Request, res: Response) => {
  res.json(resposta);
});

app.post("/tarefas", validarTarefa, (req, res) => {
  const { titulo } = req.body;
  res.status(201).json({ mensagem: `Tarefa '${titulo}' criada com sucesso.` });
});

app.get("/tarefas", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "pages", "form.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
