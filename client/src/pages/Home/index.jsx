import React, { useState, useEffect }  from 'react';
import CreateService from '../../components/CreateService';
import CatComponent from  '../../components/RandomCat';
import './style.scss';
import { QUERY_SERVICE } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function HomePage() {
  const [services, setServices] = useState([]); 
const {loading, data, refetch} = useQuery(QUERY_SERVICE )
useEffect(() =>{
data && setServices(data.services)

}, [data])
  

const addService = (newService) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices, newService];
      console.log('Updated services array:', updatedServices);
      return updatedServices;
    }); 
    refetch()
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
        </div>
      ))}
    </div>
  </div>
);
}




      





