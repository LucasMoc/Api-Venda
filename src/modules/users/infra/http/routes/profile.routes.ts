import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      newPassword: Joi.string(),
      confirmedNewPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .when('newPassword', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    }
  }),
  profileController.update);




export default profileRouter;
