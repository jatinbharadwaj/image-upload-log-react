import React from "react";

function UploadMultiplefiles() {
  const [files, setFiles] = useState([]);

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
    }
  };

  const uploadTask = firebase
    .storage()
    .ref()
    .child(`your/file/path/${file.name}`)
    .put(file);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Progress: ${progress}%`);
      if (snapshot.state === firebase.storage.TaskState.RUNNING) {
        console.log("file uploading...");
      }
      // ...etc
    },
    (error) => console.log(error.code),
    async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
      console.log(downloadURL);
      // the web storage url for our file
    }
  );

  return (
    <div>
      <form>
        <label>
          Select Files
          <input type="file" multiple onChange={onFileChange} />
        </label>
        <button onClick={onUploadSubmission}>Upload</button>
      </form>
    </div>
  );
}

export default UploadMultiplefiles;
