import { useState } from 'react'; // useState hook
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useEffect } from 'react';

import './style.scss';

export default function Register() {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    // ends function if you didn't select an image
    if (imageUpload == null) return
    // helps ensure all images have different names
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      // confirmation that image was uploaded
      // alert("Image Uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      //console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          // setting new list of images to the items from the cloud storage
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, [])

  return (
    <div id="register-page">
        <h1>Register a Pet</h1>
        <h2>**Placeholder text for where the rest of 'pet creation' inputs will be**</h2>

        <div class="add-picture-section">
          <h4>Add a picture of your animal below</h4>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />
          <button onClick={uploadImage}>Upload Pet Picture</button>
        </div>

        <div class="image-container">
          {imageList.map((url) => {
            return <img src={url} />;
          })}
        </div>
    </div>
  );
};

