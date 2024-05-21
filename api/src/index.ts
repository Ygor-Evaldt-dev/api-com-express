import server from '@src/server';
import StartConfig from '@src/infra/routes/Start';

import UserLocalRepository from '@src/infra/repositories/user/UserLocalRepository';

import SaveUser from '@src/core/services/user/Save';

import DefaultRoute from '@src/infra/controllers/Default';
import SaveUserController from "@src/infra/controllers/user/Save";

// Add configurations on the server
new StartConfig(server);

// Setting default route
new DefaultRoute(server);

// Setting user routes - controllers
const userLocalRepository = new UserLocalRepository();
const saveUser = new SaveUser(userLocalRepository);
new SaveUserController(server, saveUser);