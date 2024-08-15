import prisma from "@../../../lib/prismaClient";
import { Table, TableCaption, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell } from  './../../components/ui/table';


async function getDogFoodlData() {
  const response = await fetch(`http://localhost:3000/api/admin`,{
    cache: "no-store",
  });

  const dogFoodData = await response.json();
  return dogFoodData;
}


export default async function TableDemo() {
  const dogFoodData = await getDogFoodlData();
  console.log(dogFoodData);
  
//   const dogFoodData = [
//     {id: 1,
//     name: 'Dog Food 1',
//     size: 'Small',
//     materials: ['Chicken', 'Rice', 'Carrot'],
//     locality: 'Japan',
//     price: 500
//   },{
//     id: 2,
//     name: 'Dog Food 2',
//     size: 'Medium',
//     materials: ['Beef', 'Potato', 'Apple'],
//     locality: 'USA',
//     price: 1000
//   },{
//     id: 3,
//     name: 'Dog Food 3',
//     size: 'Large',
//     materials: ['Pork', 'Corn', 'Pumpkin'],
//     locality: 'China',
//     price: 1500
//   }
// ]
  

  // TypeScript 型定義
  type DogFoodType = {
    id: number;
    name: string;
    size: string;
    materials: string[]; 
    locality: string;
    price: number;
  }

  return (
    <div className="mx-6 my-12">
      <Table>
        <TableCaption>A list of dog food items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">フード名</TableHead>
            <TableHead>大きさ</TableHead>
            <TableHead>原材料</TableHead>
            <TableHead>原産地</TableHead>
            <TableHead>値段</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dogFoodData.map((dogFood: DogFoodType) => (
            <TableRow key={dogFood.id}>
              <TableCell className="font-medium">{dogFood.name}</TableCell>
              <TableCell>{dogFood.size}</TableCell>
              <TableCell>{dogFood.materials.join(', ')}</TableCell> 
              <TableCell >{dogFood.locality}</TableCell>
              <TableCell>{dogFood.price}円</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
