import React, { useState, useEffect } from "react";
import CreateService from "../../components/CreateService";
import CatComponent from "../../components/RandomCat";
import Review from "../../components/Review";
import "./style.scss";
import { QUERY_SERVICE } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { DELETE_SERVICE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

export default function HomePage() {
  const { loading, data, refetch } = useQuery(QUERY_SERVICE);

  const serviceData = data?.services || [];

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

      refetch();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="home-page">
      <div class="comps">
        <CatComponent />

        <div>
          <CreateService />
          <div class="servCont">
            <div className="service-list">
              {serviceData.map((service, index) => (
                <div key={index} className="service-card">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>

                  {/* <Review deleteService={deleteService} service = {service}/> */}

                  <button onClick={() => deleteService(service._id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
