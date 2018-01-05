import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Toggle,
  TextField,
  DatePicker,
  SelectField,
  MenuItem
} from 'material-ui';
import format from 'date-fns/format';

export default class TableCell extends Component {

  static propTypes = {
    cell: PropTypes.object.isRequired,
    onChangeField: PropTypes.func,
    header: PropTypes.bool,
    type: PropTypes.string,
    style: PropTypes.object,
    selectedRow: PropTypes.object,
    options: PropTypes.array,
  }

  static defaultProps = {
    cell: {},
    header: false,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  getCellProps = () => {
    const id = this.props.cell.id;
    const type = this.props.type;
    const selected = this.props.cell.selected;
    const name = this.props.cell.name;

    let value = this.props.cell.value;
    if (selected && this.props.selectedRow.data[name]) {
      value = this.props.selectedRow.data[name];
    } else if (selected && type !== 'ToggleField') {
      value = '';
    } else if (selected) {
      value = false;
    }


    const rowId = this.props.cell.rowId;
    const header = this.props.header;
    const width = this.props.cell.width;
    const textFieldId = [id, rowId, header].join('-');
    const datePickerId = [id, rowId, header].join('-');

    const textFieldStyle = { width: width };

    const datePickerStyle = { width: width };

    // Set a new state to the row is being edited

    if (header) return {style: textFieldStyle};

    // Select the field to show
    if (type === 'TextField') {
      return {
        name: name,
        id: textFieldId,
        onChange: this.props.onChangeField,
        style: textFieldStyle,
        value: value,
        disabled: !selected,
        underlineDisabledStyle: {display: 'none'},
      };
    }
    if (type === 'DatePicker') {
      /* (null, date) and it break the logic of onChangeField wich uses the
      * event.target.name to set state */

      // Conditional props
      const dateValue = value ? {value: this.buildDate(value)} : {};

      return {
        name: name,
        id: datePickerId,
        onChange: (e, date) => this.props.onChangeField(
          {target: {name: name}}, date.toISOString().slice(0,10)),
        mode: 'landscape',
        style: datePickerStyle,
        disabled: !selected,
        underlineDisabledStyle: {display: 'none'},
        formatDate: (date) => format(date, 'DD/MM/YYYY'),
        ...dateValue
      };
    }

    if (type === 'ToggleField') {

      return {
        name: name,
        onToggle: this.props.onChangeField,
        toggled: value,
        disabled: !selected,
        // underlineDisabledStyle: {display: 'none'},
      };
    }

    if (type === 'SelectField') {
      const options = this.props.cell.options;
      return {
        name: name,
        disabled: !selected,
        value: value,
        onChange: (e, key) => this.props.onChangeField({target: {name: name}}, options[key].id),
        underlineDisabledStyle: {display: 'none'},
      };
    }
  }


  buildDate = (value) => {
    if (value){
      let date = new Date(value);
      date = new Date(date.getTime() + date.getTimezoneOffset()*60000);
      return date;
    }
    return undefined;
  }

  getOptions = () => {
    const {cell: {options} } = this.props;
    return options.map( (type) =>
      <MenuItem
        key={type.id}
        value={type.id}
        primaryText={type.name || type.id}
      />
    );
  }

  render = () => {

    const props = this.getCellProps();
    let field = null;

    if (this.props.header || this.props.type === 'ReadOnly') {
      field = (<p className='table-header' {...props} >
        {this.props.cell.value}
      </p>);
    } else if (this.props.type === 'TextField') {
      field = <TextField className='disabled'  {...props} />;
    } else if (this.props.type === 'DatePicker') {
      field = <DatePicker className='disabled' {...props} />;
    } else if (this.props.type === 'ToggleField') {
      field = <Toggle className='disabled' {...props} />;
    } else if (this.props.type === 'SelectField') {
      field = (<SelectField className='disabled' {...props}>
        {this.getOptions()}
      </SelectField>);
    }

    return (
      <div
        className='cell table-cell'
        style={this.props.style}
      >
        {field}
      </div>
    );
  }
}

