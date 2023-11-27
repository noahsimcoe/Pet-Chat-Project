import React, { useState, useEffect }  from 'react';
import CreateService from '../../components/CreateService';
import CatComponent from  '../../components/RandomCat';
import Review from '../../components/Review';
import './style.scss';
import { QUERY_SERVICE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { DELETE_SERVICE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const { loading, data, refetch } = useQuery(QUERY_SERVICE);
  useEffect(() => {
    data && setServices(data.services);
  }, [data]);

  const addService = (newService) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices, newService];
      console.log("Updated services array:", updatedServices);
      return updatedServices;
    });
    refetch();
  };

  const [deleteServiceMutation] = useMutation(DELETE_SERVICE);

  const deleteService = async (serviceId) => {
    try {
      await deleteServiceMutation({
        variables: { serviceId },
      });
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="home-page">
      <CatComponent />
      <CreateService createService={addService} />

    <div className="service-list">
      {services && services.map((service, index) => (
        
      <div key={index} className="service-card">
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <Review />
          <button onClick={() => deleteService(service._id)}>
      🗑️ 
    </button>
        </div>
      ))}
    </div>
  </div>
);
}
