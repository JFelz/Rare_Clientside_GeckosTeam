import React, { useEffect, useState } from 'react';
import { getAllUser } from '../api/userData';
import UserCard from '../components/UserCards';

function AllUsers() {
  const [userArr, setUserArr] = useState();

  const retreiveAllUsers = () => {
    getAllUser().then(setUserArr);
  };

  useEffect(() => {
    retreiveAllUsers();
  }, []);

  return (
    <>
      <h1>All Users</h1>
      <div className="UserCard">
        {userArr?.map((useArrobj) => (<UserCard UserArr={useArrobj} key={useArrobj.uid} />))}
      </div>
    </>
  );
}

export default AllUsers;
