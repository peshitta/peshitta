import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Form
} from 'reactstrap';

export default class NumberMapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <Label style={{ fontSize: 'larger' }}>
            Number to/from Aramaic Letters
          </Label>
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick(1)}
              active={this.state.rSelected === 1}
              title="Estrangela ASCII code"
            >
              Estrangela
            </Button>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick(2)}
              active={this.state.rSelected === 2}
              title="Syriac Unicode"
            >
              Syriac
            </Button>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick(3)}
              active={this.state.rSelected === 3}
              title="Hebrew Unicode"
            >
              Hebrew
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick(4)}
              active={this.state.rSelected === 4}
              title="Arabic Unicode"
            >
              Arabic
            </Button>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick(5)}
              active={this.state.rSelected === 5}
              title="CAL ASCII Code"
            >
              CAL Code
            </Button>
            <Button
              color="primary"
              onClick={() => this.onRadioBtnClick(6)}
              active={this.state.rSelected === 6}
              title="Sedra ASCII Code"
            >
              Sedra
            </Button>
          </ButtonGroup>
          &nbsp;
          <ButtonGroup>
            <Button
              color="primary"
              onClick={() => this.onCheckboxBtnClick(1)}
              active={this.state.cSelected.includes(1)}
              title="For letter input, disregard position"
            >
              Non positional
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup tag="fieldset">
          <Row>
            <Col />
          </Row>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="number"
            id="number"
            rows="3"
            title="Number/Letters to convert"
          />
        </FormGroup>
        <FormGroup>
          <Col style={{ textAlign: 'center' }}>
            <Button>&nbsp;Convert&nbsp;</Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="convertedNumber"
            id="convertedNumber"
            rows="3"
            readOnly
            title="Converted number"
          />
        </FormGroup>
      </Container>
    );
  }
}
