'use client';

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SearchForm () {
  const form = useForm();
  
  const router = useRouter();

  // const onSubmit = (data) => {
      
  // };

  return (
    <>
      <div>
        <h1 className="text-lg font-bold">
          検索
        </h1>
      </div>

      {/* <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Input
                    {...field}
                    placeholder="キーワードを入力"
                  />
                  </FormControl>
                </FormItem>
              )}
      /> */}
      {/* <Box pb="5">
        <Text mb={2}>種類</Text>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value="未選択">未選択</option>
              <option value="デッキ">デッキ</option>
              <option value="トラック">トラック</option>
              <option value="ウィール">ウィール</option>
              <option value="ベアリング">ベアリング</option>
              <option value="デッキテープ">デッキテープ</option>
            </Select>
          )}
        />
      </Box>
      <Box pb="10">
        <Button
          onClick={handleSubmit(onSubmit)}
          color="white"
          bg="gray.900"
          _hover={{ bg: 'gray.500' }}
        >
          検索
        </Button>
      </Box> */}
    </>
  );
};