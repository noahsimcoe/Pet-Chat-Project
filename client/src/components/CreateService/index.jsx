import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; // Assuming you are using Apollo Client
import { Card } from 'react-bootstrap'; // Assuming you are using React Bootstrap
import { CREATE_SERVICE } from '../../utils/mutations'; // Importing your mutation
import './style.scss';


const CreateService = ({ onCreateService }) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [showCreateServiceForm, setShowCreateServiceForm] = useState(false);

  const [createService, { error, data }] = useMutation(CREATE_SERVICE);

  const handleCreateService = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createService({
        variables: {
          serviceName,
          description,
          userId: '123', 
        },
      });

      console.log('Service created:', data.createService);

      setServiceName('');
      setDescription('');
      setShowCreateServiceForm(false);

     
      onCreateService(data.createService);
    } catch (error) {
      console.error('Error creating service:', error);
    }
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
          <button type="submit">Create Service</button>
        </form>
      )}
    </Card>
  );
};

export default CreateService;
