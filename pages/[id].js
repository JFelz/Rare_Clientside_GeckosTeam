import { useRouter } from 'next/router';
import PostDetailsCard from '../components/PostDetailsCard';

function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const postIdNumber = id ? parseInt(id, 10) : null;

  return (
    <div>
      <h1>Post Details</h1>
      {postIdNumber ? <PostDetailsCard postId={postIdNumber} /> : <p>No post selected.</p>}
    </div>
  );
}

export default DetailsPage;
