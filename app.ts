import express from "express";
// import employeeRouter from "./employee_router";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import { errorMiddleware } from "./middlewares/errorMidlleware";
import authRouter from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.route";


const server = express();
const logger = LoggerService.getInstance('app()');

server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee", authMiddleware, employeeRouter);
server.use("/department", authMiddleware, departmentRouter);
server.use("/auth", authRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

server.use(errorMiddleware);

(async () => {
  try {
    await datasource.initialize();
    logger.info('connected');
  } catch {
    logger.error('Failed to connect to DB');
    process.exit(1);
  }

    server.listen(3000, () => {
    logger.info("server listening to 3000");
  });
})();


