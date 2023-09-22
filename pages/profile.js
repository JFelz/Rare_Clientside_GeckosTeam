import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <div>
        <h1>{user.displayName}</h1>
      </div>
      <h4>Contact Details</h4>
      <h5>Email</h5>
      <p>{user.email}</p>
      <h5>Phone Number</h5>
      <p>{user.phoneNumber ? user.phoneNumber : 'Not available'}</p>
    </>
  );
}
