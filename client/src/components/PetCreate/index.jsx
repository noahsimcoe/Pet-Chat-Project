import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PET } from '../../utils/mutations';
import { Card, Form, Button } from 'react-bootstrap';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useEffect } from 'react';
import './style.scss';

const CreatePet = () => {

    const [formState, setFormStage] = useState({
        name: '',
        species: '',
        breed: '',
        birthdate: '',
        weight: '',
        height: '',
        vaccinations: '',
    });

    const [createPet, {error, data}] =useMutation(CREATE_PET);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormStage({
      ...formState,
      [name]: value,
    });
  };

  const handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    setFormStage({
      ...formState,
      [name]: checked,
    });
  };

  const handleChangeNum = (event) => {
    const { name, value } = event.target;
    setFormStage({
      ...formState,
      [name]: parseFloat(value),
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Wait for the uploadImage() function to finish before proceeding
      await uploadImage();

      const { data } = await createPet({
        variables: {
          ...formState,
          image: newImageUrl,
        },
      });

      // Rest of your code that relies on the image upload being completed
    } catch (err) {
      console.error(err);
    }
  };

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    // ends function if you didn't select an image
    // console.log("test");
    if (imageUpload == null) return
    // helps ensure all images have different names
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      // confirmation that image was uploaded
      // alert("Image Uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
        setNewImageUrl(url);
      });
    });
  };

  // creating a new array of the newest images
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
    <>
    <Card className='createPetCard'>
    <main className="flex-row justify-center mb-4">
      <h2>Register a Pet Below!</h2>
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className="card-body">
            {
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="pet name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="pet species"
                  name="species"
                  type="text"
                  value={formState.species}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="pet breed"
                  name="breed"
                  type="text"
                  value={formState.breed}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="birthday month"
                  name="birthdate"
                  type="text"
                  value={formState.birthdate}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="pet weight (lbs)"
                  name="weight"
                  type="number"
                  step="0.5"
                  value={formState.weight}
                  onChange={handleChangeNum}
                />
                <input
                    className="form-input"
                    placeholder="pet height (inches)"
                    name="height"
                    type="number"
                    step="0.5"
                    value={formState.height}
                    onChange={handleChangeNum}
                    />
                <div>
                <label>Vaccinated?</label>
                <input
                    className="form-input"
                    placeholder="pet vaccinations"
                    name="vaccinations"
                    type="checkbox"
                    checked={formState.vaccinations}
                    onChange={handleChangeCheckbox}
                />
                </div>
                <div id="register-page">
                  <div class="add-picture-section">
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0])
                      }}
                    />
                    {/* <button onClick={uploadImage}>Upload Pet Picture</button> */}
                  </div>
                  </div>
                <button
                  className="btn btn-block btn-info submit-btn"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            }

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </Card>
    </>
  );

};

export default CreatePet;