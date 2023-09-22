import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <h1>{user.displayName}</h1>
      <h3>{user.uid}</h3>
      <h1>{user.email}</h1>
    </>
  );
}
