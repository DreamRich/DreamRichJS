import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const getElementCentered = (element) => {
  return (
    <Row style={{marginTop: '20px'}}>
      <Col xs={12}>
        <Row end="xs">
          <Col xs={6}>
            {element}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default getElementCentered;
