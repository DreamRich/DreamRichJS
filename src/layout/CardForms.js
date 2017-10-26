
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardTitle, CardText} from 'material-ui/Card';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


/* const muiTheme = getMuiTheme({
 card: {
 },
}); */

export default class CardForms extends Component {
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
        />
        <CardText>
          {this.props.contentCard}
        </CardText>
      </Card>
    );
  }
}


