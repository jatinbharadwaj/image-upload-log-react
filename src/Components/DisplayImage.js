import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function DisplayImage() {
  const allOutputs = [];
  const [imageData, setImageData] = useState(allOutputs);

  useEffect(() => {
    let images = [];
    db.collection("database1")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data());
          let imageData = {
            url: doc.data().imgUrl,
            imgType: doc.data().imgType,
            imgCategory: doc.data().imgCategory,
            imgTags: doc.data().imgTags,
          };
          images.push(imageData);
        });
      });
  });
  // this.setState({ photos: images });
  //   });
  return <div></div>;
}

export default DisplayImage;
