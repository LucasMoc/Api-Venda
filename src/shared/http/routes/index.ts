import productsRouter from '@modules/products/routes/products.routes';
import passowrdRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
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