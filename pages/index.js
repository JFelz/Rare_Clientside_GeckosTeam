import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleUser } from '../api/userData';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
// import { getSubscribedPosts } from '../api/categoryData';
// import PostCard from '../components/PostCard';

function Home() {
  const [blurButton, setBlurButton] = useState();
  const { user } = useAuth();

  const checkingUser = () => {
    getSingleUser(user.uid).then(setBlurButton);
  };

  useEffect(() => {
    checkingUser();
  });
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
        <h1>Welcome to Rare! </h1>

        <br />
        {!blurButton ? (
          <>
            <p>Please add user information before proceeding.</p>
            <Link href="/User/new" passHref>
              <Button>Add User Information</Button>
            </Link>
          </>
        ) : (
          <Button href="#" variant="secondary" size="lg" disabled>
            Sorry, this Form is closed. If you want to edit your profile information, proceed to the Profile page.
          </Button>
        ) }
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Home;
