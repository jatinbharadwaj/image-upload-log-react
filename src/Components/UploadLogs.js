import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";
import { db } from "../firebase";

function UploadLogs({ url, category, name, type, tags }) {
  return (
    <Container>
      <h1>Files</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {[
              "Image",
              "File Name",
              "File Type",
              "Image Size Option",
              "Tags",
              "Copy Link",
              "Action",
            ].map((_, index) => (
              <th key={_}>{_}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img width="100" height="100" src={url} alt={name} />{" "}
            </td>
            <td>{name}</td>
            <td>{type}</td>
            <td>Medium</td>
            <td>{tags}</td>
            <td>{url}</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default UploadLogs;
