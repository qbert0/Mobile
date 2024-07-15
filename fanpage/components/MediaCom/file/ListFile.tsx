'use server'

import { ProfileDataType } from "@/contants/Type/ProfileType"
import FileItem from "./FileItem"

interface Props {
    listFile : ProfileDataType[]
}

const ListFile = ({listFile} : Props) => {

    return (
        <div className="w-full flex-col mt-6">
            <div className="text-xl font-semibold mb-1">
                Các lần khám
            </div>
            <div className="flex-col ">
            {listFile.length > 0 && 
                listFile.map((file : ProfileDataType, index) => (
                    <FileItem key={index} id={file.id} name={file.title} date={file.createAt} />
                ))
            }
            {
                listFile.length === 0 &&
                <div>
                </div>
            }
            </div>

        </div>
    )
}

export default ListFile