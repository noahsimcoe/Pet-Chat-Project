import './style.scss';
import CatComponent from '../../components/RandomCat';
<>
<CatComponent />
</>
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SERVICE } from '../../utils/mutations'; 

const Home = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [showCreateServiceForm, setShowCreateServiceForm] = useState(false);

  const [createService] = useMutation(CREATE_SERVICE);

  const handleCreateService = async () => {
    try {
      const { data } = await createService({
        variables: {
          serviceName,
          description,
          userId: '123', 
          image,
        },
      });

      console.log('Service created:', data.createService);

      setServiceName('');
      setDescription('');
      setImage('');

      setShowCreateServiceForm(false);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <button id="createServiceButton"  onClick={() => setShowCreateServiceForm(!showCreateServiceForm)}>
        {showCreateServiceForm ? 'Cancel' : 'Create Service'}
      </button>

      {showCreateServiceForm && (
        <div>
          <label>
            Service Name:
            <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
          </label>
          <br />
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <br />
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br />
          <button onClick={handleCreateService}>Create Service</button>
        </div>
      )}
    </div>
  );
};

<>
<CatComponent />
</>
export default Home;

