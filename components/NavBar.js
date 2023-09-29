import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Modal,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import TagForm from './forms/TagForm';

export default function NavBar() {
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);

  const handleCloseCreateTagModal = () => {
    setShowCreateTagModal(false);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Change Me</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/posts">
              <Nav.Link>Posts</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Button variant="primary" onClick={() => setShowCreateTagModal(true)}>
              Create Tag
            </Button>
            <Link passHref href="/profile">
              <Nav.Link>My Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={showCreateTagModal} onHide={handleCloseCreateTagModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TagForm />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}
