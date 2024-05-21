import server from '@src/server';
import StartConfig from '@src/application/routes/Start';

import UserLocalRepository from '@src/infra/repositories/user/UserLocalRepository';

import SaveUser from '@src/core/services/user/Save';

import DefaultRoute from '@src/application/controllers/Default';
import SaveUserController from "@src/application/controllers/user/Save";
import BcryptAdapter from './infra/adapters/BcryptAdapter';

const bcrypt = new BcryptAdapter();

// Add configurations on the server
new StartConfig(server);

// Setting default route
new DefaultRoute(server);

// Setting user routes - controllers
const userLocalRepository = new UserLocalRepository();
const saveUser = new SaveUser(userLocalRepository, bcrypt);
new SaveUserController(server, saveUser);