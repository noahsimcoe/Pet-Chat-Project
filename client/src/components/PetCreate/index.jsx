import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PET } from '../../utils/mutations';

const CreatePet = () => {
    const [formState, setFormStage] = useState({
        name: '',
        species: '',
        breed: '',
        ownerId: '',
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
      [name]: checked, // Set the boolean value directly from checked attribute
    });
  };

  const handleChangeNum = (event) => {
    const { name, value } = event.target;
    // Convert the input value to a float and update the form state
    setFormStage({
      ...formState,
      [name]: parseFloat(value), // Convert the input value to a float
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createPet({
        variables: { ...formState },
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
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
                    type="number" // Use type number for float values
                    step="0.5" // Specify step attribute for decimal values (optional)
                    value={formState.height}
                    onChange={handleChangeNum}
                    />
                <label>Vaccinated?</label>
                <input
                    className="form-input"
                    placeholder="pet vaccinations"
                    name="vaccinations"
                    type="checkbox" // Use type checkbox for boolean values
                    checked={formState.vaccinations} // Use checked attribute for checkbox
                    onChange={handleChangeCheckbox} // Use onChange for handling checkbox changes
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
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
  );

};

export default CreatePet;