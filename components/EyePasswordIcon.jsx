import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function EyePasswordIcon({ enabled = true, showPassword, onClick }) {
  return (
    <div className={enabled ? 'flex' : 'hidden'}>
      <EyeSlashIcon
        className={`absolute top-[50%] right-2 -translate-y-[50%]  w-[1.5em] h-[1.5em] ${
          showPassword ? 'flex' : 'hidden'
        }`}
        onClick={onClick}
      />
      <EyeIcon
        className={`absolute top-[50%] right-2 -translate-y-[50%]  w-[1.5em] h-[1.5em] ${
          showPassword ? 'hidden' : 'flex'
        }`}
        onClick={onClick}
      />
    </div>
  );
}

export default EyePasswordIcon;
