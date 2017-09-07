import EmployeeTable from './EmployeeTable';

export default class FinancialTable extends EmployeeTable {

  getRoute(){ return '/api/employee/financial/'; }

}

