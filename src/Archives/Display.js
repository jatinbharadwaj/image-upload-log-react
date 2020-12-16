import React, { Component } from "react";
import { db } from "../firebase";
export default class Photos extends Component {
  state = {
    photos: [],
  };
  componentDidMount() {
    let images = [];
    db.collection("database1")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots

          let imageData = {
            url: doc.data().imgUrl,
            imgType: doc.data().imgType,
            imgCategory: doc.data().imgCategory,
            imgTags: doc.data().imgTags,
          };
          images.push(imageData);
        });
      });
    console.log("here", images);
    this.setState({ photos: images });
  }
  render() {
    const items = this.state.photos;

    return (
      <div className="container-fluid pt-3">
        <div className="card-columns">
          {items.map((i) => (
            <div className="card">
              <img className="card-img-top materialboxed" src={i.url} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
