import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SERVICE } from '../../utils/mutations';
import { Card } from 'react-bootstrap';
import './style.scss';

const CreateService = ({ onCreateService }) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [showCreateServiceForm, setShowCreateServiceForm] = useState(false);

  const [createService, { error, data }] = useMutation(CREATE_SERVICE);

  const handleCreateService = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createService({
        variables: {
          serviceName,
          description,
          userId: '123', // Replace with the actual user ID or a dynamic value
          image,
        },
      });

      console.log('Service created:', data.createService);

      setServiceName('');
      setDescription('');
      setImage('');
      setShowCreateServiceForm(false);

      // Call the callback function passed as a prop to update the parent component state
      onCreateService(data.createService);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <Card className="createServiceCard">
      <button
        id="createServiceButton"
        onClick={() => setShowCreateServiceForm(!showCreateServiceForm)}
      >
        {showCreateServiceForm ? 'Cancel' : 'Create Service'}
      </button>

      {showCreateServiceForm && (
        <form id="createServiceForm" onSubmit={handleCreateService}>
          <label>
            Service Name:
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <br />
          <button type="submit">Create Service</button>
        </form>
      )}
    </Card>
  );
};

export default CreateService;
