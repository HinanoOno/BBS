import prisma from "@../../../lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request){
  const dogFoodData = await prisma.food.findMany();
  return NextResponse.json(dogFoodData);
}