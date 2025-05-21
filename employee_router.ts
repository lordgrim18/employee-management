import express from "express";
import datasource from "./data-source";
import { Entity } from "typeorm";
import Employee from "./employee.entity";

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees)

});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id: empId});
  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  const newEmployee = new Employee();
  newEmployee.name = req.body.name;
  newEmployee.email = req.body.email;
  const employeeRepository = datasource.getRepository(Employee);
  const employeeResponse = await employeeRepository.save(newEmployee);
  res.status(201).send({
    message: "Employee created successfully",
    data: employeeResponse
  });

});

employeeRouter.delete("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id: empId});
  const deleteResponse = await employeeRepository.remove(employee);
  res.status(200).send({
    message: "Employee deleted successfully",
    data: deleteResponse
  });

});

employeeRouter.put("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id: empId});
  employee.name = req.body.name;
  employee.email = req.body.email;
  await employeeRepository.save(employee);
  res.status(200).send({
    message: "Employee updated successfully",
  });
});

employeeRouter.patch("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  await employeeRepository.update(empId, {name: req.body.name, email: req.body.email});
  res.status(200).send({
    message: "Employee updated successfully",
  });
});

export default employeeRouter;