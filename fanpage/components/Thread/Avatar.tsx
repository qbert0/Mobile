import Image from "next/image"
import nam from '@/assets/nam.jpg'
import nu from '@/assets/nu.jpg'
import hospital from '@/assets/hospital.jpg'

interface Props {
    gender : string
}


const Avatar = ({gender} : Props) => {
    let image
    if(gender === "woman" || gender === "Nữ") {
        image = nu
    } else if (gender === "man" || gender === "Nam") {
        image = nam
    } else {
        image = hospital
    }

    return (
        <div className="w-full h-full rounded-full flex flex-center items-center">
            <Image
            src={image}
            alt="ko anh" 
            className="h-full w-full rounded-full"
        />
        </div>
        
    )
}

export default Avatar

