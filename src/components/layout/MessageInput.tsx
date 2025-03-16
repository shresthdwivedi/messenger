'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="relative w-full">
      <input 
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
        disabled={disabled}
        autoComplete={id}
        className="text-lg disabled:cursor-not-allowed dark:placeholder:text-neutral-400 placeholder:text-neutral-800 text-neutral-800 dark:text-neutral-400 bg-transparent w-full focus:outline-none"
      />
    </div>
  );
}

export default MessageInput;