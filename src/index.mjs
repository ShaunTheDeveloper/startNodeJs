import express from "express";
import mainRouter from "./router/main.mjs";




const app = express();

app.listen(3000,()=>{
    console.log("server is running")
})


app.use(mainRouter);
app.use(express.json());






