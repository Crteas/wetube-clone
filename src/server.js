import express from "express"; //node_modules 에서 express찾고있어요!!

const PORT = 9000;

const app = express(); //Creates an Express application

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
