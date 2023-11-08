import app from "./server";
import path from "path";

const port = 3001;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
