import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PET } from '../../utils/mutations';
import { Card, Form, Button } from 'react-bootstrap';

import './style.scss';

const CreatePet = () => {

    const [formState, setFormStage] = useState({
        name: '',
        species: '',
        breed: '',
        birthdate: '',
        image: '',
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
      const { data } = await createPet({
        variables: {
          ...formState,
          owner: '655cee8d8ea93e9d6f330ea2',
       },
      });

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
    <Card className='createPetCard'>
    <main className="flex-row justify-center mb-4">
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
                  placeholder="pet birthday"
                  name="birthdate"
                  type="text"
                  value={formState.birthdate}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="pet weight"
                  name="weight"
                  type="number"
                  step="0.5"
                  value={formState.weight}
                  onChange={handleChangeNum}
                />
                <input
                    className="form-input"
                    placeholder="pet height"
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