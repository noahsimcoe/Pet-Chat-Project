import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import dayjs from 'dayjs';

import './style.scss';

export default function Profile() {
  const { data: userData, loading: userLoading } = useQuery(QUERY_USER);
  const currentDateTime = dayjs();

  return (
    <div id="profile-page">
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
            <h2>{userData?.user.firstName} {userData?.user.lastName}'s pets</h2>
            <ul className="pet-list">
              {userData?.user.pets.map(pet =>(
                <li className="pet-card" key={pet._id}>
                  <div className="left-column">
                    <h2>{pet.name}</h2>
                    <img src={pet.image} alt={`Image of ${pet.name}`} height="200"></img>
                  </div>
                  <div className="right-column">
                    <p>Species: {pet.species}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Weight: {pet.weight} lbs.</p>
                    <p>{pet.vaccinations}</p>
                    <p>Birthday: {dayjs(pet.birthdate).format('MMMM D, YYYY')}</p>
                    <p>Age: {currentDateTime.diff(pet.birthdate, 'year')} year(s) old.</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {userData?.user.services && userData?.user.services.length > 0 && (
          <div>
            <h2>My Services</h2>
            <ul>
              {userData?.user.services.map(service => (
                <li key={service._id}>
                  {service.name} - {service.description}
                  <ul>
                    {service.reviews.map(review => (
                      <li key={review._id}>
                        Review By {review.user.firstName}: {review.comment}

                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {userData?.user.reviews && userData?.user.reviews.length > 0 && (
          <div>
            <h2>My Reviews</h2>
            <ul>
              {userData?.user.reviews.map(review => (
                <li key={review._id}>
                  {review.service.name}: {review.comment}
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

