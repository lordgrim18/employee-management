import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";

import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/empoyee.service";
import Employee, { EmployeeRole, STATUS } from "../../entities/employee.entity";
import { CreateEmployeeDto } from "../../dto/create-employee.dto";
import DepartmentRepository from "../../repositories/department.repository";
import Department from "../../entities/department.entity";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let departmentRepository: MockProxy<DepartmentRepository>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    departmentRepository = mock<DepartmentRepository>();
    employeeService = new EmployeeService(employeeRepository, departmentRepository);
  });

  describe("getEmployeeById", () => {
    it("should return value when user with proper id exists", async () => {
      const mockEmployee = {
        id: 3,
        name: "Employee 10",
      } as Employee;
      const id = 3;
      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockReturnValue(mockEmployee);
      const result = await employeeService.getEmployeeById(id);
      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepository.findOneById).toHaveBeenCalled();
    });

    it("should throw error when user with provided id does not exist", async () => {
      const id = 3;
      when(employeeRepository.findOneById).calledWith(id).mockReturnValue(null);
      const result = employeeService.getEmployeeById(id);
      expect(result).rejects.toThrow("Employee not found");
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe("getAllEmployees", () => {
    
    it("should return the list of all employees present", async () => {
      const mockEmployeeList = [
        {
          id: 3,
          name: "Employee 10",
        },
        {
            id: 4,
            name: "Employee 3"
        }
      ];
      when(employeeRepository.findMany)
        .calledWith()
        .mockReturnValue(mockEmployeeList);
      const result = await employeeService.getAllEmployees();
      expect(result).toStrictEqual(mockEmployeeList);
      expect(employeeRepository.findMany).toHaveBeenCalled();
    });

    it("should return the empty list if no employees are present", async () => {
      when(employeeRepository.findMany)
        .calledWith()
        .mockReturnValue([]);
      const result = await employeeService.getAllEmployees();
      expect(result).toStrictEqual([]);
      expect(employeeRepository.findMany).toHaveBeenCalled();
    });

  });

  describe("getEmployeeByEmail", () => {

    it("should return value when user with email exists", async () => {
      const mockEmployee = {
        id: 3,
        name: "Employee 10",
        email: "employee10@email.com"
      } as Employee;
      const email = "employee10@email.com";
      when(employeeRepository.findByEmail)
        .calledWith(email)
        .mockReturnValue(mockEmployee);
      const result = await employeeService.getEmployeeByEmail(email);
      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it("should throw error when user with provided email does not exist", async () => {
      const email = "employee10@email.com";
      when(employeeRepository.findByEmail).calledWith(email).mockReturnValue(null);
      const result = employeeService.getEmployeeByEmail(email);
      expect(result).rejects.toThrow("Employee not found");
      expect(employeeRepository.findByEmail).toHaveBeenCalledWith(email);
    });

  })

  describe("createEmployee", () => {

    const mockEmployeeDto = {
        name: "Employee 10",
        email: "employee10@email.com",
        age: 34,
        role: EmployeeRole.HR,
        dateOfJoining: "2022-01-01",
        experience: 3,
        status: STATUS.ACTIVE,
        password: "password",
        address: {
            line1: "22nd Baker street",
            line2: "Bitsbrough",
            houseNo: "22A",
            pincode: "786756"
        },
        departmentId: 2
      } as CreateEmployeeDto;
    
    const mockDepartment = {
        id: 2,
        name: "Dept 2"
      } as Department;


    const mockEmployeeResponse = {
        id: 1,
        ...mockEmployeeDto
      };

    it("should return values used to successfully create new employee ", async () => {
      
      when(departmentRepository.findOneById)
        .calledWith(mockEmployeeDto.departmentId)
        .mockResolvedValue(mockDepartment);

      when(employeeRepository.create)
        .calledWith(expect.any(Employee))
        .mockResolvedValue(mockEmployeeResponse);

      const result = await employeeService.createEmployee(mockEmployeeDto);
      expect(result).toEqual(mockEmployeeResponse);
      expect(employeeRepository.create).toHaveBeenCalled();
      expect(departmentRepository.findOneById).toHaveBeenCalled();
    });

    it("should throw error when department Id provided does not exist", async () => {
      when(departmentRepository.findOneById)
        .calledWith(mockEmployeeDto.departmentId)
        .mockResolvedValue();

      const result = employeeService.createEmployee(mockEmployeeDto);
      expect(result).rejects.toThrow("Department not found");
      expect(employeeRepository.create).not.toHaveBeenCalled();
    });

  })

  describe("updateEmployee", () => {

    const id = 3;

    const mockEmployeeDto = {
        name: "Employee 10",
        email: "employee10@email.com",
        age: 34,
        role: EmployeeRole.HR,
        dateOfJoining: "2022-01-01",
        experience: 3,
        status: STATUS.ACTIVE,
        address: {
            line1: "22nd Baker street",
            line2: "Bitsbrough",
            houseNo: "22A",
            pincode: "786756"
        },
        departmentId: 2
      } as CreateEmployeeDto;
      
    const mockDepartment = {
        id: 2,
        name: "Dept 2"
      } as Department;



    it("should return null when successfully update existing employee ", async () => {

      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockResolvedValue(mockEmployeeDto)
      
      when(departmentRepository.findOneById)
        .calledWith(mockEmployeeDto.departmentId)
        .mockResolvedValue(mockDepartment);

      when(employeeRepository.update)
        .calledWith(mockEmployeeDto)
        .mockResolvedValue();

      const result = await employeeService.updateEmployee(id, mockEmployeeDto);
      expect(result).not;
      expect(employeeRepository.update).toHaveBeenCalled();
      expect(departmentRepository.findOneById).toHaveBeenCalledWith(mockEmployeeDto.departmentId);
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);
    });

    it("should throw error when empliyee id provided does not exist", async () => {
      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockResolvedValue()

      const result = employeeService.updateEmployee(id, mockEmployeeDto);
      expect(result).rejects.toThrow("Employee not found");
      expect(employeeRepository.update).not.toHaveBeenCalled();
    });


    it("should throw error when department Id provided does not exist", async () => {
      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockResolvedValue(mockEmployeeDto)

      when(departmentRepository.findOneById)
        .calledWith(mockEmployeeDto.departmentId)
        .mockResolvedValue();

      const result = employeeService.updateEmployee(id, mockEmployeeDto);
      expect(result).rejects.toThrow("Department not found");
      expect(employeeRepository.update).not.toHaveBeenCalled();
    });

  })

  describe("deleteEmployee", () => {
    it("should successfully delete a user if it exists", async () => {
      const id = 3;
      const mockEmployeeReturn = {
        id,
        name: "John"
      }
      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockReturnValue(mockEmployeeReturn);

      when(employeeRepository.delete)
        .calledWith(mockEmployeeReturn)
        .mockReturnValue();

      const result = await employeeService.deleteEmployee(id);
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);
      expect(employeeRepository.delete).toHaveBeenCalledWith(mockEmployeeReturn);
    });

    it("should throw error when user with provided id does not exist", async () => {
      const id = 3;
      when(employeeRepository.findOneById).calledWith(id).mockReturnValue(null);
      const result = employeeService.deleteEmployee(id);
      expect(result).rejects.toThrow("Employee not found");
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);
      expect(employeeRepository.delete).not.toHaveBeenCalled();
    });
  });
  
});
