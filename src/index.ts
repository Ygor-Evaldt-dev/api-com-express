import server from "@/server";

import UserRoutes from "@/presentation/routes/UserRoutes";
import BaseRoute from "./presentation/routes/BaseRoute";

new BaseRoute(server);
new UserRoutes(server);