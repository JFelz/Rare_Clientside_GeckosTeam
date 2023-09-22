import Link from 'next/link';
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <>
      <div className="profileContainer">
        <div className="profileUser">
          <div style={{ padding: '20px' }}>
            <Image
              src={user.photoURL}
              className="profileImage"
            />
          </div>
          <div style={{ marginTop: '5px', marginBottom: '20px' }}>
            <h1>{user.displayName}</h1>
          </div>
          <div className="profileDetails">
            <h4 style={{ marginBottom: '20px' }}>Contact Details</h4>
            <h5>Email</h5>
            <p>{user.email}</p>
            <h5>Phone Number</h5>
            <p>{user.phoneNumber ? user.phoneNumber : 'Not available'}</p>
          </div>
          <div>
            <Link href="https://myaccount.google.com/personal-info">
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </div>
        <div className="profilePosts">
          <h1>My Posts</h1>
        </div>
      </div>
    </>
  );
}
