import React, {Component} from 'react';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientBankAccountForm from '../client/form/ClientBankAccountForm';
import ClientAddressForm from '../client/form/ClientAddressForm';
import ClientForm from '../client/form/ClientForm';
import ClientSpouseForm from '../client/form/ClientSpouseForm';
import ClientDependentForm from '../client/form/ClientDependentForm';



import {getTypesForClient} from '../resources/getFormData';
import Dashboard from '../components/Dashboard';

class ClientDashboard extends Component {

  state = ClientStore.getState()

  componentWillMount = () => this.setState({
    listener: ClientStore.addListener(this.handleChange)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(ClientStore.getState())

  componentDidMount = () => getTypesForClient()

  render() {
    return (
      <Dashboard>
        <ClientForm
          title='Cliente'
          subtitleCard={'Informações básicas do cliente'}
          data={this.state.active_client}
          disabled={true}
          size={6}
        />
        <ClientSpouseForm
          title='Cônjuge'
          subtitleCard={'Informações do cônjuge deste cliente'}
          id={this.state.active_client.id}
          data={this.state.spouse}
          disabled={true}
          size={6}
        />
        <ClientAddressForm
          title='Endereço'
          subtitle='Informações correspondentes ao endereço.'
          id={this.state.active_client.id}
          data={this.state.address}
          disabled={true}
          size={6}
        />
        <ClientBankAccountForm
          id={this.state.active_client.id}
          data={this.state.bank_account}
          disabled={true}
          size={6}
        />
        <ClientDependentForm
          id={this.state.active_client.id}
          canSubmit={this.state.canSubmit}
          size={12}
        />
      </Dashboard>
    );
  }
}

export default ClientDashboard;
