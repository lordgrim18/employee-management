import express from "express";
// import employeeRouter from "./employee_router";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./loggerMiddleware";
import datasource from "./db/data-source";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee", employeeRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

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


