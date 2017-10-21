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
import { Row, Col } from 'react-flexbox-grid';
import CardForms from '../../layout/CardForms';

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
    console.log(data);
    AppDispatcher.dispatch({
      actionType: ActionType.PASSWORD.CHANGE,
      data: data,
    });
  }

  getFormyText(){
    const listForms = [
      {
        type: 'text', name: 'username', disable: true, value: this.props.username, floatingLabelText: 'Usuário'
      },
      {
        type: 'password', name: 'password', required: true, hintText: 'Digite sua senha antiga', floatingLabelText: 'Senha Antiga'
      },
      {
        type: 'password', name: 'new_password', required: true, hintText: 'Digite sua nova senha', floatingLabelText: 'Senha Nova'
      },
      {
        type: 'password', name: 'new_password_confirmation', required: true, hintText: 'Confirme sua nova senha', floatingLabelText: 'Confirmação'
      },
    ];

    let listFormsy = listForms.map((form,index) => {
      return (
        <FormsyText key={'formsyTextPassword'+index}
          type={form.type}
          name={form.name}
          disabled={form.disable}
          required={form.required}
          value={form.value}
          floatingLabelText={form.floatingLabelText}
        />
      );
    });

    return listFormsy;
  }

  getContentCard(){
    const formysTextList = this.getFormyText();

    let listColumns = formysTextList.map((form,index)=>{
      return (
        <Col xs key={'listColumnsPassword'+index}>
          {formysTextList[index]}
        </Col>
      );
    });

    return (
      <div>
        <Row>
          {listColumns}
        </Row>
        <Row>
          <RaisedButton primary style={{marginTop: '30px'}} label="ALTERAR" type="submit"/>
        </Row>
      </div>
    );
  }

  getForm = () => {

    return (
      <Formsy.Form ref={ (form) => {this.form = form;} }
        onValidSubmit={this.handleForm}
      >
        <CardForms
          titleCard="Alteração de senha"
          subtitleCard="Preencha os campos a seguir para alterar sua senha."
          contentCard={this.getContentCard()}
        />
      </Formsy.Form>
    );
  }

  render(){
    const toRender = (this.state.send? <CircularProgress /> : this.getForm());
    console.log(this.state.snack);
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
