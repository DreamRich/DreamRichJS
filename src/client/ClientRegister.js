import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientSubForm from './ClientSubForm';
import ClientDependentForm from './ClientDependentForm';
import ClientBankAccountForm from './ClientBankAccountForm';
import ClientAddressForm from './ClientAddressForm';
import ClientField from './fields/ClientField';

// TODO Make take this.baseForm from chield

class ClientRegister extends Component {

  constructor(props){
    super(props);
  }

  state = {
    canSubmit: true,
    sponse: false,
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

  switchSponse = () => {
    const sponse = !this.state.sponse;
    this.setState({sponse});
  }
  getDivider = () => {
    return (<Divider style={{marginTop: '50px', marginBottom: '30px'}} />);
  }

  render() {

    const sponseForm = (
      this.state.sponse ? (
        <ClientSubForm
          name="client"
          parent_name="active_client_id"
          parent_id={this.state.id}
        >
          <div>
            <ClientField title='Cônjuge' canSubmit={this.state.canSubmit} />
            <RaisedButton onClick={this.switchSponse} >
              Remove Sponse
            </RaisedButton>
           </div>
        </ClientSubForm>) : (
          <div>
            <RaisedButton onClick={this.switchSponse}>
              Add
            </RaisedButton>
          </div>)
    );

    return (
        <div style={{width:'auto'}}>
          {this.getDivider()}

          <ClientField title='Cliente' canSubmit={this.state.canSubmit} />
          {this.getDivider()}
          {sponseForm}
          {this.getDivider()}

          <ClientAddressForm id={this.state.id} />
          {this.getDivider()}

          <ClientBankAccountForm id={this.state.id} />

          {this.getDivider()}
          <ClientDependentForm
            parent_id={this.state.id}
          />
          {this.getDivider()}

        </div>
    );
  }
}

export default ClientRegister;
