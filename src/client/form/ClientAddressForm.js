import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubForm from '../../components/SubForm';
// import {routeMap} from '../routes/RouteMap';
// import {getData} from '../resources/Requests';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import ActionType from '../../actions/ActionType';
import AppDispatcher from '../../AppDispatcher';
import ClientStore from '../../stores/ClientStore';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import CardForm from '../../components/CardForm';
import {FormsySelect, FormsyAutoComplete} from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';


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
    countries: PropTypes.array,
    states: PropTypes.array,
    addressType: PropTypes.array,
    canSubmit: PropTypes.bool,
    data: PropTypes.object,
  }

  static defaultProps = {
    countries: [],
    states: [],
    addressType: [],
    data: {state: {}},
  }

  updateSearch = (e, searchText) => {
    AppDispatcher.dispatch({
      action: ActionType.CLIENT.ADDRESSTEXT,
      searchText: searchText
    });
  }

  handleUpdate = () => {
    const {searchText} = ClientStore.getState();
    this.setState({searchText});
  }

  componentWillMount = () => this.setState({
    listener: ClientStore.addListener(this.handleUpdate)
  })

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  fetchStates = (e, selectedCountry) => {
    AppDispatcher.dispatch({
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

  getStateList = () => {

    const hasStateList = this.props.states.find(
      state => state.id === this.props.data.state.id
    );

    if (hasStateList === undefined && this.props.data.state.id !== undefined) {
      this.fetchStates(null, this.props.data.state.country_id);
    }

  }

  getContentCard(){
    const formysTextList = makeFormysTextList(
      dataAddressSubForm, 'adressform', this.props.data
    );

    const listColumns = formysTextList.map((form,index)=>{
      return (
        <Col xs key={'listColumnsClientAddress'+index}>
          {formysTextList[index]}
        </Col>
      );
    });

    const contriesOptions = this.convertRegionToOptions(this.props.countries);

    this.getStateList();

    const statesOptions = this.convertRegionToOptions(this.props.states);
    let searchText = this.props.data.type_of_address;
    if (this.state.searchText !== undefined && this.state.searchText !== null) {
      console.log('xxx', this.state.searchText, this.state.searchText !== undefined, this.state.searchText !== null);
      searchText = this.state.searchText;
    }


    return (
      <div>
        <Row>
          <FormsySelect
            name="country"
            floatingLabelText="País"
            maxHeight={300}
            onChange={this.fetchStates}
            value={this.props.data.state.country_id}
          >
            {contriesOptions}
          </FormsySelect>
          <FormsySelect
            name="state_id"
            floatingLabelText="Estado"
            maxHeight={300}
            value={this.props.data.state.id}
          >
            {statesOptions}
          </FormsySelect>
          {listColumns[6]}
        </Row>
        <Row>
          {listColumns.slice(0,3)}
        </Row>
        <Row>
          {listColumns.slice(3,6)}
        </Row>
        <Row>
          <FormsyAutoComplete
            dataSource={this.props.addressType}
            name="type_of_address"
            validations="isWords"
            validationError={wordsError}
            hintText="Casa, apartamento, etc."
            floatingLabelText="Tipo de Endereço"
            searchText={searchText}
            onChange={this.updateSearch}
          />
        </Row>
      </div>
    );
  }

  render = () => {

    return (
      <SubForm
        name='address'
        parent_name='active_client_id'
        parent_id={this.props.id}
        canSubmit={this.props.canSubmit}
        action={ActionType.CLIENT.POSTFORM}
      >
        <CardForm
          titleCard="Endereço"
          subtitleCard="Insira as informações correspondentes ao endereço."
          contentCard={this.getContentCard()}
        />
      </SubForm>

    );
  }
}
