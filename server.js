const mongoose = require("mongoose");

const app = require("./app");

const { DB_USER, DB_PASSWORD, DB_NAME, PORT = 3000 } = process.env;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dzea1xv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
