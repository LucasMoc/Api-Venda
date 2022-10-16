import productsRouter from '@modules/products/infra/http/routes/products.routes';
import passowrdRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passowrdRouter);
routes.use('/profile', profileRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev' });
});

export default routes;
