import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../../api/userData';
import UserForm from '../../../components/forms/UserForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditUserForm() {
  const [editUser, setEditUser] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getSingleUser(user.uid).then(setEditUser);
    user.Uid = router.query;
  }, [router.query, user]);

  return (<UserForm UserObj={editUser} />);
}
