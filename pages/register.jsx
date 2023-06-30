import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function RegisterScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status >= 400) {
        const { message } = await response.json();
        return toast.error(message);
      }

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>

        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            {...register('name', {
              required: 'Please enter name',
            })}
            type="text"
            name="name"
            id="name"
            className="w-full"
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                message: 'Please enter valid email',
              },
            })}
            type="email"
            name="email"
            id="email"
            className="w-full"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password is more than 5 characters',
              },
            })}
            name="password"
            id="password"
            className="w-full"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please enter confirmPassword',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Password is more than 5 characters',
              },
            })}
            name="confirmPassword"
            id="confirmPassword"
            className="w-full"
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">Password do not match</div>
            )}
        </div>

        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href={`register?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
