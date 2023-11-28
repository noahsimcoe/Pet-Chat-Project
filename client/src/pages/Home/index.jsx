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
  // const [services, setServices] = useState([]);
  const { loading, data, refetch } = useQuery(QUERY_SERVICE);

  const serviceData = data?.services || [];
  

  // const addService = (newService) => {
  //   setServices((prevServices) => {
  //     const updatedServices = [...prevServices, newService];
  //     console.log("Updated services array:", updatedServices);
  //     return updatedServices;
  //   });
  //   refetch();
  // };

  const [deleteServiceMutation] = useMutation(DELETE_SERVICE);

  const deleteService = async (serviceId) => {
    try {
      await deleteServiceMutation({
        variables: { serviceId },
      });
      
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="home-page">
      <CatComponent />
      <CreateService  />

    <div className="service-list">
      {serviceData.map((service, index) => (
        
      <div key={index} className="service-card">
          <Review deleteService={deleteService} service = {service}/>       
      
        </div>
      ))}
    </div>
  </div>
);
}
