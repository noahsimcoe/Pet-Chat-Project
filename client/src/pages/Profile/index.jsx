import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { USER_PROFILE } from '../../utils/actions';
import { QUERY_USER, QUERY_SERVICE } from '../../utils/queries';
import { useStoreContext } from '../../utils/store-context';

import './style.scss';

export default function Profile() {
  const [user, dispatch] = useStoreContext('user');
  const { data: userData, loading: userLoading } = useQuery(QUERY_USER);
  const { data: serviceData, loading: serviceLoading } = useQuery(QUERY_SERVICE);

  useEffect(() => {
    if (userData && userData.user) {
      dispatch({ type: USER_PROFILE, payload: userData.user })
    }
  }, [userData, dispatch]);

  return (
    <div id="profile-page">
      <h1>Profile</h1>

      {userLoading && (
        <h2 className="loading-data">
          Loading user data...
        </h2>
      )}

      {user?.profile && (
        <>
        <ul className="display-user">
          <li>
            <span className="display-user__label">Fullname:</span> <span>{user.profile.firstName} {user.profile.lastName}</span>
          </li>
          <li>
            <span className="display-user__label">Email:</span> <span>{user.profile.email}</span>
          </li>
        </ul>

        {user.profile.pets && user.profile.pets.length > 0 && (
          <div>
            <h2>My pets</h2>
            <ul>
              {user.profile.pets.map(pet =>(
                <li key={pet._id}> {pet.name} - {pet.species}</li>
              ))}
            </ul>
          </div>
        )}

        {serviceData && serviceData?.services.length > 0 && (
          <div>
            <h2>My Services</h2>
            <ul>
              {serviceData.services.map(service => {
                <li key={service._id}>{service.name} - {service.description}
                  <ul>
                    {service.reviews.map(review => (
                      <li key={review._id}>
                        Review By {review.user.firstName}: {review.comment} (Rating: {review.rating})

                      </li>
                    ))}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        )}

        {user.profile.reviews && user.profile.reviews.length > 0 && (
          <div>
            <h2>My Reviews</h2>
            <ul>
              {user.profile.reviews.map(review => (
                <li key={review._id}>
                  {review.service.name}: {review.comment} (Rating: {review.rating})
                </li>
              ))}
            </ul>
          </div>
        )}

        </>
      )}
    </div>
  );
};

