import React, {Component} from 'react';
import '../../stylesheet/LoginForm.sass';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import AppDispatcher from '../../AppDispatcher';
import LoginStore from '../../stores/LoginStore';
import ActionType from '../../actions/ActionType';


export default class LoginForm extends Component{

  constructor(props){
    super(props);
    Formsy.addValidationRule('userExist', () => {
      return this.state.userExist;
    });

    this.invalidMessage = 'Usuário e/ou senha inválidos.';
    this.state = LoginStore.getInitialState();
  }

  componentWillMount = () => this.setState({
    listener: LoginStore.addListener(this.validateForm)
  })

  validateForm = () => {
    const {userExist} = LoginStore.getState();
    this.setState({userExist});
    this.form.validateForm();
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleSubmit = (data) => {
    AppDispatcher.dispatch({
      action: ActionType.LOGIN.POST,
      data: data,
    });
  }

  render(){
    return (
      <Formsy.Form ref={ (form) => {this.form = form;} }
        onValidSubmit={this.handleSubmit}
        onInvalid={() => {this.setState({userExist: true});} }
      >
        <FormsyText type="text"
          name="username"
          required
          hintText="E-mail ou nome de usuário"
          floatingLabelText="Usuário"
          validations = "userExist"
          validationError={' '}
        />
        <br/>

        <FormsyText type="password"
          name="password"
          required
          hintText="Senha"
          floatingLabelText="Senha"
          validations = "userExist"
          validationError={this.invalidMessage} />

        <br/><br/>
        <RaisedButton backgroundColor='#324356' labelColor='#FFFFFF' label="ENTRAR" type="submit" style={{marginBottom: '30px', marginTop: '30px'}}/>
        <br/><br/>
      </Formsy.Form>
    );
  }
}
