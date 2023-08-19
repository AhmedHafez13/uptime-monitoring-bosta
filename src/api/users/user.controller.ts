import { Request, Response } from 'express';
import UserModel from './user.model';

const UserController = {
  signup: async (req: Request, res: Response) => {
    // Handle user signup logic here
    res.send({data: 'user/signup is working!'});
  },
  login: async (req: Request, res: Response) => {
    // Handle user login logic here
    res.send({data: 'user/login is working!'});
  },
};

export default UserController;
