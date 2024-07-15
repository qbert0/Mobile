import { Comment, sortComment } from "@/contants/hospital/thread"
import Anser from "./Anser"

interface Props {
    anser : Comment[]
}

const ThreadAnser = ({anser} : Props) => {
    const anserSort = sortComment(anser)

    return (
        <div className="w-full px-3 py-1">
            <div className="py-1.5 font-medium text-lg">
                Câu trả lời
            </div>

            {
                anserSort.map((i, index) => (
                    <Anser 
                        key={index} 
                        name={i.name} 
                        date={i.createAt} 
                        title={i.content} 
                    />
                ))
            }

        </div>
    )
}

export default ThreadAnser