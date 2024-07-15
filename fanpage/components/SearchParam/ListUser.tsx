import Link from "next/link";
import { SearchUser } from "./TypeList";
import { UserPageLink } from "@/app/(root)/media/[...id]/_page/IdPage";

interface Props {
    user : SearchUser
}

const ListUser = ({user} : Props) => {

    return (
        <div className="w-2/3 bg-slate-400 rounded-lg px-3 py-2 my-2 shadow-sm flex items-center">
            <Link href={ UserPageLink(user.id)} className="w-full h-full">
                <div className="ml-1 py-2 text-base font-normal">
                    Bệnh nhân: {user.email}
                </div>
            </Link>
        </div>
    )
}

export default ListUser