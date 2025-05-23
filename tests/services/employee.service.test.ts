import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';
import EmployeeRepository from "../../repositories/employee.repository"
import EmployeeService from "../../services/empoyee.service"
import Employee from '../../entities/employee.entity';

describe('EmployeeService', () => {
    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;

    beforeEach(() => {
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeService(employeeRepository);
    });

    describe('getEmployeeById', () => {

        it('should return value when user with proper id exists', async () => {
            const mockEmployee = {
                id: 3,
                name: "Employee 10",
            } as Employee;
            const id = 3;
            when(employeeRepository.findOneById).calledWith(id).mockReturnValue(mockEmployee)
            const result = await employeeService.getEmployeeById(id);
            expect(result).toStrictEqual(mockEmployee);
            expect(employeeRepository.findOneById).toHaveBeenCalled();
        });

        it('should throw error when user with provided id does not exist', async () => {
            const id = 3;
            when(employeeRepository.findOneById).calledWith(id).mockReturnValue(null);
            const result = employeeService.getEmployeeById(id);
            expect(result).rejects.toThrow("Employee not found");
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);

        })

    })
})