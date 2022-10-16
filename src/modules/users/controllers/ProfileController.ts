import { Request, Response } from "express";
import { ShowProfileService } from "../services/ShowProfileService";
import { UpdateProfileService } from "../services/UpdateProfileService";
import { instanceToInstance } from 'class-transformer'

export default class ProfileController {

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ user_id });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, newPassword } = req.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({ user_id, name, email, password, newPassword });

    return res.json(instanceToInstance(user));
  }

}
