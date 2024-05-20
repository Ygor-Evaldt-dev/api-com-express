import server from '@src/server';
import StartConfig from '@src/infra/routes/Start';

import UserMockRepository from '@src/infra/repositories/user/UserMockRepository';

import SaveUser from '@src/services/user/Save';

import DefaultRoute from '@src/infra/controllers/Default';
import SaveUserController from "@src/infra/controllers/user/Save";

// Add configurations on the server
new StartConfig(server);

// Setting default route
new DefaultRoute(server);


// Setting user routes - controllers
const userMockRepository = new UserMockRepository();
const saveUser = new SaveUser(userMockRepository);
new SaveUserController(server, saveUser);