import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function UserCard({ UserArr }) {
  return (
    <>
      <Link href={`/User/${UserArr.uid}`} passHref>
        <Card style={{
          height: '400px',
          width: '250px',
          margin: '10px',
          cursor: 'pointer',
        }}
        >
          <Card.Img
            variant="top"
            src={UserArr.profileImage}
            alt="Image Failure"
            style={{
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <Card.Body style={{ marginTop: '5px' }}>
            <Card.Subtitle style={{ fontSize: '12px', marginBottom: '2px' }}> {UserArr?.isStaff ? 'Active Staff Member' : '' }</Card.Subtitle>
            <Card.Title style={{
              minHeight: '15px',
              fontFamily: 'Poppins',
              fontWeight: 'Bold',
              fontSize: '16px',
            }}
            >{ UserArr.firstName} {UserArr.lastName}
            </Card.Title>
            <Card.Subtitle> {UserArr.email} </Card.Subtitle>
            <div style={{ marginTop: '.5em' }}>
              <Card.Text> {UserArr.bio} </Card.Text>
            </div>
          </Card.Body>
          <Card.Footer className="FooterUserCard" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="success"> Subscribe </Button>
          </Card.Footer>
        </Card>
      </Link>
    </>
  );
}

UserCard.propTypes = {
  UserArr: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    profileImage: PropTypes.string,
    isStaff: PropTypes.bool,
    Active: PropTypes.bool,
    uid: PropTypes.string,
    Uid: PropTypes.string,
  }).isRequired,
};
