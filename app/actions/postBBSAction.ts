"use server"

import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import { z } from "zod";
import { formSchema } from "../bbs-posts/create/page";

export const postBBS = async ({
  username,
  title,
  content
  }: z.infer<typeof formSchema> )=> {

  const post = await prisma.post.create({
    data: {
      username,
      title,
      content
    }

  })
};