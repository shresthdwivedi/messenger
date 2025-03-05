'use client';

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import MessageInput from "./MessageInput";

const Form = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      } 
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post('/api/messages', {
        ...data,
        conversationId,
      });

      setValue('message', '', { shouldValidate: true });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="p-4 w-full bg-white dark:bg-neutral-800 rounded-full shadow-lg m-4 border-t flex flex-row items-center gap-2 lg:gap-4 ">
      <div className="rounded-full cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2">
          <FaPlus size={25} className="text-neutral-500"/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 p-4">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message..."
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

export default Form