import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";

function UploadLogs() {
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
            <td>1</td>
            {Array.from({ length: 7 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default UploadLogs;
