import Router from "express";
import userRouter from "./user/user.mjs";

const mainRouter = Router();

mainRouter.use(userRouter)



export default mainRouter;
