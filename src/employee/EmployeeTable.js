// import {Link} from 'react-router-dom';
import React from 'react';
import {Toolbar} from 'react-data-grid-addons';
import {Auth} from '../auth/Auth';
import GridTable from '../layout/GridTable';

export default class EmployeeTable extends GridTable {
  constructor(props) {
    super(props);
    this.handleAddRow = this.handleAddRow.bind(this);
  }

  getColumns() {
    return [
      { key: 'name', name: 'Name', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'surname', name: 'Surname', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'telephone', name: 'Telefone', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'email', name: 'Email', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'cpf', name: 'cpf', sortable: true, filterable: true, resizable: true, editable: true },
      { key: 'actions', name: 'Actions', locked: true, filterable: false, resizable: true, editable: false }
    ];
  }

  getRoute(){ return '/api/employee/employee/'; }

  handleDeletion(id, idx){
    const confirmation = confirm('A deleção não poderá ser desfeita\n'+
      'Você confirma a deleção?');
    if(confirmation){
      fetch(`${this.getRoute()}${id}/`,{
        method: 'delete'
      })
      .then((e) => {
        if(e.ok){
          const rows = this.state.rows.slice();
          rows.splice(idx, 1);
          this.setState({
            open: true,
            message: 'Funcionario excluido',
            rows: rows
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    } else {
      this.setState({open: true, message: 'Deleção cancelada'});
    }
  }

  getActions(register, idx) {
    if(register !== undefined && register !== null){
      return (
        <div>
          <button onClick={this.handleDeletion.bind(this, register.id, idx)}>
            X
          </button>
        </div>
      );
    }
    return null;
  }


  handleAddRow() {
    const newRow = {
      name: '', telephone: '', email: '', actions: ''
    };
    let rows = this.state.rows.slice();
    rows.unshift(newRow);
    this.setState({ rows });
  }

  createOrUpdate(data, newField){
    const changedData = Object.assign(data, newField);
    if( changedData['email'] !== undefined
      && changedData['name'] !== undefined
      && changedData['surname'] !== undefined
      && changedData['cpf'] !== undefined
      && changedData['telephone'] !== undefined){
      changedData['username'] = changedData.cpf;
      let method = 'post';
      let route = this.getRoute();
      let message = 'Salvo com sucesso!';
      if (changedData.id !== undefined){
        method = 'put';
        route = `${route}${changedData.id}/`;
        message = 'Atualizado com sucesso!';
      }
      fetch(route, {
        method: method,
        body: JSON.stringify(changedData),
        headers: Auth.getHeader()
      })
      .then((response) => response.json())
      .then((e) => {
        console.log(e);
        if(e.id){
          this.setState({ open: true, message: message });
          changedData['id'] = e.id;
          console.log(e); 
        } else {
          message = '';
          for(let key in e){
            if(e.hasOwnProperty(key)){
              message += `${key}: ${e[key]}\n`;
            }
          }

          this.setState({ open: true,
            message: `Ocorreu um erro\n${message}`
          });
        }
      });
    }
    return changedData;
  }

  getToolbar() {
    return (<Toolbar
      enableFilter={true}
      onAddRow={this.handleAddRow} />);
  }

}
