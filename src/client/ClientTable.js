/** This file implements a Grid table defined in src/component
 * Only override the necessary methods to it work.
 */
import GridTable from '../components/GridTable';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Toolbar} from 'react-data-grid-addons';
import FlatButton from 'material-ui/FlatButton';
import Warning from 'material-ui/svg-icons/alert/warning';
import Block from 'material-ui/svg-icons/content/block';
import Eye from 'material-ui/svg-icons/image/remove-red-eye';
import {routeMap} from '../routes/RouteMap';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {putData} from '../resources/Requests';

class NameFormatter extends React.Component {

  static propTypes = {
    value: PropTypes.bool,
  }

  render = () => {
    return !this.props.value && <Warning />;
  }
}

export default class ClientTable extends GridTable {
  constructor(props) {
    super(props);
  }

  getRoute = () => routeMap.active_client

  // Using arrow function the table doens't work
  getColumns() {
    return [
      { key: 'is_active', name: 'Ativo', sortable: true, resizable: true, formatter: NameFormatter },
      { key: 'is_complete', name: 'Completo', sortable: true, resizable: true, formatter: NameFormatter },
      { key: 'name', name: 'Name', sortable: true, filterable: true, resizable: true },
      { key: 'telephone', name: 'Telefone', sortable: true, filterable: true, resizable: true },
      { key: 'email', name: 'Email', sortable: true, filterable: true, resizable: true },
      { key: 'cpf', name: 'CPF', sortable: true, filterable: true, resizable: true },
      { key: 'actions', name: 'Actions', locked: true, filterable: false, resizable: false }
    ];
  }

  changeUserActivation = (register) => {
    register.is_active = !register.is_active;
    const {actions, ...rest} = register; // eslint-disable-line

    this.setState({open: true, message: 'Desabilitando'});
    putData(`${this.getRoute()}${register.id}/`,
      rest,
      () => {},
      () => this.setState({open: true, message: 'Desabilitado'}),
      () => {
        register.is_active = !register.is_active;
        this.setState({open: true, message: 'Problema na desabilitação do usuário'});
      }
    );
  }

  // This form is necessary to avoid react/missing-displayName warning
  getActions(register) {
    if(register !== undefined && register !== null){
      if (register.is_complete) {
        return (
          <div title=''>
            <FlatButton
              style={ {overflow: 'inherit' }}
              title={`Ver dados do(a) ${register.name}`}
              primary
              icon={<Eye />}
              containerElement={ <Link  to={`/dashboard/${register.id}/`} /> }
            />
            <FlatButton
              title='Desativar cliente'
              primary
              icon={<Block />}
              onClick={this.changeUserActivation.bind(this, register)}
            />
          </div>
        );
      } else {
        return (
          <FlatButton
            title={`Concluir o registro do(a) cliente ${register.name}`}
            primary
            icon={<ModeEdit />}
            containerElement={ <Link to={`/register/steps/${register.id}/`} /> }
          />
        );
      }
    }
    return null;
  }

  // This form is necessary to avoid react/missing-displayName warning
  getToolbar(){
    return (
      <Toolbar enableFilter={true} />
    );
  }
}
