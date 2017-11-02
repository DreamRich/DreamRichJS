import React, {Component} from 'react';
import '../stylesheet/RegisterForms.sass';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientDependentForm from '../client/form/ClientDependentForm';
import ClientBankAccountForm from '../client/form/ClientBankAccountForm';
import ClientAddressForm from '../client/form/ClientAddressForm';
import ClientForm from '../client/form/ClientForm';
import ClientSpouseForm from '../client/form/ClientSpouseForm';
import { Row, Col } from 'react-flexbox-grid';

class ClientDashboard extends Component {

  constructor(props){
    super(props);

    this.state = ClientStore.getState();
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
  }

  componentDidMount = () => {
    AppDispatcher.dispatch({
      action: ActionType.CLIENT.DATAFORM
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(ClientStore.getState());
  }

  render() {
    let subtitleCard = 'Informações básicas do cliente.';

    return (
      <div>
        <Row around="xs">
          <Col xs>
            <ClientForm
              title='Cliente'
              subtitleCard={subtitleCard}
              data={this.state.active_client}
              isDisable={true}
            />
          </Col>
          <Col xs>
            <ClientSpouseForm
              title='Cônjuge'
              subtitleCard={'Informações do cônjuge deste cliente'}
              data={this.state.spouse}
            />
          </Col>
        </Row>
        <Row around="xs" style={{marginTop: '30px'}}>
          <Col xs={9}>
            <ClientAddressForm
              id={this.state.active_client.id}
              data={this.state.address}
            />
          </Col>
          <Col xs={3}>
            <ClientBankAccountForm
              id={this.state.active_client.id}
              data={this.state.bank_account}
            />
          </Col>
        </Row>
        <Row around="xs">
          <ClientDependentForm
            id={this.state.active_client.id}
          />
        </Row>
      </div>
    );
  }
}

export default ClientDashboard;
