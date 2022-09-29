import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    usersController.show
);

usersRouter.post(
    '/',
    usersController.create
);

usersRouter.delete(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    usersController.delete
);

export default usersRouter;