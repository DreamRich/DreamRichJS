import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
// import PatrimonyForm from './PatrimonyForm';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import RealeStateSubForm from './RealeStateSubForm.js';
import ExtraSubForm from './ExtraSubForm';
import PatrimonyStore from '../stores/PatrimonyStore';
import ActiveForm from './ActiveForm';

export default class AssetSubStepper extends React.Component {

  static propTypes = {
    stepsNumber: PropTypes.number,
    realestates: PropTypes.array,
    companyparticipations: PropTypes.array,
    equipments: PropTypes.array,
    activemanager: PropTypes.object,
    actives: PropTypes.array,
    canSubmit: PropTypes.bool,
    id: PropTypes.number,
  }

  state = {stepIndex: 0}

  componentWillMount = () => this.setState({
    listener: PatrimonyStore.addListener(this.handleChange)
  })

  handleChange = () => {
    // Only get some attributes from store
    const { stepIndex } = PatrimonyStore.getState();
    if (stepIndex < this.props.stepsNumber || stepIndex >= 0) {
      this.setState({stepIndex});
    } else {
      this.setStep(this.state.stepIndex);
    }
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
    AppDispatcher.dispatch({
      action: ActionType.PATRIMONY.SETSTEP,
      stepIndex: 0
    });
  }

  handleNext = () => {
    // Only go to next form if have more steps :)
    const {stepIndex} = this.state;
    if (stepIndex < this.props.stepsNumber) {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.SUBMIT,
        canSubmit: true,
      });
    }
  };

  handlePrev = () => {
    this.setStep(this.state.stepIndex-1);
  };

  setStep = (stepIndex) => AppDispatcher.dispatch({
    action: ActionType.PATRIMONY.SETSTEP,
    stepIndex: stepIndex
  })

  renderStepActions(step) {
    // To reduce the lines of code amount of getContentSteps
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Salvar e próximo"
          primary={true}
          onClick={this.handleNext.bind(this, step)}
          style={{float: 'right'}}
        />
        {step > 0 && (
          <RaisedButton
            label="Formulário anterior"
            onClick={this.handlePrev}
            style={{float: 'left'}}
          />
        )}
      </div>
    );
  }

  getContentSteps(){
    const listInformationSteps = [
      {text: 'Bens imóveis',
        formComponent: <RealeStateSubForm
          parent_id={this.state.id}
          data={this.props.realestates}
        />
      },
      {text: 'Participação em empresas',
        formComponent: <ExtraSubForm
          parent_id={this.state.id}
          name='companyparticipations'
          title="Participação em empresa"
          data={this.props.companyparticipations}
        />
      },
      {text: 'Equipamentos',
        formComponent: <ExtraSubForm
          parent_id={this.state.id}
          name='equipments'
          title="Equipamentos"
          data={this.props.equipments}
        />
      },
      {text: 'Ativos',
        formComponent:
          <ActiveForm
            parent_id={this.props.id}
            manager={this.props.activemanager}
            data={this.props.actives}
            canSubmit={this.props.canSubmit}
          />
      }
    ];
    // Only enable click in some step if have the dependency of main form
    // this is a id in the state
    const stepsList = listInformationSteps.map((obj, index) => {
      return (
        <Step key={obj.text} disabled={this.props.id === undefined}>
          <StepButton onClick={() => this.setStep(index)}>
            {obj.text}
          </StepButton>
          <StepContent>
            {obj.formComponent}
            {this.renderStepActions(index)}
          </StepContent>
        </Step>
      );
    });
    return stepsList;
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <Stepper
        activeStep={stepIndex}
        linear={false}
        orientation="vertical"
      >
        {this.getContentSteps()}
      </Stepper>
    );
  }
}
