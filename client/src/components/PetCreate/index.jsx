import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PET } from '../../utils/mutations';
import { Card, Form, Button } from 'react-bootstrap';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreatePet = () => {

    const [formState, setFormState] = useState({
        name: '',
        species: '',
        breed: '',
        weight: '',
        vaccinations: '',
    });

    const [startDate, setStartDate] = useState(new Date());

    const [createPet, {error, data}] =useMutation(CREATE_PET);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    setFormState({
      ...formState,
      [name]: checked,
    });
  };

  const handleChangeNum = (event) => {
    const { name, value } = event.target;
    setFormState({
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
          birthdate: startDate,
        },
      });

      setFormState({
        name: '',
        species: '',
        breed: '',
        birthdate: '',
        weight: '',
        vaccinations: '',
      });

      setStartDate(new Date());

      // notification that appears
      toast.success("Your pet has been created!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2250, // duration of notification
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
    if (imageUpload == null) return
    // helps ensure all images have different names
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
        setNewImageUrl(url);
      });
    });
  };

  // creating a new array of the newest images
  useEffect(() => {
    listAll(imageListRef).then((response) => {
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
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Species"
                  name="species"
                  type="text"
                  value={formState.species}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Breed/Type"
                  name="breed"
                  type="text"
                  value={formState.breed}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Weight (lbs)"
                  name="weight"
                  type="number"
                  step="0.5"
                  value={formState.weight}
                  onChange={handleChangeNum}
                />
                <div class="form-group">
                  <label for="html" class="form-label">Birthday</label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="custom-datepicker"/>
                </div>
                <div class="vaxx">
                <label for="vaccinations" class="form-label">Vaccinated?</label>
                <input
                    id="vaccinations"
                    className="custom-checkbox"
                    placeholder="Vaccinationed?"
                    name="vaccinations"
                    type="checkbox"
                    checked={formState.vaccinations}
                    onChange={handleChangeCheckbox}
                />
                </div>
                <div id="register-page">
                  <div class="add-picture-section">
                    <label for="file-upload" class="form-label">Upload Picture</label>
                    <div class="center">
                      <input
                        id="file-upload"
                        type="file"
                        onChange={(event) => {
                          setImageUpload(event.target.files[0])
                        }}
                        className="custom-file-input"
                      />
                    </div>
                  </div>
                </div>
                <button
                  class="submit-btn"
                  type="submit">
                  Submit
                </button>
              </form>
            }
            <div>
                <ToastContainer
                  theme="colored"
                  pauseOnHover
                />
              </div>

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