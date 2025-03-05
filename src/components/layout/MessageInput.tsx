'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

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
    <div>

    </div>
  );
}

export default MessageInput;