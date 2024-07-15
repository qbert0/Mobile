import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Image } from "react-native"

interface Props {
    image : string
}
const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );
const AvatarDoctor = ({image} : Props) => {
    const [imageUpload, setImageUpload] = useState('')
    const uploadMedia = async () => {
        const data = await client.storage
          .from('file')
          .download(image)
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
        <Image
        style={{width: 60, height: 60, borderRadius : 12}}
        source={imageUpload !== '' ? {uri : imageUpload} :{ uri: 'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png' }}
        />
    )
}

export default AvatarDoctor