import { instanceToInstance } from 'class-transformer';
import { Request, Response } from "express";
import { CreateSassionsService } from "../services/CreateSassionsService";

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSassionsService();

    const user = await createSession.execute({
      email,
      password
    });

    return res.json(instanceToInstance(user))
  };
};
