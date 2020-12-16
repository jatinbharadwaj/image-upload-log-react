import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { db, storage } from "../firebase";
// import UploadLogs from "./ImageUploader";

function UploadImage(imgType, imgUrl, imgCategory, imgTags) {
  const allInputs = { imgUrl: "", imgType: "", imgCategory: "", imgTags: "" };
  const [imagesAsFiles, setImagesAsFiles] = useState({});
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  // const handleImageAsFile = (e) => {
  //   let files = e.target.files;
  //   if (files.length > 5) {
  //     alert("Please Select upto 5 files or less");
  //   } else {
  //     const images = files;
  //     for (let i = 0; i < images.length; i++) {
  //       console.log(`image type ${typeof images.item(i)}`);
  //     }
  //     setImagesAsFiles((prevObject) => images);
  //   }
  //   console.log("Image as file", imagesAsFiles);
  // };
  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    if (imageAsUrl === "") {
      alert("please select valid file type");
      console.error(
        `not an image, the image file is a ${typeof imagesAsFiles} `
      );
    }
    for (let i = 0; i < imagesAsFiles.length; i++) {
      const uploadTask = storage
        .ref(`/images/${imagesAsFiles.item(i).name}`)
        .put(imagesAsFiles.item(i));

      uploadTask.on(
        "state_changed",
        (snapShot) => {
          console.log("Snapshot", snapShot);
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
              setImageAsUrl((prevObject) => ({
                imgUrl: fireBaseUrl,
                imgType: typeof imagesAsFiles.item(i),
                imgCategory: "Asset",
                imgTags: "icon",
              }));

              // console.log(imageAsUrl);
            });
          db.collection("database1")
            .add(imageAsUrl)
            .then((res) => {
              console.log("Firebase Done");
            });
        }
      );
    }
  };
  return (
    <div>
      <Dropzone>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              {/* <input {...getInputProps()} onChange={handleImageAsFile} /> */}
              <div className="custom-file">
                <input className="custom-file-input" id="customFile" />
                <label className="custom-file-label" htmlFor="customFile">
                  Drag and drop or choose a files
                </label>
              </div>
            </div>
            <button onClick={handleFireBaseUpload}>Click for upload</button>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default UploadImage;
