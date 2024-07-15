'use client'
import { Tabs, 
TabsContent,
TabsList, 
TabsTrigger 
} from "@/components/ui/tabs"
import SelectDay from "./SelectDay"
import DayContent from "./DayContent"
import { ExamiDataType } from "../ResultType"
import { useLocalStorage } from "@/useHook/useLocalStorage"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { revalidatePath } from "next/cache"
import { RelatePage } from "@/useHook/relatePage"
import instance from "@/untils/axios"
      
interface Props {
    listExami : ExamiDataType[],
    profileId : string,
}

const Exami = ({listExami, profileId} : Props) => {
    const today = new Date()
    let isDay
    if(listExami.length > 0) {
        isDay = convertCreateAt(listExami[0].createAt) === convertCreateAt(today)
    }
    const { getItem,setAnother, setItem, removeItem } = useLocalStorage('TAB_DAY');
    const [defaultTab, setDefaultTab] = useState(isDay ? listExami[0].id : 'now')
    const pathname = usePathname()
    const changeTab = (tab : string) => {
        setItem(tab)
        setDefaultTab(tab)
        setAnother("TAB_RESULT")
    }

    const createnewExami = async (name : string) => {
        
        RelatePage(pathname)
        const id = await instance.post(`/createNewExami`, {
            comment : "",
            name : name,
            profileId,
        })
        setDefaultTab(conver(id))
    }

    const conver = (data : any) : string => {
        return data
    }
    const ngu = async () => {
        await RelatePage(pathname)
    }
    return (
        <div className="px-2  mt-3 ">
            {/* <Button onClick={() => ngu()}>{defaultTab}</Button> */}
        <Tabs defaultValue={getItem() } value={defaultTab} onValueChange={(value) => changeTab(value)} className="w-full">
            <TabsList  className="bg-slate-100 p-0 w-full">
                <TabName />
                <div className="flex flex-row justify-start overflow-y-auto scrollbar-hide flex-1  h-full">
                { !isDay &&
                    <SelectDay value={'now'} date={today}/>
                }
                {
                    listExami.map((item : ExamiDataType, index) => (
                        <SelectDay key={index} value={item.id} date={item.createAt}  />
                    ))
                }
                </div>
            </TabsList>
            {   !isDay && 
                <DayContent value={'now'} listResult={[]} create={createnewExami} comment={"Điền nhận xét"}/>
            }
            {
                listExami.map((item : ExamiDataType, index) => (
                    <DayContent key={index} value={item.id} listResult={item.listResult} create={createnewExami} comment={item.comment} />
                ))
            }
        </Tabs>
        </div>
    )
}

export default Exami

const TabName = () => {

    return (
        <div className="h-full px-3 rounded-l-lg flex justify-start items-center bg-slate-700   text-base font-semibold">
            Ngày khám
        </div>
    )
}

const convertCreateAt = (date : Date) : string => {
    const formattedDate : Date = new Date(date)
    const createAt = formattedDate.toLocaleDateString() 
    return createAt
}