import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import PropTypes from 'prop-types';
import {routeMap} from '../routes/RouteMap';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Save from 'material-ui/svg-icons/content/save';

export default class Form extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    parent_id: PropTypes.number,
    parent_name: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.element,
    action: PropTypes.string,
    canSubmit: PropTypes.bool,
    index: PropTypes.number,
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    isEditable: PropTypes.bool,
  }

  static defaultProps = {
    isEditable: false,
    disabled: false,
  }

  componentWillMount = () => this.setState({disabled: this.props.disabled})

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.disabled !== this.props.disabled) {
      this.setState({disabled: nextProps.disabled});
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.canSubmit &&
        this.props.canSubmit) {
      this.form.submit();
    }
  }

  handleDisable = () => {
    // Form is saved or disabled and can be editable
    if(this.state.disabled && this.props.isEditable) {
      this.setState({disabled: false});
    } else { // Form is open and need be submited
      this.form.submit();
      this.setState({disabled: true});
    }
  }

  submitForm = (data) => {
    if (this.props.parent_name) {
      data[this.props.parent_name] = this.props.parent_id;
    }
    AppDispatcher.dispatch(
      {
        action: this.props.action,
        route: routeMap[this.props.name],
        data: data,
        state: this.props.name,
        index: this.props.index,
      });
  }

  getButton = () => {

    if (this.props.isEditable){
      const label = this.state.disabled ? 'EDITAR' : 'SALVAR';
      const icon = this.state.disabled ? <Edit /> : <Save />;
      return (
        <RaisedButton
          icon={icon}
          label={label}
          onClick={this.handleDisable}
        />
      );
    } else if (!this.state.disabled) {
      return (
        <RaisedButton
          icon={<Save />}
          label='SALVAR'
          onClick={this.handleDisable}
        />
      );
    } else {
      return (null);
    }
  }

  render = () => {
    return (
      <Formsy.Form
        ref={(ref) => {this.form = ref; }}
        disabled={this.state.disabled}
        onValidSubmit={this.submitForm}>
        {this.props.children}
        {this.getButton()}
      </Formsy.Form>
    );
  }
}

