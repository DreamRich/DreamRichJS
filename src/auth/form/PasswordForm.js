import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import PasswordStore from '../../stores/PasswordStore';
import AppDispatcher from '../../AppDispatcher';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import ActionType from '../../actions/ActionType';

export default class PasswordForm extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount = () => {
    this.setState({...PasswordStore.getState(), listener: PasswordStore.addListener(this.handleUpdate)} );
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleUpdate = () => {
    this.setState(PasswordStore.getState());
  }

  handleForm = (data) => {
    data.userid = this.props.userid;
    AppDispatcher.dispatch({
      actionType: ActionType.PASSWORD.CHANGE,
      data: data,
    });
  }

  getForm = () => {

    return (<Formsy.Form ref={ (form) => {this.form = form;} }
      onValidSubmit={this.handleForm}
    >
      <FormsyText type="text"
        name="username"
        disabled
        value={this.props.username}
        floatingLabelText="Usuário" />
      <br/>
      <br/>
      <FormsyText type="password"
        name="password"
        required
        hintText="Digite sua senha antiga" 
        floatingLabelText="Senha" />
      <br/>
      <br/>
      <FormsyText type="password"
        name="new_password"
        required
        hintText="Digite sua nova senha"
        floatingLabelText="Nova senha" />
      <br/>
      <br/>
      <FormsyText type="password"
        name="new_password_confirmation"
        required
        hintText="Confirme sua nova senha"
        floatingLabelText="Confirmação" />
      <br />
      <br/>
      <RaisedButton primary label="ALTERAR" type="submit"/>
    </Formsy.Form>);

  }

  render(){
    const toRender = (this.state.send? <CircularProgress /> : this.getForm());
    return (
      <section>
        {toRender}
        <Snackbar
          open={this.state.snack}
          message={this.state.message}
          autoHideDuration={9000}
          onRequestClose={() => AppDispatcher.dispatch({actionType: ActionType.PASSWORD.SNACKCLOSE})}
        />
      </section>
    );
  }
}
PasswordForm.propTypes = {
  userid: PropTypes.string,
  username: PropTypes.string
};
