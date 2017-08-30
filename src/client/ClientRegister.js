import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import '../stylesheet/RegisterForms.sass';

class ClientRegister extends Component{

  constructor(props){

    super(props);
    this.state = {
      canSubmit: false,
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }
  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    let {wordsError, numericError, emailError} = errorMessages;

    return (
      <div>
        <h1> Cadastro de Cliente </h1>

        <div>
          <Paper className="Paper">
            <Formsy.Form
              onValid={this.enableButton.bind(this)}
              onInvalid={this.disableButton.bind(this)}
              onValidSubmit={this.submitForm.bind(this)}
              onInvalidSubmit={this.notifyFormError}>
              <FormsyText
                name="name"
                validations="isWords"
                validationError={wordsError}
                hintText="Qual é o seu nome?"
                floatingLabelText="Nome"
                required
              />
              <FormsyText
                name="surname"
                validations="isWords"
                validationError={wordsError}
                hintText="Qual é o seu sobrenome?"
                floatingLabelText="Sobrenome"
                required
              />
              <FormsyText
                name="profession"
                validations="isWords"
                validationError={wordsError}
                hintText="Com o que você trabalha?"
                floatingLabelText="Profissão"
                required
              />
              <FormsyText
                name="email"
                validations="isEmail"
                validationError={emailError}
                hintText="Insira seu e-mail"
                floatingLabelText="E-mail"
                required
              />
              <FormsyDate
                name="birthday"
                hintText="Data de nascimento"
                required
                floatingLabelText="Clique para selecionar"
              />
              <FormsyText
                name="cpf"
                validations="isNumeric"
                validationError={numericError}
                hintText="Apenas números"
                floatingLabelText="CPF"
                updateImmediately
                required
              />
              <FormsyText
                name="telephone"
                validations="isNumeric"
                validationError={numericError}
                hintText="Insira seu telefone"
                floatingLabelText="Telefone"
                updateImmediately
                required
              />
              <FormsyText
                name="hometown"
                validations="isWords"
                validationError={wordsError}
                hintText="Onde você nasceu?"
                floatingLabelText="Cidade natal"
                required
              />
              <RaisedButton
                primary
                type="submit"
                label="Enviar"
                disabled={!this.state.canSubmit}
              />
            </Formsy.Form>
          </Paper>
        </div>
      </div>
    ); 
  }
}

export default ClientRegister;
