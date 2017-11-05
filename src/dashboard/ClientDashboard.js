import React, {Component} from 'react';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientBankAccountForm from '../client/form/ClientBankAccountForm';
import ClientAddressForm from '../client/form/ClientAddressForm';
import ClientForm from '../client/form/ClientForm';
import ClientSpouseForm from '../client/form/ClientSpouseForm';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'underscore';

class ClientDashboard extends Component {

  state = ClientStore.getState()

  componentWillMount = () => this.setState({
    listener: ClientStore.addListener(this.handleChange)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(ClientStore.getState())

  componentDidMount = () => {
    AppDispatcher.dispatch({
      action: ActionType.CLIENT.DATAFORM
    });
  }

  render() {

    const spouse = (
      !_.isEmpty(this.state.spouse) ?
        <ClientSpouseForm
          title='Cônjuge'
          subtitleCard={'Informações do cônjuge deste cliente'}
          data={this.state.spouse}
          isDisable={true}
        /> : <h1>Adicionar</h1>
    );

    return (
      <div>
        <Row around="xs">
          <Col xs>
            <ClientForm
              title='Cliente'
              subtitleCard='Informações básicas do cliente.'
              data={this.state.active_client}
              isDisable={true}
            />
          </Col>
          <Col xs>
            {spouse}
          </Col>
        </Row>
        <Row around="xs" style={{marginTop: '30px'}}>
          <Col xs={9}>
            <ClientAddressForm
              title='Endereço'
              subtitle='Informações correspondentes ao endereço.'
              id={this.state.active_client.id}
              data={this.state.address}
              isDisable={true}
            />
          </Col>
          <Col xs={3}>
            <ClientBankAccountForm
              id={this.state.active_client.id}
              data={this.state.bank_account}
              isDisable={true}
            />
          </Col>
        </Row>
        <Row around="xs" style={{marginTop: '30px'}}>
          + dependente?
          <Col xs={9}>
            ...
          </Col>
        </Row>
      </div>
    );
  }
}

export default ClientDashboard;
