import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SERVICE } from '../../utils/mutations';
import { Card, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';


const getAuthenticatedUserId = () => {
  const token = localStorage.getItem('authToken');

  if (token) {
    try {

      const decodedToken = decode(token);

      return decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; 
    }
  }

  return null; 
};




const CreateService = () => {
  const [formState, setFormState] = useState({
    serviceName: '',
    description: '',
  });

  const userId = getAuthenticatedUserId();

  const [createService, { error, data }] = useMutation(CREATE_SERVICE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await createService({
        variables: {
          serviceName: formState.serviceName, 
          description: formState.description,
          userId: userId,
        },
      });
  
      console.log('Service created:', data.createService);
  
      setFormState({
        serviceName: '',
        description: '',
      });
  
      toast.success("Your service has been created!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
        onClose: () => {
          window.location.reload();
        },
      });
  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="createServiceCard">
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <div className="card-body">
              <div className="box-container"> 
                <form onSubmit={handleFormSubmit}>
                  <div class="center-screen">
                    <div className="service-input-box">
                      <input
                        className="form-input"
                        placeholder="Service Name"
                        name="serviceName"
                        type="text"
                        value={formState.serviceName}
                        onChange={handleChange}
                      />
                      <textarea id='Description'
                        className="form-input"
                        placeholder="Description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                      />
                    </div>
                    <button id='Button'
                      className="btn btn-block btn-info submit-btn"
                      type="submit"
                    >
                      Create Service
                    </button>
                  </div>
                </form>
                <div>
                <ToastContainer
                  theme="colored"
                  pauseOnHover
                />
              </div>
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
  );
};

export default CreateService;
