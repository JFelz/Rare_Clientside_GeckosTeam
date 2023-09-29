import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';
import { updateUser } from '../../api/userData';

const initialState = {
  Email: '',
  FirstName: '',
  LastName: '',
  Bio: '',
  ProfileImage: '',
  isStaff: false,
  Active: false,
};
function UserForm({ UserObj }) {
  const [formData, setFormdata] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (UserObj.Uid) setFormdata(UserObj);
  }, [UserObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (UserObj.uid) {
      const updatePayload = { ...formData };
      updateUser(user.uid, updatePayload)
        .then(() => router.push('/profile'));
    } else {
      const payload = { ...formData, Uid: user.uid, Active: true };
      registerUser(payload)
        .then(() => router.push('/profile'));
    }
  };

  const switchToggle = (e) => {
    formData.isStaff = e.target.checked;

    if (formData.isStaff === true && e.target.checked) {
      setFormdata((prevState) => ({
        ...prevState,
        isStaff: true,
      }));
    } else {
      setFormdata((prevState) => ({
        ...prevState,
        isStaff: false,
      }));
    }
  };

  return (
    <>
      <h1>{UserObj.Uid ? 'Edit' : ''} User Form </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            <p> We will never share your email with anyone else. </p>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Control
            type="name"
            placeholder="First Name"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Control
            type="name"
            placeholder="Last Name"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Control
            type="text"
            placeholder="Bio"
            as="textarea"
            name="Bio"
            value={formData.Bio}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicProfileImage">
          <Form.Control
            type="basic-url"
            placeholder="Profile Image URL"
            name="ProfileImage"
            value={formData.ProfileImage}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            label="Check if you are a staff memeber"
            name="isStaff"
            checked={formData.isStaff}
            onChange={switchToggle}
          />
        </Form.Group>
        <Button variant="primary" type="submit">{UserObj.Uid ? 'Edit' : ''} Submit </Button>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  UserObj: PropTypes.shape({
    Email: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    Bio: PropTypes.string,
    ProfileImage: PropTypes.string,
    isStaff: PropTypes.bool,
    Active: PropTypes.bool,
    uid: PropTypes.string,
    Uid: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  UserObj: initialState,
};

export default UserForm;
