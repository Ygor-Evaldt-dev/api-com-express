import server from '@src/server';
import StartConfig from '@src/infra/routes/Start';

import UserMockRepository from '@src/infra/repositories/user/UserMockRepository';

import DefaultRoute from '@src/infra/controllers/Default';
import SaveUser from '@src/services/user/Save';

// Add configurations on the server
new StartConfig(server);

// Setting default route
new DefaultRoute(server);


// Setting user routes
const userMockRepository = new UserMockRepository();
new SaveUser(userMockRepository);