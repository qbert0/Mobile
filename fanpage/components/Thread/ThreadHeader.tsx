'use client'
import { ThreadDataType, convertCreateAt, convertName } from "@/contants/hospital/thread"
import Avatar from "./Avatar"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

interface Props {
    thread : ThreadDataType
}
const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
); 
const ThreadHead = ({thread} : Props) => {

    const [imageUpload, setImageUpload] = useState('')
    const uploadMedia = async () => {
        const data = await client.storage
          .from('file')
          .download(thread.image)
          // .list()
          .then(({ data }) => {
              const fr = new FileReader();
              if(!data) return
              fr.readAsDataURL(data);
              fr.onload = () => {
                setImageUpload(fr.result as string);
              };
          });
    }

    useEffect(() => {
        uploadMedia()
    },[])

    return (
        <div className="bg-[#e7f6f1] rounded-lg pt-1.5 pb-2.5 px-2">
            {/* avatar */}
            <div className="w-full flex flex-row items-center border-b py-2.5">
                <div className="p-0.5 rounded-full ml-3  mr-2  flex justify-center items-center">
                    <div className="w-10 h-10 p-0.5 rounded-full mr-4 bg-white flex flex-row justify-center items-center">
                        <Avatar gender={thread.gender} />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="text-base font-semibold">{convertName(thread.gender, thread.age)}</div>
                    <div className="text-base font-light italic">{convertCreateAt(thread.createAt)}</div>
                </div>
            </div>

            {/* title */}
            <div className="px-2 py-2 text-base font-normal flex flex-row">
                {thread.content}
            </div>

            {/* image */}
            {
                imageUpload !== '' &&
                <div className="my-3 px-2 ">
                    <img src={imageUpload} style={{height : 200, widows: 200, borderRadius: 12}} />
                </div>
            }

            {/* major */}
            <div className="flex flex-row flex-wrap">
                {thread.major.map((major) => (
                    <div key={major} className="flex text-sm flex-row rounded-md justify-center items-center bg-[#dee6f1] shadow-lg p-1.5 mx-1">
                        {major}
                    </div>
                ))}

            </div>
        </div>
        
    )
}

export default ThreadHead