import React, {Component} from 'react';
import ArrearageTable from './ArrearageTable';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class ArrearageDashboard extends Component {

  render() {
    return(
      <div>
        <Card>
          <CardHeader
            title="Exemplo Dívida"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <ArrearageTable />
          </CardText>
        </Card>
      </div>
    );
  }

}

export default ArrearageDashboard;
