import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const TagForm = () => {
  const [tagLabel, setTagLabel] = useState('');

  const handleInputChange = (event) => {
    setTagLabel(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:7284/CreateNewTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: tagLabel,
        }),
      });

      if (response.ok) {
        alert('New Tag created!');
      } else {
        console.error('Failed to create tag:', response.statusText);
        alert('Failed to create tag. Please try again.');
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Error creating tag. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="tagLabel">
        <Form.Label>Tag Label</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter tag label"
          value={tagLabel}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Tag
      </Button>
    </Form>
  );
};

export default TagForm;
