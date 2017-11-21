import React, {Component} from 'react';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientBankAccountForm from '../client/form/ClientBankAccountForm';
import ClientAddressForm from '../client/form/ClientAddressForm';
import ClientForm from '../client/form/ClientForm';
import ClientSpouseForm from '../client/form/ClientSpouseForm';
import ClientDependentForm from '../client/form/ClientDependentForm';
import { Row, Col } from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';
import getDivider from '../utils/getDivider';
import {getTypesForClient} from '../resources/getFormData';

class ClientDashboard extends Component {

  state = ClientStore.getState()

  componentWillMount = () => this.setState({
    listener: ClientStore.addListener(this.handleChange)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(ClientStore.getState())

  componentDidMount = () => getTypesForClient()

  getClientForm(){
    return (
      <ClientForm
        title='Cliente'
        subtitleCard='Informações básicas do cliente.'
        data={this.state.active_client}
        isDisable={true}
      />
    );
  }
  getClientSpouseForm(){
    return (
      <ClientSpouseForm
        title='Cônjuge'
        subtitleCard={'Informações do cônjuge deste cliente'}
        data={this.state.spouse}
        isDisable={true}
      />
    );
  }
  getClientAddressForm(){
    return (
      <ClientAddressForm
        title='Endereço'
        subtitle='Informações correspondentes ao endereço.'
        id={this.state.active_client.id}
        data={this.state.address}
        isDisable={true}
      />
    );
  }
  getClientBankAccountForm(){
    return (
      <ClientBankAccountForm
        id={this.state.active_client.id}
        data={this.state.bank_account}
        isDisable={true}
      />
    );
  }

  getClientDependentForm(){
    return (
      <ClientDependentForm
        id={this.state.active_client.id}
        canSubmit={this.state.canSubmit}
      />
    );
  }

  render() {

    return (
      <div>
        <MediaQuery key="desktopClientForm" query="(min-width: 1030px)">
          <Row around="xs">
            <Col xs>
              {this.getClientForm()}
            </Col>
            <Col xs>
              {this.getClientSpouseForm()}
            </Col>
          </Row>
          <Row around="xs" style={{marginTop: '30px'}}>
            <Col xs={9}>
              {this.getClientAddressForm()}
            </Col>
            <Col xs={3}>
              {this.getClientBankAccountForm()}
            </Col>
          </Row>
          <div style={{marginTop: '30px'}}>
            {this.getClientDependentForm()}
          </div>
        </MediaQuery>
        <MediaQuery key="mobileClientForm" query="(max-width: 1030px)">
          {this.getClientForm()}
          {getDivider()}
          {this.getClientSpouseForm()}
          {getDivider()}
          {this.getClientAddressForm()}
          {getDivider()}
          {this.getClientBankAccountForm()}
          {getDivider()}
          {this.getClientDependentForm()}
        </MediaQuery>
      </div>
    );
  }
}

export default ClientDashboard;
