import React, { useState } from "react";
import "./CSS/ImageUploader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropzone from "react-dropzone";
import { db, storage } from "../firebase";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Upload from "../Archives/UploadMultiplefiles";
import UploadImage from "./UploadImage";
import CheckImages from "./CheckImages";
import Tags from "./Tags";

function ImageUploader() {
  //=============================== ADD TAG ================
  const allTags = [
    "Icons",
    "AANA1470-1",
    "AANA1483",
    "MANA1483-2",
    "AANAAST",
    "AANAAST",
    "AANAAST",
    "ANALES",
    "ANAS412-2.",
    "AANAS4E3-1",
    "AANA148J",
    "AANA1414-1",
    "AANAI",
    "KANTE",
    "AANA1456",
    "AANA1426-2",
    "AANAS-2",
    "AANAS426-1",
    "AANASS",
    "AANA1466-2",
    "AANA412-1",
  ];

  const [tags, setTags] = useState(allTags);
  const [addTag, setAddTag] = useState([]);

  console.log(addTag);
  const buttonsTags = tags.map((tag) => (
    <>
      <Button
        variant="warning"
        value={tag}
        onClick={(e) => {
          setAddTag((obj) => [...obj, e.target.value + "    "]);
        }}
      >
        {tag} +
      </Button>
      {"    "}
    </>
  ));
  // =========================== ADD TAG END =========================

  const [category, setCategory] = useState("");

  console.log(category);

  const [imagesAsFiles, setImagesAsFiles] = useState({});

  console.log("Image as file", imagesAsFiles);

  const handleImageAsFile = (e) => {
    const images = e.target.files;
    if (images.length > 5) {
      return alert("Please Select upto 5 files or less");
    } else {
      for (let i = 0; i < images.length; i++) {
        let img = images.item(i);
        if (
          img.type !== "image/jpg" &&
          img.type !== "image/png" &&
          img.type !== "image/jpeg" &&
          img.type !== "image/tiff"
        ) {
          return alert(`Please choose the right extention of ${img.name}`);
        } else if (img.size > 8000000) {
          return alert("Maximum size should be less than 8 Mb");
        }
      }
      setImagesAsFiles(images);
    }
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload...");

    for (let i = 0; i < imagesAsFiles.length; i++) {
      const uploadTask = storage
        .ref(`/images/${imagesAsFiles.item(i).name}`)
        .put(imagesAsFiles.item(i));

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(imagesAsFiles.item(i).name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              db.collection("database1")
                .add({
                  url: fireBaseUrl,
                  type: imagesAsFiles.item(i).type,
                  category: category,
                  tags: addTag,
                  name: imagesAsFiles.item(i).name,
                  createdAt:
                    new Date().getHours().toLocaleString() +
                    new Date().getMinutes().toLocaleString() +
                    new Date().getSeconds().toLocaleString(),
                })
                .then((res) => {
                  console.log("Firebase Done");
                });
            });
        }
      );
    }
  };

  return (
    <Container>
      <h1>Image Uploader</h1>
      <br />
      <Form onSubmit={handleFireBaseUpload}>
        <Form.Text text="secondary">
          Image size should be less than 8MB. Supported file formats: jpeg. png,
          jpg, .tiff
        </Form.Text>
        <Form.Group as={Row} controlId="category">
          <Form.Label column sm={3} xs={3}>
            File Category Type:
          </Form.Label>
          <Col sm={9} xs={9}>
            <Form.Control
              as="select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Assets">Assets</option>
              <option value="Banner">Banner</option>
              <option value="Logo">Logo</option>
              <option vlaue="Other">Other</option>
              {/* <option>5</option> */}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="uploading">
          <Form.Label column sm={3} xs={3}>
            Import image
          </Form.Label>
          <Col sm={9} xs={9}>
            <div>
              <Dropzone>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input
                        {...getInputProps()}
                        onChange={handleImageAsFile}
                      />
                      <div className="custom-file">
                        <input className="custom-file-input" id="customFile" />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Drag and drop or choose a files
                        </label>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          Recently Used Tag:
          {/* <Tags /> */}
          <Container fluid>{buttonsTags}</Container>
        </Form.Group>

        {/* <Form.Group as={Row} controlId="addTag">
          <Col sm={12}>
            <Row>
              <Form.Control as="textarea" />
              <Button>Add Tag</Button>
            </Row>
            <div className="text">{addTag}</div>
          </Col>
        </Form.Group> */}

        <InputGroup>
          <FormControl
            placeholder="Add New Tag"
            aria-label=""
            aria-describedby=""
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                setAddTag((obj) => [...obj, e.target.value + "    "]);
              }}
            >
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <div className="text">{addTag}</div>

        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </Container>
  );
}

export default ImageUploader;
