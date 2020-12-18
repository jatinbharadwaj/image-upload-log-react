import React, { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { auth, db } from "../firebase";
import Admin from "./Admin";
import { useStateValue } from "./StateProvider";
import UploadLogs from "../Archives/UploadLogs";

function DisplayImage() {
  const [images, setImages] = useState([]);

  const [{ user }, dipatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imagesCollection = await db.collection("database1").get();
      setImages(
        imagesCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchImages();
  }, []);

  return (
    <Container>
      {user &&
      (user.email === "admin1@gmail.com" ||
        user.email === "admin2@gmail.com") ? (
        <Admin />
      ) : (
        <p></p>
      )}

      <h1>Display Images Logs</h1>
      <Table responsive>
        <thead>
          <tr>
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
          {images.map((image) => {
            return (
              <tr className={`id - ${image.name}`}>
                <td>
                  {" "}
                  <img
                    width="100"
                    height="100"
                    src={image.url}
                    alt={image.name}
                  />{" "}
                </td>
                <td>{image.name}</td>
                <td>{image.category}</td>
                <td>
                  <DropdownButton id={`size-${image.name}`} title="Select Size">
                    <Dropdown.Item as="button" value="small">
                      Small
                    </Dropdown.Item>
                    <Dropdown.Item as="button" value="medium">
                      Medium
                    </Dropdown.Item>
                    <Dropdown.Item as="button" value="large">
                      Large
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>{image.tags}</td>
                <td>
                  <a href={image.url}>🔗 </a>
                </td>
                <td>🗑</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default DisplayImage;
