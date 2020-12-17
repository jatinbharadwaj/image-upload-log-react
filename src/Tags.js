import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

function Tags() {
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

  console.log("AddTags", addTag);
  //   const addTags = addTag.map((tag) => (

  //   ));
  return (
    <Container fluid>
      {buttonsTags}
      <p>{addTag}</p>
    </Container>
  );
}

export default Tags;
