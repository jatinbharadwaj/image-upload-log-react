import React, { useState } from "react";
import Dropzone from "react-dropzone";

function CheckImages() {
  const [imagesAsFiles, setImagesAsFiles] = useState({});
  const handleImageAsFile = (e) => {
    let files = e.target.files;
    if (files.length > 5) {
      return alert("Please Select upto 5 files or less");
    } else {
      const images = files;
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
      setImagesAsFiles((prevObject) => images);
    }
    console.log("Image as file", imagesAsFiles);
  };

  return (
    <div>
      <Dropzone>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} onChange={handleImageAsFile} />
              <div className="custom-file">
                <input className="custom-file-input" id="customFile" />
                <label className="custom-file-label" htmlFor="customFile">
                  Drag and drop or choose a files
                </label>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export { CheckImages as default };
