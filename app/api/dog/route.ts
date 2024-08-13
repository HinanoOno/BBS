import prisma from "@../../../lib/prismaClient";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const data  = await supabase.auth.getUser();

  const dogData = await prisma.dog.findMany({
    where: {
      userId: data?.data?.user?.id
    }
  })
  return NextResponse.json(dogData);
}
