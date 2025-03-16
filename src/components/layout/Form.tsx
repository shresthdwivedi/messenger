'use client';

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import MessageInput from "./MessageInput";
import { FaArrowUp } from "react-icons/fa";
import { CldUploadButton } from 'next-cloudinary';

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
    setIsLoading(true);
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

  const handleSuccess = async (result: any) => {
    setIsLoading(true);
    try{
      await axios.post('/api/messages', {
        image: result?.info?.secure_url,
        conversationId,
      })
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  }; 

  return (
    <div className="p-4 w-full bg-white dark:bg-neutral-800 rounded-full shadow-lg m-4 border-t flex flex-row items-center ">
      <div>
          <CldUploadButton 
            className="rounded-full cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2"
            options={
              {
                maxFiles: 1,
              }
            }
            onSuccess={handleSuccess}
            uploadPreset="owuwklfdnv"
          >
            <FaPlus size={25} className="text-neutral-500 disabled:cursor-not-allowed"/>
          </CldUploadButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="ml-1 flex flex-1 items-center">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Message"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="rounded-full p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
          disabled={isLoading}
        >
          <FaArrowUp size={25} className="text-neutral-500"/>
        </button>
      </form>
    </div>
  )
}

export default Form