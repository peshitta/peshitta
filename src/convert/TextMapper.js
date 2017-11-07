import React from 'react';
import {
  Button,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';

export default class TextMapper extends React.Component {
  render() {
    return (
      <Container>
        <FormGroup tag="fieldset">
          <Label style={{ fontSize: 'larger' }}>Source text</Label>
          <Row>
            <Col>
              <FormGroup check>
                <Label check title="Estrangela ASCII code">
                  <Input type="radio" name="source" checked />Estrangela
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check title="Syriac Unicode">
                  <Input type="radio" name="source" />Syriac
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check title="Hebrew Unicode">
                  <Input type="radio" name="source" />Hebrew
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check>
                <Label check title="Arabic Unicode">
                  <Input type="radio" name="source" />Arabic
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check title="CAL ASCII Code">
                <Label check>
                  <Input type="radio" name="source" />CAL Code
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check title="Sedra 3 ASCII code">
                  <Input type="radio" name="source" />Sedra
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="text"
            id="text"
            rows="3"
            title="Source text"
          />
        </FormGroup>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <Button>Convert</Button>
          </Col>
        </Row>
        <FormGroup tag="fieldset">
          <Label style={{ fontSize: 'larger' }}>Mapped text</Label>
          <Row>
            <Col>
              <FormGroup check>
                <Label check title="IPA Phonetic">
                  <Input type="radio" name="result" checked />IPA Code
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check title="Latin Phonetic">
                <Label check>
                  <Input type="radio" name="result" />Latin
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check title="Estrangela ASCII code">
                  <Input type="radio" name="result" />Estrangela
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check>
                <Label check title="Syriac Unicode">
                  <Input type="radio" name="result" />Syriac
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check title="Hebrew Unicode">
                <Label check>
                  <Input type="radio" name="result" />Hebrew
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check title="Arabic Unicode">
                <Label check>
                  <Input type="radio" name="result" />Arabic
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check>
                <Label check title="CAL ASCII Code">
                  <Input type="radio" name="result" />CAL Code
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check title="Sedra ASCII Code">
                  <Input type="radio" name="result" />Sedra
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check title="Remove vowels/diacritics">
                  <Input type="checkbox" />No Niqqud
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="mappedWord"
            id="mappedWord"
            rows="3"
            readOnly
            title="Mapped text"
          />
        </FormGroup>
      </Container>
    );
  }
}
