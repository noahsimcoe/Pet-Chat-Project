import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USER_PROFILE } from '../../utils/actions';
import { QUERY_USER, QUERY_SERVICE, QUERY_PETS } from '../../utils/queries';
import { useStoreContext } from '../../utils/store-context';

import './style.scss';

export default function Profile() {
  const { data: userData, loading: userLoading } = useQuery(QUERY_USER);
  // const { data: petData, loading: petLoading } = useQuery(QUERY_PETS);
  // const { data: serviceData, loading: serviceLoading } = useQuery(QUERY_SERVICE);
  
  return (
    <div id="profile-page">
      <h1>Profile</h1>

      {userLoading && (
        <h2 className="loading-data">
          Loading user data...
        </h2>
      )}

      {userData?.user && (
        <>
        <ul className="display-user">
          <li>
            <span className="display-user__label">Fullname:</span> <span>{userData?.user.firstName} {userData?.user.lastName}</span>
          </li>
          <li>
            <span className="display-user__label">Email:</span> <span>{userData?.user.email}</span>
          </li>
        </ul>

        {userData?.user.pets && userData?.user.pets.length > 0 && (
          <div>
            <h2>My pets</h2>
            <ul>
              {userData?.user.pets.map(pet =>(
                <li key={pet._id}> {pet.name} - {pet.species}</li>
              ))}
            </ul>
          </div>
        )}

        {userData?.user.services && userData?.user.services.length > 0 && (
          <div>
            <h2>My Services</h2>
            <ul>
              {userData?.user.services.map(service => {
                <li key={service._id}>{service.name} - {service.description}
                  <ul>
                    {service.reviews.map(review => (
                      <li key={review._id}>
                        Review By {review.user.firstName}: {review.comment})
                      </li>
                    ))}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        )}

        {userData?.user.reviews && userData?.user.reviews.length > 0 && (
          <div>
            <h2>My Reviews</h2>
            <ul>
              {userData?.user.reviews.map(review => (
                <li key={review._id}>
                  {review.service.name}: {review.comment})
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
        </div>


        </>
      )}
    </div>
  );
};

