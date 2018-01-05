import React, {Component} from 'react';
import TableFormHOC from '../../components/tables/TableFormHOC';
import ActionType from '../../actions/ActionType';
import {routeMap} from '../../routes/RouteMap';
import ProtectionStore from '../../stores/ProtectionStore';
import RaisedButton from 'material-ui/RaisedButton';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
import RemoveIcon from 'material-ui/svg-icons/av/not-interested';
import {Card,
  CardActions,
  CardMedia,
} from 'material-ui/Card';

const TableForm = TableFormHOC(
  {
    submit: ActionType.PROTECTION.POSTMULTIFORM,
    add: ActionType.PROTECTION.ADD,
    remove: ActionType.PROTECTION.REMOVE,
    select: ActionType.PROTECTION.SELECT,
  },{
    parentId: 'protection_manager_id',
    route: routeMap.life_insurances,
    state: 'life_insurances',
    title: 'Seguro de vida',
    subtitleCard: 'Adicione um seguro de vida',
    headers: [
      {value: 'Atual', name: 'actual', type: 'ToggleField', width: 200},
      {value: 'Nome', name: 'name', type: 'TextField', width: 200},
      {value: 'Valor a receber', name: 'value_to_recive', type: 'TextField', width: 200},
      {value: 'Valor pago anualmente', name: 'value_to_pay_annual', type: 'TextField', width: 200},
      {value: 'Recuperável', name: 'redeemable', type: 'ToggleField', width: 200},
      {value: 'Tem ano de pagamento', name: 'has_year_end', type: 'ToggleField', width: 200},
      {value: 'Ano do último pagamento', name: 'year_end', type: 'TextField', width: 200},
    ],
  },
  ProtectionStore,
  () => {
    const registers = ProtectionStore.getState().life_insurances;
    return {registers};
  }
);

export {TableForm};

export default class LifeInsuranceForm extends Component {

  state = {video: false, url: ''}

  changeVideo = (url) => {
    this.setState({url});
  }


  render = () => {
    return (
      <div>
        <Card>
          <CardActions>
            <RaisedButton
              icon={<RemoveIcon />}
              onClick={this.changeVideo.bind(this, '')}
              label="Não exibir Video"
              primary
            />
            <RaisedButton
              icon={<PlayIcon />}
              onClick={this.changeVideo.bind(this, 'EYWEwJWwA5w')}
              label="1" />
            <RaisedButton
              icon={<PlayIcon />}
              onClick={this.changeVideo.bind(this, 'JdyGABwBfbw')}
              label="2" />
            <RaisedButton
              icon={<PlayIcon />}
              onClick={this.changeVideo.bind(this, 'T0hb0c6gt7o')}
              label="3" />
          </CardActions>
          <CardMedia>
            {this.state.url !== '' &&
              <iframe
                height='320'
                width='420'
                src={`https://www.youtube.com/embed/${this.state.url}?iv_load_policy=3&controls=2&modestbranding=1&playsinline=0&showinfo=0`}
                allowFullScreen='allowfullscreen'
                frameBorder='0'
              />
            }
          </CardMedia>
        </Card>

        <TableForm {...this.props} />
      </div>
    );
  }

}
