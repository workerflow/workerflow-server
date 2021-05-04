import "./common/env";
import "./common/database";

import routes from "./routes";
import Server from "./common/server";

const port = parseInt(process.env.PORT ?? "3001");

export default new Server().router(routes).listen(port);
