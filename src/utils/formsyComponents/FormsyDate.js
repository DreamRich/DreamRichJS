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
    value: PropTypes.object,
    getValue: PropTypes.func,
    setValue: PropTypes.func,
    defaultDate: PropTypes.object,

    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,

    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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

  componentDidMount() {
    const { defaultDate } = this.props;
    const value = this.props.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.props.setValue(defaultDate);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.props.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, newProps.defaultDate)) {
        this.props.setValue(newProps.defaultDate);
      }
    }

    function datesEq(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate() &&
        date1.getDay() === date2.getDay();
    }
  }

  handleChangeDatePicker = (event, date) => {
    this.setState({
      selectedDate: date,
      dateText: format(date, 'DD/MM/YYYY'),
      dateSubmit: date.toISOString().slice(0, 10)
    });
  }

  render() {

    const {
      name,
      defaultDate, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      requiredError, // eslint-disable-line no-unused-vars
      ...rest } = this.props;

    return (
      // Name will define which field will be submitted
      <div style={{display: 'flex'}}>
        <FormsyText
          name='text'
          id={this.props.name + '_field'}
          style={{width:225, marginLeft: 20}}
          disabled={this.isFormDisabled}
          errorText={this.getErrorMessage}
          value={this.state.dateText}
          hintText="Ex: 01/01/1970"
          validationError='Insira uma data válida'
          validations={{
            matchRegexp:/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/
          }}
          requiredError={requiredError}
          {...rest}
        />

        <IconButton style={{opacity:'0.65', marginTop:20}}
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
            container='inline'
            fullWidth
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
