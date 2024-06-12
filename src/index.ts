import server from "@/server";

import BaseRoute from "@/presentation/routes/BaseRoute";
import UserRoutes from "@/presentation/routes/UserRoutes";
import TaskRoutes from "./presentation/routes/TaskRoutes";

new BaseRoute(server);
new UserRoutes(server);
new TaskRoutes(server);