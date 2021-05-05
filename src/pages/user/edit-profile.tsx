import React from 'react';
import { Button } from '../../components/button';
import { useMe } from '../../hooks/useMe';

export const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-3 font-semibold">Edit Profile</h2>
      <form className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
        <input className="input" type="email" placeholder="Email" required />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick actionText="Save Profile" />
      </form>
    </div>
  );
};
