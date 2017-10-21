
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  card: {
    titleColor: '#636363',
    subtitleColor: '#c7c7c7',
  },
});

export default class CardForms extends Component {
  constructor(props){
    super(props);
  }

  render = () => {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card style={{backgroundColor: '#FAFAFA'}}>
          <CardTitle
            title={this.props.titleCard}
            subtitle={this.props.subtitleCard}
          />
          <CardText>
            {this.props.contentCard}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

CardForms.propTypes = {
  titleCard: PropTypes.string,
  subtitleCard: PropTypes.string,
  contentCard: PropTypes.object,
};
