import React, { useEffect, useState } from "react";
import { db } from "../firebase";

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
  const [ImageData, setImageData] = useState([]);
  const fetchImageData = async () => {
    const response = db.collection("database1");
    const data = await response.get();
    data.docs.forEach((item) => {
      setImageData([...ImageData, item.data()]);
    });
  };
  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <div>
      {ImageData &&
        ImageData.map((Image) => {
          return (
            <div className="Image-container">
              <img src={Image.imgUrl} />
              <p>{Image.imgType}</p>
            </div>
          );
        })}
    </div>
  );
}

export default DisplayImage;
