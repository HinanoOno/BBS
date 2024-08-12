"use client";
import React, { useState } from 'react'

const Page = () => {
  const [text,setText] = useState<string>('');
  console.log(text);

  const sendLine = async () => {
    const response = await fetch("http://localhost:3000/api/line");
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={sendLine}> 送信</button>
    </div>
  )
}

export default Page;