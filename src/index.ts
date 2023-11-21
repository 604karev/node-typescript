import app from "./server";
import path from "path";
import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();

app.listen(config.port, () => {
  console.log(`Server started on http://localhost:${config.port}`);
});
