import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import UserPosts from '../components/UserPosts';
import { getSingleUser } from '../api/userData';

export default function UserProfile() {
  const [profileUser, setProfileUser] = useState();
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user.uid).then(setProfileUser);
  };

  useEffect(() => {
    getUser();
  });

  return (
    <>
      <div className="profileContainer">
        <div className="profileUser">
          <div style={{ padding: '20px' }}>
            <Image
              src={profileUser?.profileImage}
              className="profileImage"
            />
          </div>
          <div style={{ marginTop: '5px', marginBottom: '20px' }}>
            <h1>{profileUser?.firstName} {profileUser?.lastName}</h1>
            <p className="Staff_Description">{profileUser?.isStaff ? 'Active Staff Member' : ''}</p>
          </div>
          <div className="profileDetails">
            <h4 style={{ marginBottom: '20px' }}>Personal Details</h4>
            <h5>Email</h5>
            <p>{profileUser?.email}</p>
            <h5>About Me</h5>
            <p>{profileUser?.bio}</p>
          </div>
          {profileUser ? (
            <div>
              <Link href={`/User/edit/${user.uid}`} passHref>
                <Button>Edit Profile</Button>
              </Link>
            </div>
          ) : (
            <>
              <h4>
                No User Information: Please Proceed to the Home page.
              </h4>
              <Link href="/" passHref>
                <Button variant="warning" size="lg">
                  HomePage
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="profilePosts">
          <h1>My Posts</h1>
          <UserPosts />
        </div>
      </div>
    </>
  );
}
