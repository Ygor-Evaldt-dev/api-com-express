import server from "@/server";

import BaseRoute from "@/presentation/routes/BaseRoute";
import UserRoutes from "@/presentation/routes/UserRoutes";
import TaskRoutes from "./presentation/routes/TaskRoutes";

import JwtAdapter from "./infra/adapters/JwtAdapter";

const tokenProvider = new JwtAdapter(process.env.SECRET_TOKEN!);

new BaseRoute(server);
new UserRoutes(server, tokenProvider);
new TaskRoutes(server, tokenProvider);