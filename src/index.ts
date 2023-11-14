import app from "./server";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const port = 3001;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
