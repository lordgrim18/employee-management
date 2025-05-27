import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/empoyee.service";
import Employee from "../../entities/employee.entity";
import { CreateEmployeeDto } from "../../dto/create-employee.dto";
import DepartmentRepository from "../../repositories/department.repository";
import Department from "../../entities/department.entity";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
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

    let departmentRepository: MockProxy<DepartmentRepository>;

    beforeEach(() => {
        departmentRepository = mock<DepartmentRepository>();
    });

    it("should return values used to successfully create new employee ", async () => {
      const mockEmployeeDto = {
        name: "Employee 10",
        email: "employee10@email.com",
        password: "password",
        address: {
            line1: "22nd Baker street"
        },
        departmentId: 1
      } as CreateEmployeeDto;
      const mockDepartment = {
        id: 2,
        name: "Dept 2"
      } as Department;

      when(departmentRepository.findOneById)
        .calledWith(mockEmployeeDto.departmentId)
        .mockResolvedValue(mockDepartment);

      const expectedEmployee = {
        ...mockEmployeeDto,
        departmentId: mockDepartment.id,
        password: expect.any(String) // Since password is hashed
      };

      when(employeeRepository.create)
        .calledWith(expect.objectContaining({
          name: mockEmployeeDto.name,
          email: mockEmployeeDto.email,
          departmentId: mockDepartment.id
        }))
        .mockResolvedValue(expectedEmployee);

      const result = await employeeService.createEmployee(mockEmployeeDto);
      expect(result).toEqual(expectedEmployee);
      expect(employeeRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        name: mockEmployeeDto.name,
        email: mockEmployeeDto.email,
        departmentId: mockDepartment.id
      }));
    });

    // it("should throw error when user with provided email does not exist", async () => {
    //   const email = "employee10@email.com";
    //   when(employeeRepository.findByEmail).calledWith(email).mockReturnValue(null);
    //   const result = employeeService.getEmployeeByEmail(email);
    //   expect(result).rejects.toThrow("Employee not found");
    //   expect(employeeRepository.findByEmail).toHaveBeenCalledWith(email);
    // });

  })
});
