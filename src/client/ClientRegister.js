import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientDependentForm from './ClientDependentForm';
import ClientBankAccountForm from './ClientBankAccountForm';
import ClientAddressForm from './ClientAddressForm';
import ClientField from './fields/ClientField';
import SubStepperClient from '../layout/SubStepperClient';

class ClientRegister extends Component {

  constructor(props){
    super(props);
  }

  state = {
    canSubmit: true,
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    /* This timeout is to prevent the update action launch together with
    * react dipatcher and throw error of Invariant Violation Dispatch.dispatch
    */
    setTimeout(() =>
      this.setState(ClientStore.getState()), 500);
  }

  getDivider = () => {
    return (<Divider style={{marginTop: '25px', marginBottom: '30px'}} />);
  }

  submit = () => {
    this.form.submit();
  }

  render() {
    let subtitleCard = 'Insira as informações correspondentes as informações básicas do cliente.';
    let listInformationSteps = [
      {
        text: 'Cadastrar Cliente',
        formComponent:
          <div>
            <ClientField title='Cliente' subtitleCard={subtitleCard} canSubmit={this.state.canSubmit} ref={ref => this.form = ref} selectOption={true} />
          </div>
      },
      {
        text: 'Cadastrar Endereço',
        formComponent: <ClientAddressForm id={this.state.id} />
      },
      {
        text: 'Cadastrar Conta bancária',
        formComponent: <ClientBankAccountForm id={this.state.id} />
      },
      {
        text: 'Dependentes',
        formComponent:
          <ClientDependentForm
            parent_id={this.state.id}
          />
      }
    ];

    return (
      <div style={{width:'auto'}}>
        {this.getDivider()}

        <SubStepperClient stepsNumber={3} listInformationSteps={listInformationSteps}/>

        {this.getDivider()}

        <RaisedButton onClick={this.submit} disabled={!this.state.canSubmit}>
          Submit
        </RaisedButton>
      </div>
    );
  }
}

export default ClientRegister;
