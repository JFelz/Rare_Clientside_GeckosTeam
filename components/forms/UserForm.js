// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
// import Form from 'react-bootstrap/Form';
// import { useAuth } from '../../utils/context/authContext';

// function UserForm() {
//   const [formData, setFormdata] = useState();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//   }

//   const initialState = {
//     email: '',
//     firstname: '',
//     lastname: '',
//     bio: '',
//     imageURL: '',
//   };

//   return (
//     <>
//       <Form>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" />
//           <Form.Text className="text-muted">
//             <p> We will never share your email with anyone else. </p>
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicFirstName">
//           <Form.Control type="name" placeholder="First Name" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicLastName">
//           <Form.Control type="name" placeholder="Last Name" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicBio">
//           <Form.Control type="text" placeholder="Bio" as="textarea" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicProfileImage">
//           <Form.Control type="text" placeholder="Profile Image" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Check if you are a staff memeber" />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// }

// UserForm.propTypes = {
//   Obj: PropTypes.shape({
//     email: PropTypes.string,
//     firstname: PropTypes.string,
//     lastname: PropTypes.string,
//     bio: PropTypes.string,
//     imageURL: PropTypes.string,
//     uid: PropTypes.string,
//   }).isRequired,
// };

// // Prop-Types

// export default UserForm;
