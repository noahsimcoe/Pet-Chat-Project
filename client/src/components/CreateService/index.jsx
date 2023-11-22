// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client'; 
// import { Card } from 'react-bootstrap'; 
// import { CREATE_SERVICE } from '../../utils/mutations'; 
// import './style.scss';


// const CreateService = ({ onCreateService }) => {
//   const [serviceName, setServiceName] = useState('');
//   const [description, setDescription] = useState('');
//   const [showCreateServiceForm, setShowCreateServiceForm] = useState(false);

//   const [createService, { error, data }] = useMutation(CREATE_SERVICE);

//   const handleCreateService = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await createService({
//         variables: {
//           serviceName,
//           description,
//           userId: '123', 
//         },
//       });

//       console.log('Service created:', data.createService);

//       setServiceName('');
//       setDescription('');
//       setShowCreateServiceForm(false);

     
//       onCreateService(data.createService);
//     } catch (error) {
//       console.error('Error creating service:', error);
//     }
//   };

//   return (
//     <Card className="createServiceCard">
//       <button
//         id="createServiceButton"
//         onClick={() => setShowCreateServiceForm(!showCreateServiceForm)}
//       >
//         {showCreateServiceForm ? 'Cancel' : 'Create Service'}
//       </button>

//       {showCreateServiceForm && (
//         <form id="createServiceForm" onSubmit={handleCreateService}>
//           <label>
//             Service Name:
//             <input
//               type="text"
//               value={serviceName}
//               onChange={(e) => setServiceName(e.target.value)}
//             />
//           </label>
//           <br />
//           <label>
//             Description:
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </label>
//           <br />
//           <button type="submit">Create Service</button>
//         </form>
//       )}
//     </Card>
//   );
// };

// export default CreateService;

// Import necessary dependencies


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SERVICE } from '../../utils/mutations';
import { Card, Form, Button } from 'react-bootstrap';
import decode from 'jwt-decode';
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

      
      setFormState({
        serviceName: '',
        description: '',
      });

      console.log('Service created:', data.createService);

     
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
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Service Name"
                  name="serviceName"
                  type="text"
                  value={formState.serviceName}
                  onChange={handleChange}
                />
                <textarea
                  className="form-input"
                  placeholder="Description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info submit-btn"
                  type="submit"
                >
                  Create Service
                </button>
              </form>

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
