import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SERVICE } from '../../utils/mutations'; // Import your GraphQL mutation

const Home = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showCreateServiceForm, setShowCreateServiceForm] = useState(false);

  const [createService] = useMutation(CREATE_SERVICE);

  const handleCreateService = async () => {
    try {
      const { data } = await createService({
        variables: {
          serviceName,
          description,
          userId: '123', // Replace with the actual user ID (you might get it from your authentication context),
          image,
        },
      });

      // Optionally, you can handle the response or perform other actions after creating the service
      console.log('Service created:', data.createService);

      // Reset the form fields
      setServiceName('');
      setDescription('');
      setImage('');

      // Hide the form after creating the service
      setShowCreateServiceForm(false);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
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
  );
};

export default Home;

