import React from "react";
import "./ImageUploader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Form,
  Row,
  Col,
} from "react-bootstrap";

function ImageUploader() {
  return (
    <Container>
      <h1>Image Uploader</h1>
      <Form>
        <Form.Text text="secondary">
          Image size should be less than 8MB. Supported file formats: jpeg. png,
          jpg, .tiff
        </Form.Text>
        <Form.Group as={Row} controlId="category">
          <Form.Label column sm={3} xs={3}>
            File Category Type:
          </Form.Label>
          <Col sm={9} xs={9}>
            <Form.Control as="select">
              <option>.jpeg</option>
              <option>.png</option>
              <option>.jpg</option>
              <option>.tiff</option>
              {/* <option>5</option> */}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="uploading">
          <Form.Label column sm={3} xs={3}>
            Import image
          </Form.Label>
          <Col sm={9} xs={9}>
            <Form.File id="uploadfile" column sm={2} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="addTag">
          <Form.Label column sm={3}>
            Add tag
          </Form.Label>
          <Col sm={9}>
            <Form.Control as="textarea" rows={3} />
          </Col>
        </Form.Group>
      </Form>
      <div className="added__tags"></div>
    </Container>
  );
}

export default ImageUploader;
