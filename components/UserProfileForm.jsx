import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EyePasswordIcon from './EyePasswordIcon';

function UserProfileForm({ submitHandler, user }) {
  const [updatePassword, setUpdatePassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [setValue, user]);

  return (
    <form
      className="mx-auto w-full max-w-[400px] "
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="mb-4 text-xl">{user ? 'Profile' : 'Create Account'}</h1>

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

      <div className={user ? 'flex gap-1 justify-end ' : 'hidden'}>
        <input
          type="checkbox"
          id="upadatePassword"
          onChange={() => setUpdatePassword(!updatePassword)}
          className=" focus:ring-0 cursor-pointer "
        />
        <label
          className=" text-red-300 italic text-xs"
          htmlFor="upadatePassword"
        >
          Change password?
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <div className="relative ">
          <input
            type={viewPassword ? 'text' : 'password'}
            {...register('password', {
              required: updatePassword,
              minLength: {
                value: 6,
                message: 'Password is more than 5 characters',
              },
            })}
            disabled={user ? !updatePassword : false}
            name="password"
            id="password"
            className="w-full"
          />

          <EyePasswordIcon
            enabled={updatePassword || !user}
            showPassword={viewPassword}
            onClick={() => setViewPassword(!viewPassword)}
          />
        </div>

        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        {errors.password && errors.password.type === 'required' && (
          <div className="text-red-500">This field is required</div>
        )}
      </div>

      <div className="mb-4">
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <div className="relative ">
          <input
            type={viewConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: updatePassword,
              validate: updatePassword
                ? (value) => value === getValues('password')
                : false,
              minLength: {
                value: 6,
                message: 'Password is more than 5 characters',
              },
            })}
            name="confirmPassword"
            id="confirmPassword"
            className="w-full"
            disabled={user ? !updatePassword : false}
          />

          <EyePasswordIcon
            enabled={updatePassword || !user}
            showPassword={viewConfirmPassword}
            onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
          />
        </div>
        {errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword.message}</div>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === 'validate' && (
            <div className="text-red-500">Password do not match</div>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === 'required' && (
            <div className="text-red-500">This field is required</div>
          )}
      </div>

      <div className="mb-4">
        <button className="primary-button">
          {user ? 'Update' : 'Register'}
        </button>
      </div>
    </form>
  );
}

export default UserProfileForm;
