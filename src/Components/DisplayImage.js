import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { db } from "../firebase";
import UploadLogs from "./UploadLogs";

// function DisplayImage() {
//   const [imageData, setImageData] = useState({});

//   useEffect(() => {
//     let images = [];
//     db.collection("database1")
//       .get()
//       .then(function (querySnapshot) {

//         querySnapshot.forEach(function (doc) {
//           // doc.data() is never undefined for query doc snapshots

//           let imgData = {
//             url: doc.data().imgUrl,
//             imgType: doc.data().imgType,
//             imgCategory: doc.data().imgCategory,
//             imgTags: doc.data().imgTags,
//           };
//           images.push(imgData);
//         });
//       });
//     setImageData((prevObject) => images);
//   }, []);

//   return <div></div>;
// }

function DisplayImage() {
  const [images, setImages] = useState([]);

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
      <h1>Files</h1>
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
              <tr>
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
                <td>Medium</td>
                <td>{image.tags}</td>
                <td>
                  <a href={image.url} />
                  🔗
                </td>
                <td>Delete</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default DisplayImage;
