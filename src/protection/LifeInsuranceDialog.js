import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProtectionStore from '../stores/ProtectionStore';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from 'react-router';

export default class LifeInsuranceDialog extends Component {

  static propTypes = {
    step: PropTypes.number,
    maxStep: PropTypes.number,
    id: PropTypes.number,
    handleCancel: PropTypes.func,
  }


  componentWillMount = () => {
    const {life_insuraces} = ProtectionStore.getState();
    this.setState({
      listener: ProtectionStore.addListener(this.handleUpdate),
      life_insuraces,
      skip: false,
    });
  }

  handleUpdate = () => {
    const {life_insuraces} = ProtectionStore.getState();
    this.setState({life_insuraces});
  }

  handleConfirm = () => {
    this.setState({skip: true});
  }

  componentWillUnmount = () => this.state.listener.remove()

  needConfirm = () => {
    return (
      this.state.life_insuraces === undefined ||
      this.state.life_insuraces.length === 0);
  }

  render = () => {
    const needConfirmation = this.needConfirm();
    const actions = [
      <RaisedButton
        key={'backbutton'}
        label="Voltar"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleCancel}
      />,
      <RaisedButton
        key={'skipbutton'}
        label="Confirmar"
        primary={true}
        onClick={this.handleConfirm}
      />,
    ];

    const needShow = this.props.maxStep == this.props.step;


    if (!this.state.skip && ( needShow && needConfirmation) ) {
      return (
        <Dialog
          open={true}
          modal={true}
          title="Confirmação"
          actions={actions}
        >
          Estou ciente e concordo que assinarei um termo afirmando que não contratarei um seguro de vida! <p /> Fui alertado e orientado sobre como resguardar o patrimônio e proteger minha família pela GWX.
        </Dialog>);
    }
    return (<Redirect push to={`/dashboard/${this.props.id}/`} />);
  }

}
