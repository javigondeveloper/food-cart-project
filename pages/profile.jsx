import Layout from '@/components/Layout';
import UserProfileForm from '@/components/UserProfileForm';
import { getError } from '@/utils/error';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function ProfileScreen() {
  const { data: session } = useSession();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    setUser({ name: session.user.name, email: session.user.email });
  }, [session.user]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await fetch('api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      toast.success('Profile update successfully');

      signOut({ callbackUrl: '/login' });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Profile">
      <UserProfileForm
        submitHandler={submitHandler}
        user={{ name: user.name, email: user.email }}
      />
    </Layout>
  );
}
ProfileScreen.auth = true;

export default ProfileScreen;
