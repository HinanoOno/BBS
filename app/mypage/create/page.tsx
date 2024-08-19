"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { postDog } from "@/app/actions/postDogAction";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export const formSchema = z.object({
  name: z.string().min(2, { message: "名前は2文字以上で入力してください" }),
  breed: z
    .string()
    .min(2, { message: "餌の名前は2文字以上で入力してください" }),
  photoUrl: z.custom<FileList>(),
});

export default function CreateMypage() {
  const [file, setFile] = useState<File>();

  const router = useRouter();

  const supabase = createClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      breed: "",
      photoUrl: "",
    },
  });

  console.log(file);
  async function onSubmit(value: z.infer<typeof formSchema>, event: any) {
    const { name, breed } = value;

    // 画像のアップロード
    event.preventDefault();

    if (file!!.type.match("image.*")) {
      const fileExtension = file!!.name.split(".").pop();
      const filePath = `img/${uuidv4()}.${fileExtension}`; 

      const { error } = await supabase.storage
        .from("Dog")
        .upload(filePath, file!!);
      if (error) {
        alert("エラーが発生しました：" + error.message);
        return;
      }
      setFile(undefined)

      const { data } = await supabase.storage
        .from("Dog")
        .createSignedUrl(filePath, 600)

      const photoUrl = data!!.signedUrl;
      postDog({ name, breed, photoUrl });

      router.push("/mypage");
    } else {
      alert("画像ファイルを選択してください。");
    }
  }

  return (
    <Form {...form}>
      <div className="flex justify-center items-center mt-32">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-1/2 px-7"
        >
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
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>犬の画像</FormLabel>
                <FormControl>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
}
