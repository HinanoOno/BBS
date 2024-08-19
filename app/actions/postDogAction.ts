"use server"

import prisma from "@/lib/prismaClient";
import { z } from "zod";
import { formSchema } from "../mypage/create/page";
import { createClient } from "@/utils/supabase/server";



export const postDog = async ({
  name,
  breed,
  photoUrl,
}: {
  name: string,
  breed: string,
  photoUrl: string,
})=> {

  const supabase = await createClient();
  const data  = await supabase.auth.getUser();

  const dog = await prisma.dog.create({
    data: {
      name: name,
      breed: breed,
      userId: data?.data?.user?.id ?? '',
      photoUrl: photoUrl, 
    }
  })
  
  return dog;
};