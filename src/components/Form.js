import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import PropTypes from 'prop-types';
import {routeMap} from '../routes/RouteMap';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Save from 'material-ui/svg-icons/content/save';
import { Row, Col } from 'react-flexbox-grid';

export default class Form extends Component {

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
    onDisable: PropTypes.func,
  }

  static defaultProps = {
    isEditable: false,
    disabled: false,
    onDisable: () => {},
    onSubmit: () => {}
  }

  componentWillMount = () => this.disable(this.props.disabled)

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.disabled !== this.props.disabled) {
      this.disable(nextProps.disabled);
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
      this.disable(false);
    } else { // Form is open and need be submited
      this.form.submit();
      this.disable(true);
    }
  }

  handleCancel = () => {
    this.form.reset();
    this.disable(true);
  }

  submitForm = (data) => {
    if (this.props.parent_name) {
      data[this.props.parent_name] = this.props.parent_id;
    }
    this.props.onSubmit(data);
    AppDispatcher.dispatch({
      action: this.props.action,
      route: routeMap[this.props.name],
      data: data,
      state: this.props.name,
      index: this.props.index,
    });
  }

  getButton = () => {
    const className = 'marginTop';
    if (this.props.isEditable){
      const label = this.state.disabled ? 'EDITAR' : 'SALVAR';
      const icon = this.state.disabled ? <Edit /> : <Save />;
      return (
        <RaisedButton
          icon={icon}
          label={label}
          primary={true}
          className={className}
          onClick={this.handleDisable}
        />
      );
    } else if (!this.state.disabled) {
      return (
        <RaisedButton
          icon={<Save />}
          label='SALVAR'
          onClick={this.handleDisable}
          className={className}
        />
      );
    } else {
      return (null);
    }
  }

  getCancelButton = () => {
    const className='marginTop';
    if (this.props.isEditable && !this.state.disabled) {
      return (
        <RaisedButton
          icon={<Cancel />}
          label='CANCELAR'
          onClick={this.handleCancel}
          className={className}
        />
      );
    }
    return (null);
  }

  getButtonsCard = () => {
    return (
      <Row around='xs'>
        <Col xs>
          {this.getCancelButton()}
        </Col>
        <Col>
          {this.getButton()}
        </Col>
      </Row>
    );
  };

  disable = (condition) => {
    this.setState({disabled: condition});
    this.props.onDisable();
  }

  getButtonsCard = () => {
    return (
      <Row around='xs'>
        <Col xs>
          {this.getCancelButton()}
        </Col>
        <Col>
          {this.getButton()}
        </Col>
      </Row>
    );
  };

  render = () => {
    return (
      <Formsy.Form
        ref={(ref) => {this.form = ref; }}
        disabled={this.state.disabled}
        onValidSubmit={this.submitForm}>
        {this.props.children}
        {this.getButtonsCard()}
      </Formsy.Form>
    );
  }
}

