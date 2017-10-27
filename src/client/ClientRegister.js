import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
// import RaisedButton from 'material-ui/RaisedButton';
import {getUrl} from '../routes/RouteMap.js';
import {getHeader} from '../resources/Headers.js';
import '../stylesheet/RegisterForms.sass';
import MenuItem from 'material-ui/MenuItem';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientDependentForm from './ClientDependentForm';
import ClientBankAccountForm from './ClientBankAccountForm';
import ClientAddressForm from './ClientAddressForm';
import ClientForm from './ClientForm';
import SubStepperClient from '../layout/SubStepperClient';

class ClientRegister extends Component {

  constructor(props){
    super(props);
  }

  state = {
    canSubmit: false,
    countryListMenuItems: [],
    stateListMenuItems: [],
    type_of_address: [''],
    selectedCountry: null,
    selectedState: null,  // State region
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
    this.fetchCountrys();
    fetch('/api/client/address/type_of_address/', {
      headers: getHeader()
    }).then((response) => response.json()).then( (type_of_address) =>
      this.setState({type_of_address}));
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(ClientStore.getState());
  }

  // Convert ordinary Array to MenuItem Array to use in drop down list
  convertRegionToMenuItens = (list) => {
    var listMenuItems = list.map((region, index) => {
      let primaryText = `${region.name} - ${region.abbreviation}`;

      return (
        <MenuItem key={index} value={region.id} primaryText={primaryText} />
      );
    });

    return listMenuItems;
  }

  fetchStates = (selectedCountry) => {
    var stateListArray = {};
    var url = `${getUrl('state')}${'?country_id'}=${selectedCountry}`;

    fetch(url, {
      method: 'get',
      headers: getHeader(),
      mode: 'cors',
      cache: 'default'
    })
      .then((response) => {
        if(response.ok) {
          console.log('State list was gotten from API');
          stateListArray = response.json();
        } else {
          throw new Error ('Couldn\'t get state list from API');
        }

        return stateListArray;
      })
      .then((stateListArray) => {
        let stateListMenuItems = this.convertRegionToMenuItens(stateListArray);
        this.setState({stateListMenuItems});
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  fetchCountrys = () => {
    var countryListArray = {};

    fetch(getUrl('country'), {
      method: 'get',
      headers: getHeader(),
      mode: 'cors',
      cache: 'default'
    })
      .then((response) => {
        if(response.ok) {
          console.log('Country list was gotten from API');
          countryListArray = response.json();
        } else {
          throw new Error ('Couldn\'t get country list from API');
        }

        return countryListArray;
      })
      .then((countryListArray) => {
        let countryListMenuItems = this.convertRegionToMenuItens(countryListArray);
        this.setState({countryListMenuItems});
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  getDivider = () => {
    return (<Divider className='Divider' />);
  }

  submit = () => {
    this.form.submit();
  }

  render() {
    let subtitleCard = 'Insira as informações correspondentes as informações básicas do cliente.';
    let listInformationSteps = [
      {
        text: 'Cadastrar Cliente',
        formComponent:
          <ClientForm
            title='Cliente'
            subtitleCard={subtitleCard}
            ref={ref => this.form = ref}
            selectOption={true}
            canSubmit={this.state.canSubmit}
          />
      },
      {
        text: 'Cadastrar Endereço',
        formComponent: <ClientAddressForm id={this.state.id} canSubmit={this.state.canSubmit} />
      },
      {
        text: 'Cadastrar Conta bancária',
        formComponent: <ClientBankAccountForm id={this.state.id} canSubmit={this.state.canSubmit} />
      },
      {
        text: 'Dependentes',
        formComponent:
          <ClientDependentForm
            parent_id={this.state.id} canSubmit={this.state.canSubmit}
          />
      }
    ];

    return (
      <div style={{width:'auto'}}>
        {this.getDivider()}

        <SubStepperClient stepsNumber={3} listInformationSteps={listInformationSteps}/>

        {this.getDivider()}
      </div>
    );
  }
}

export default ClientRegister;
