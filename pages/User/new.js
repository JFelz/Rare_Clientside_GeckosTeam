import React from 'react';
import UserForm from '../../components/forms/UserForm';

function newUser() {
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <UserForm />
      </div>
    </>
  );
}

export default newUser;
