
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit.js';


export default class CardForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    titleCard: PropTypes.string,
    subtitleCard: PropTypes.string,
    contentCard: PropTypes.object,
  }

  render = () => {
    // Optional backgroundColor: #FAFAFA
    return (
      <Card className='Card' >
        <CardTitle
          title={this.props.titleCard}
          subtitle={this.props.subtitleCard}
        >
          <IconButton
            tooltip="Editar formulário"
            tooltipPosition="bottom-left"
            style={{float: 'right'}}
          >
            <Edit />
          </IconButton>

        </CardTitle>
        <CardText>
          {this.props.contentCard}
        </CardText>
      </Card>
    );
  }
}
