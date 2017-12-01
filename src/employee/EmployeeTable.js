
import React from 'react';
import {Toolbar} from 'react-data-grid-addons';
import GridTable from '../components/GridTable';
import FlatButton from 'material-ui/FlatButton';
import {putData, postData, deleteData} from '../resources/Requests';

export default class EmployeeTable extends GridTable {
  constructor(props) {
    super(props);
  }

  getColumns() {
    return [
      { key: 'first_name', name: 'Name', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'last_name', name: 'Surname', sortable: true, filterable: true, resizable: true, editable: true },
      /*{ key: 'telephone', name: 'Telefone', sortable: true, filterable: true, resizable: true, editable: true },*/
      { key: 'email', name: 'Email', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'cpf', name: 'cpf', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'actions', name: 'Actions', locked: true, filterable: false, resizable: true, editable: false }
    ];
  }

  getRoute = () => '/api/employee/employee/'

  handleDeletion = (id, idx) => {
    const confirmation = confirm('A deleção não poderá ser desfeita\n'+
      'Você confirma a deleção?');
    if(confirmation){
      deleteData(`${this.getRoute()}${id}/`,
        () => {
          const rows = this.state.rows.slice();
          rows.splice(idx, 1);
          this.setState({
            open: true,
            message: 'Funcionario excluido',
            rows: rows
          });
        });
    } else {
      this.setState({open: true, message: 'Deleção cancelada'});
    }
  }

  getActions(register, idx){
    if(register !== undefined && register !== null){
      return (
        <FlatButton
          secondary
          onClick={this.handleDeletion.bind(this, register.id, idx)}
          label="X"
        />
      );
    }
    return null;
  }


  handleAddRow = () => {
    const newRow = {
      first_name: '', last_name: ''/*, telephone: ''*/, email: '',
      cpf: '', actions: ''
    };
    let rows = this.state.rows.slice();
    rows.unshift(newRow);
    this.setState({ rows });
  }


  createOrUpdate = (data, newField) => {
    const changedData = Object.assign(data, newField);
    if( changedData['email'] !== ''
      && changedData['first_name'] !== ''
      && changedData['last_name'] !== ''
      && changedData['cpf'] !== ''
    /*&& changedData['telephone'] !== undefined*/){
      changedData['username'] = changedData.cpf;
      let route = this.getRoute();
      let message = 'Salvo com sucesso!';

      const handleSubmitData = (data) => {
        if(data.id){
          this.setState({ open: true, message: message });
          changedData['id'] = data.id;
        } else {
          message = '';
          for(let key in data){
            if(data.hasOwnProperty(key)){
              message += `${key}: ${data[key]}\n`;
            }
          }

          this.setState({ open: true,
            message: `Ocorreu um erro\n${message}`
          });
        }
      };

      if (changedData.id !== undefined){
        message = 'Atualizado com sucesso!';
        putData(`${route}${changedData.id}/`, changedData, handleSubmitData);
      } else {
        postData(route, changedData, handleSubmitData);
      }
    }
    return changedData;
  }

  getToolbar(){
    return (
      <Toolbar enableFilter={true} onAddRow={this.handleAddRow} />
    );
  }

}
