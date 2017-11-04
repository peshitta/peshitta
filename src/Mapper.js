import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';

export default class Mapper extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <FormGroup tag="fieldset">
            <legend>Source</legend>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="source" />CAL&nbsp;&nbsp;&nbsp;
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="source" />Estrangela
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="source" />Syriac
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="source" />Hebrew
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="source" />Arabic
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
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
              rows="5"
              placeholder="Enter Text"
            />
          </FormGroup>
          <Row>
            <Col style={{textAlign: 'center'}}>
              <Button>&nbsp;Map&nbsp;</Button>
            </Col>
          </Row>
          <FormGroup tag="fieldset">
            <legend>Result</legend>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />CAL&nbsp;&nbsp;&nbsp;
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />Estrangela
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />Syriac
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />IPA
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />Hebrew
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />Arabic
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />Sedra
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="result" />Latin
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
              rows="5"
              readOnly
              placeholder="Result"
            />
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
