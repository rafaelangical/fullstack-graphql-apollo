import mongoose from "mongoose";

const url = "mongodb://localhost:27017/server-full";

mongoose.connect( url, { useNewUrlParser: true }
);

mongoose.connection.on("error", () => {
  console.log("Erro na conexão do mongo");
});
