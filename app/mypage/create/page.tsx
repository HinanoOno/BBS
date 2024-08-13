"use client";

import { Button } from '@/components/ui/button'
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod'
import { postDog } from '@/app/actions/postDogAction'
import { useRouter } from 'next/navigation';

export const formSchema = z.object ( {
  name: z
  .string()
  .min(2,{message: "名前は2文字以上で入力してください"}),
  breed: z
  .string()
  .min(2,{message: "餌の名前は2文字以上で入力してください"}),
})

const CreateMypage = () => {
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
      breed:"",
    }
  })

  async function onSubmit(value: z.infer<typeof formSchema>){
    const { name,breed } =value;
    postDog({name,breed});
    router.push('/mypage');
  }
  
 
  return (
    <Form {...form}>
      <div className='flex justify-center items-center mt-32'>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>犬の名前</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>餌の名前</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>犬の画像</FormLabel>
                <FormControl>
                  <Controller
                    name="photoUrl"
                    control={form.control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) {
                              setFile(file);
                            }
                          }}
                        />
                      </>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Submit</Button>
        </form>

      </div>
    </Form>
  );
}

export default CreateMypage;