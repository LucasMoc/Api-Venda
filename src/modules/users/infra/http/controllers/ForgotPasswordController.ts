import { Request, Response } from "express";
import SendForgotPassowordEmailService from "../../../services/SendForgotPassowordEmailService";

export default class ForgotPasswordController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;


    const sendForgotPassowordEmail = new SendForgotPassowordEmailService();

    await sendForgotPassowordEmail.execute({ email });

    return res.status(204).json();
  }
}
