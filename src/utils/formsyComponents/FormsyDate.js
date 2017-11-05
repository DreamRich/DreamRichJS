'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HOC} from 'formsy-react';
import {DatePicker, IconButton} from 'material-ui';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import {FormsyText} from 'formsy-material-ui/lib';
import format from 'date-fns/format';
import '../../stylesheet/RegisterForms.sass';

/*
reference:
  https://github.com/callemall/material-ui/issues/3933/
*/

class DefineFormsyDate extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    getValue: PropTypes.func,
    setValue: PropTypes.func,
    defaultDate: PropTypes.object,

    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,

    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    getErrorMessage: PropTypes.func,
    getErrorMessages: PropTypes.func,
    hasValue: PropTypes.func,
    isFormDisabled: PropTypes.func,
    isFormSubmitted: PropTypes.func,
    isPristine: PropTypes.func,
    isRequired: PropTypes.func,
    isValid: PropTypes.func,
    isValidValue: PropTypes.func,
    resetValue: PropTypes.func,
    setValidations: PropTypes.func,
    showError: PropTypes.func,
    showRequired: PropTypes.func,
  };

  constructor(props){
    super(props);
    this.datePicker = {};
  }

  state = {
    selectedDate: null, // Date object
    dateText: null, // For displaying
    dateSubmit: null // For submitting
  }

  componentDidMount = () => {
    const { defaultDate } = this.props;
    const value = this.props.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.props.setValue(defaultDate);
    }

    if (this.props.value) {
      this.handleChangeDatePicker(null, new Date(this.props.value));
    }
  }

  componentWillReceiveProps = (newProps) => {
    /* Check if this code is really necessary, the transition used is with
     * setting the value in new props to 3 states of this component
     */
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.props.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, newProps.defaultDate)) {
        this.props.setValue(newProps.defaultDate);
      }
    }

    /* This is the code to verify the new prop date. This not require
     * the creation of compare1 and compare2 in datesEq(date1, date2)
     */
    if (newProps.value) {
      const oldDate = new Date(this.props.value);
      const newDate = new Date(newProps.value);

      if (!this.state.selectedDate && !datesEq(oldDate, newDate)) {
        this.handleChangeDatePicker(null, newDate);
      }
    }

    function datesEq(date1, date2) {
      const compare1 = new Date(date1);
      const compare2 = new Date(date2);
      return compare1.getFullYear() === compare2.getFullYear() &&
        compare1.getDate() === compare2.getDate() &&
        compare1.getDay() === compare2.getDay();
    }
  }

  handleChangeDatePicker = (event, date) => {
    const utcDate = new Date(date.getTime()+date.getTimezoneOffset()*60000);
    this.setState({
      selectedDate: utcDate,
      dateText: format(utcDate, 'DD/MM/YYYY'),
      dateSubmit: utcDate.toISOString().slice(0, 10)
    });
  }

  render() {

    // Do it to avoid warning of props
    const {
      name,
      defaultDate,
      requiredError,
      getErrorMessage, // eslint-disable-line no-unused-vars
      getErrorMessages, // eslint-disable-line no-unused-vars
      getValue, // eslint-disable-line no-unused-vars
      hasValue, // eslint-disable-line no-unused-vars
      isFormDisabled, // eslint-disable-line no-unused-vars
      isFormSubmitted, // eslint-disable-line no-unused-vars
      isPristine, // eslint-disable-line no-unused-vars
      isRequired, // eslint-disable-line no-unused-vars
      isValid, // eslint-disable-line no-unused-vars
      isValidValue, // eslint-disable-line no-unused-vars
      resetValue, // eslint-disable-line no-unused-vars
      setValidations, // eslint-disable-line no-unused-vars
      setValue, // eslint-disable-line no-unused-vars
      showError, // eslint-disable-line no-unused-vars
      showRequired, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...rest } = this.props;

    return (
      // Name will define which field will be submitted
      <div>
        <FormsyText
          name='text'
          id={this.props.name + '_field'}
          style={{width:180}}
          disabled={this.props.isFormDisabled}
          errorText={this.getErrorMessage}
          value={this.state.dateText}
          hintText='Ex: 01/01/1970'
          validationError='Insira uma data válida'
          validations={{
            matchRegexp:/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/
          }}
          requiredError={requiredError}
          {...rest}
        />
        <IconButton style={{opacity:'0.65'}}
          onClick={() => this.datePicker.focus()}>
          <ActionDateRange />
        </IconButton>
        <div>
          <DatePicker
            name='date'
            id={this.props.name + '_dataPicker'}
            className="Hidden"
            onChange={this.handleChangeDatePicker}
            value={this.state.selectedDate}
            ref={picker => { this.datePicker = picker;}}
            default={defaultDate}
            fullWidth
            mode='landscape'
            disable={this.props.isFormDisabled}
            autoOk
          />
          <FormsyText
            name={name}
            className="Hidden"
            value={this.state.dateSubmit}
          />
        </div>
      </div>
    );
  }
}

const FormsyDate = HOC(DefineFormsyDate);

export default FormsyDate;
