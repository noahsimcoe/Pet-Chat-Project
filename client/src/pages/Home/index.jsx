import react, { useState } from 'react';
import CreateService from '../../components/CreateService';
import CatComponent from  '../../components/RandomCat';
import './style.scss';

export default function HomePage() {
  const [services, setServices] = useState([]); 


  const addService = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <CatComponent />
      <CreateService onCreateService={addService} />

      <div className="service-list">
        <h2>Services</h2>
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}




      





