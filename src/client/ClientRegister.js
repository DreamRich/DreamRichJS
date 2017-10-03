import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import {FormsyDate} from '../utils/FormsyComponents';
import errorMessages from '../utils/FormsErrorMessages';
//import IconButton from 'material-ui/IconButton';
//import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientSubForm from './ClientSubForm';
import ClientForm from './ClientForm';
import ClientDependentForm from './ClientDependentForm';

var {
  wordsError,
  numericError,
  emailError
} = errorMessages;

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

  getClientsFields = () => {
    return (
      <div>
        <FormsyText
          name="name"
          validations="isWords"
          validationError={wordsError}
          hintText="Nome do cliente"
          floatingLabelText="Nome"
          value="asd"
        />
        <FormsyText
          name="surname"
          validations="isWords"
          validationError={wordsError}
          hintText="Sobrenome do cliente"
          floatingLabelText="Sobrenome"
          value="asd"
        />
        <FormsyDate
          name="birthday"
          floatingLabelText="Data de Nascimento"
        />
        <FormsyText
          name="profession"
          validations="isWords"
          validationError={wordsError}
          hintText="Profissão do cliente"
          floatingLabelText="Profissão"
          value="asd"
        />
        <FormsyText
          name="cpf"
          validations="isNumeric"
          validationError={numericError}
          hintText="Apenas números"
          floatingLabelText="CPF"
          value="33044946425"
          updateImmediately
        />
        <FormsyText
          name="telephone"
          hintText="Telefone do cliente"
          floatingLabelText="Telefone"
          value="(61) 98131-4508"
          updateImmediately
        />
        <FormsyText
          name="email"
          validations="isEmail"
          validationError={emailError}
          hintText="E-mail do cliente"
          floatingLabelText="E-mail"
          value="asd@gmail.com"
        />
        <FormsyText
          name="hometown"
          validations="isWords"
          validationError={wordsError}
          hintText="Onde o cliente nasceu?"
          floatingLabelText="Cidade natal"
          value="asdac"
        />
      </div>
    );
  }

  switchSponse = () => {
    const sponse = !this.state.sponse;
    this.setState({sponse});
  }

  render() {

    const sponseForm = (
      this.state.sponse ? (
      <ClientSubForm
        title="Cônjuge"
        name="client"
        parent_name="active_client_id"
        parent_id={this.state.id}
      >
        <div>
          {this.getClientsFields()}
          <RaisedButton onClick={this.switchSponse} > 
            Remove Sponse 
          </RaisedButton>
        </div>
      </ClientSubForm>) : (<div>
        <h2> Cônjuge </h2> 
        <RaisedButton onClick={this.switchSponse}>
          Add 
        </RaisedButton>
        </div>)
      );
    return (
      <div>
        <h1> Cadastro de Cliente </h1>

        <Paper className="Paper">

          <div>
            <ClientForm
              title="Cliente"
              ref={(ref) => {this.baseForm = ref;}}
            >
            {this.getClientsFields()}
            </ClientForm>
          </div>
          {sponseForm}

          <ClientSubForm
            title='Endereço'
            name='address'
            parent_name='active_client_id'
            parent_id={this.state.id}
          >
            <div>
              <FormsyText
                name="cep"
                //validations="isNumeric"
                //validationError={numericError}
                hintText="Apenas números"
                floatingLabelText="CEP"
                updateImmediately
              />
              <FormsyText
                name="details"
                validations="isWords" 
                validationError={wordsError}
                hintText="Detalhes do endereço"
                floatingLabelText="Detalhes"
              />
              <FormsyText
                name="number"
                validations="isNumeric"
                validationError={numericError}
                hintText="Número do lote"
                floatingLabelText="Número"
                updateImmediately
              />
              <FormsyText
                name="complement"
                validations="isWords" 
                validationError={wordsError}
                hintText="Complemento do endereço"
                floatingLabelText="Complemento"
              />
              <FormsyText
                name="neighborhood"
                validations="isWords" 
                validationError={wordsError}
                hintText="Bairro do endereço"
                floatingLabelText="Bairro"
              />
              <FormsyText
                name="type_of_address"
                validations="isWords" 
                validationError={wordsError}
                hintText="Casa, apartamento, etc."
                floatingLabelText="Tipo de Endereço"
              />
            </div>
          </ClientSubForm>

          <ClientSubForm
            title="Conta Bancária"
            name="bank_account"
            parent_name='active_client_id'
            parent_id={this.state.id}
          >
            <div>
             <FormsyText
               name="agency"
               validations="isNumeric"
               validationError={numericError}
               hintText="Agência da conta bancária"
               floatingLabelText="Agência"
             />
             <FormsyText
               name="account"
               hintText="Número da conta bancária"
               floatingLabelText="Conta"
             />
            </div>
          </ClientSubForm>

          <ClientDependentForm
            parent_id={this.state.id}
          />

          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={() => this.baseForm.submit()}
            disabled={!this.state.canSubmit}
          />

        </Paper>

      </div>
    ); 
  }
}

export default ClientRegister;
