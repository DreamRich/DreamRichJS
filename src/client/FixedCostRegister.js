import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';

class FixedCostRegister extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(ClientStore.getState());
  }

  render() {
    return (
      <div>
        <h1> Cadastro de custo fixo </h1>

        <Paper className="Paper">

          <Formsy.Form
            ref={(form) => this.form = form}
            name="fixed_cost"
          >
            <FormsyText
              name="home"
              hintText="Custo com casa"
              floatingLabelText="Casa"
            />
            <FormsyText
              name="electricity_bill"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="gym"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="taxes"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="car_gas"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="insurance"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="cellphone"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="health_insurance"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="supermarket"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="housekeeper"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="beauty"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="internet"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="netflix"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="recreation"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="meals"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="appointments"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="drugstore"
              hintText=""
              floatingLabelText=""
            />
            <FormsyText
              name="extras"
              hintText=""
              floatingLabelText=""
            />
          </Formsy.Form>

          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={() => this.baseForm.submit()}
          />

        </Paper>

      </div>
    );
  }
}

export default FixedCostRegister;
