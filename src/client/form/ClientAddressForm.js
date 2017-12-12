import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import ActionType from '../../actions/ActionType';
import AppDispatcher from '../../AppDispatcher';
import AddressStore from '../../stores/AddressStore';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import CardForm from '../../components/CardForm';
import {AutoComplete} from 'material-ui';
import {FormsySelect, FormsyAutoComplete} from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

var {
  wordsError,
  numericError,
} = errorMessages;

const dataAddressSubForm = [
  {
    name: 'cep',validations: 'isNumeric', validationError: numericError,
    hintText: 'Apenas números', floatingLabelText: 'CEP', isUpdate: 'true',
  },
  {
    name: 'number',validations: 'isNumeric', validationError: numericError,
    hintText: 'Número do lote', floatingLabelText: 'Número', isUpdate: 'true',
  },
  {
    name: 'complement', hintText: 'Complemento do endereço',
    floatingLabelText: 'Complemento',
  },
  {
    name: 'neighborhood',validations: 'isWords', validationError: wordsError,
    hintText: 'Bairro do endereço', floatingLabelText: 'Bairro',
  },{
    name: 'detail', validations: 'isWords', validationError: wordsError,
    hintText: 'Detalhes do endereço', floatingLabelText: 'Detalhes'
  },
  {
    name: 'city', validations: 'isWords', validationError: wordsError,
    hintText: 'Cidade do endereço', floatingLabelText: 'Cidade'
  },
];

export default class ClientAddressForm extends Component {

  static propTypes = {
    id: PropTypes.number,
    canSubmit: PropTypes.bool,
    disabled: PropTypes.bool,
    data: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }

  static defaultProps = {
    data: {state: {}},
  }

  state = AddressStore.getState()

  updateSearch = (e, searchText) => {
    AppDispatcher.dispatch({
      action: ActionType.CLIENT.ADDRESSTEXT,
      searchText: searchText
    });
  }

  handleUpdate = () => this.setState(AddressStore.getState())

  componentWillMount = () => {
    this.setState({
      listener: AddressStore.addListener(this.handleUpdate)
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(nextProps.data.state, this.props.data.state)) {
      this.getStateList(nextProps.data.state);
    }
  }

  componentDidMount = () => this.getStateList()

  fetchStates = (e, selectedCountry) => {
    AppDispatcher.dispatchDefer({
      action: ActionType.CLIENT.STATES,
      country: selectedCountry
    });
  }

  convertRegionToOptions = (listData) => {
    // Convert data from backend in MenuOptions
    const listMenuItems = listData.map((region, index) => {
      const primaryText = `${region.name} - ${region.abbreviation}`;
      return (
        <MenuItem key={index} value={region.id} primaryText={primaryText} />
      );
    });
    return listMenuItems;
  }

  getStateList = (state) => {
    const hasStateList = this.state.states.find(
      stateItem => _.isEqual(stateItem, state)
    );

    state = state || this.props.data.state;

    // Check the state and the existence of state object data
    if (hasStateList === undefined && state.country_id !== undefined) {
      this.fetchStates(null, state.country_id);
    }
  }

  getFormsySelect(searchText,statesOptions,contriesOptions){
    return (
      <Col xs key={'FormsySelectAddressCountry'}>
        <FormsySelect
          name="country"
          floatingLabelText="País"
          maxHeight={300}
          onChange={this.fetchStates}
          value={this.props.data.state.country_id}
          fullWidth={true}
        >
          {contriesOptions}
        </FormsySelect>
        <FormsySelect
          name="state_id"
          floatingLabelText="Estado"
          maxHeight={300}
          value={this.props.data.state.id}
          fullWidth={true}
        >
          {statesOptions}
        </FormsySelect>
        <FormsyAutoComplete
          ref={(form)=> this.field=form}
          dataSource={this.state.addressType}
          name="type_of_address"
          validations="isWords"
          maxSearchResults={3}
          validationError={wordsError}
          hintText="Casa, apartamento, etc."
          floatingLabelText="Tipo de Endereço"
          searchText={searchText}
          value={searchText}
          onChange={this.updateSearch}
          filter={AutoComplete.fuzzyFilter}
          fullWidth={true}
        />
      </Col>
    );
  }

  getContentCard(){
    const formysTextList = makeFormysTextList(
      dataAddressSubForm, 'adressform', this.props.data, this.props.disabled
    );

    const listColumns = formysTextList.map((form,index)=>{
      return (
        <Col xs key={'listColumnsClientAddress'+index}>
          {formysTextList[index]}
        </Col>
      );
    });

    const contriesOptions = this.convertRegionToOptions(this.state.countries);

    const statesOptions = this.convertRegionToOptions(this.state.states);

    let searchText = this.props.data.type_of_address || '';
    if (this.state.searchText !== undefined) {
      searchText = this.state.searchText;
    }

    return (
      <Form
        onDisable={() => this.updateSearch(null, undefined)}
        name='address'
        parent_name='active_client_id'
        parent_id={this.props.id}
        canSubmit={this.props.canSubmit}
        action={ActionType.CLIENT.POSTFORM}
        disabled={this.props.disabled}
        isEditable
      >
        <div>
          <MediaQuery key="desktopiAddressForm" query="(min-width: 1030px)">
            <Row>
              {this.getFormsySelect(searchText,statesOptions,contriesOptions)}
              <Col key="ColumnAddressForm" xs>
                {listColumns.slice(0,3)}
              </Col>
              <Col key="secondColumnAddressForm" xs>
                {listColumns.slice(3,6)}
              </Col>
            </Row>
          </MediaQuery>
          <MediaQuery key="mobileAddressForm" query="(max-width: 1030px)">
            {this.getFormsySelect(searchText,statesOptions,contriesOptions)}
            {listColumns}
          </MediaQuery>
        </div>
      </Form>
    );
  }

  render = () => {

    return (
      <CardForm
        titleCard={this.props.title}
        subtitleCard={this.props.subtitle}
        contentCard={this.getContentCard()}
      />
    );

  }
}
