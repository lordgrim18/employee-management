import express from "express";
// import employeeRouter from "./employee_router";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import { errorMiddleware } from "./middlewares/errorMidlleware";
import authRouter from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee", authMiddleware, employeeRouter);
server.use("/auth", authRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

server.use(errorMiddleware);

(async () => {
  try {
    await datasource.initialize();
    console.log('connected');
  } catch {
    console.error('Failed to connect to DB');
    process.exit(1);
  }

    server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();


