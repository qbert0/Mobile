'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FaSearch } from "react-icons/fa";
const SearchParam = () => {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = (searchTerm : string) => {
        const params = new URLSearchParams(searchParams)
        if(searchTerm) {
            params.set("query", searchTerm)
        } else {
            params.delete("query")
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-2/3 relative">
            <input 
                className="peer block w-full rounded-md border border-gray-400 bg-slate-400 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 peer-focus:text-gray-900"
                placeholder="Tìm kiếm hồ sơ bệnh nhân"
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <FaSearch className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 ' />
            </div>
            
        </div>
    )
}

export default SearchParam