'use server'

// import Exami from "@/components/MediaCom/Exami/Exami"
import { ExamiDataType, convertDataTofileType } from "@/components/MediaCom/ResultType"
import InforCus from "@/components/MediaCom/inforCus"
import instance from "@/untils/axios"
import dynamic from 'next/dynamic'

const Exami  = dynamic(() => import("@/components/MediaCom/Exami/Exami"), { ssr: false }) 

interface Props {
    id : string,
}

const ExamiPage = async ({id} : Props) => {
    const data : any = await instance.get(`/getAllDataForProfile?Id=${id}`)
    const listExami : ExamiDataType[] = convertDataTofileType(data)
    return (
        <div className="">
            {/* <InforCus /> */}
            <Exami listExami={listExami} profileId={id}/>
        </div>
    )
}

export default ExamiPage