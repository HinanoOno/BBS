import React from 'react';
import { DogData } from '../types/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avator"; 


async function getDogData() {
  const response = await fetch("http://localhost:3000/api/dog",{
    cache: "no-store",
  });
  const dogData: DogData[] = await response.json();
  
  return dogData
}


export default async function Mypage (){
  const dogData = await getDogData();
  console.log(dogData);

  return (
    <div className='flex justify-center items-center mt-32'>
      {dogData.map((dog: DogData) => (
      <Card className="w-[350px] h-[350px] p-6" key={dog.id}> 
        <CardContent className='flex justify-between'>
          <div>
            <Avatar>
              <AvatarImage src={dog.photoUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xl font-bold'>愛犬:{dog.name}</p>
            <div className='flex gap-3'>
              <label htmlFor="">餌の名前:</label>
              <p>{dog.breed}</p>
            </div>
          </div>
          
        </CardContent>
      </Card>
       
      ))}
    </div>
  )
};
