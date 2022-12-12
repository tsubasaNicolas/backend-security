import app from "./app";
//import "./db";

app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
