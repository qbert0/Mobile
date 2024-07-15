'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import SelectResult from "./SelectResult";
import ResultContent from "./ResultContent";
import { ResultDataType } from "../ResultType";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import instance from "@/untils/axios";
import { revalidatePath } from "next/cache"
import { usePathname } from "next/navigation";
import { RelatePage } from "@/useHook/relatePage";
import { useLocalStorage } from "@/useHook/useLocalStorage";

interface Props {
    value : string,
    listResult : ResultDataType[],
    create :  (name : string ) => void ,
    comment : string
}

const DayContent = ({value, create, listResult, comment} : Props) => {
    const { getItem, setItem } = useLocalStorage('TAB_RESULT');
    const defaultTab = '0'

    return (
        <TabsContent value={value}>
            <Card className="w-full h-[330px] shadow-md p-0">
                {/* can sua lai chieu cao cua cai nay */}
                <Tabs defaultValue={getItem() || defaultTab} onValueChange={(value) => setItem(value)} className="w-full h-full flex flex-row" >
                    {/* bang chon ten kham */}
                    <TabsList className="bg-slate-100 w-[250px] h-full flex flex-col p-0">
                        <TabName />
                    {listResult.length > 0 ?
                        <div className="px-2 pt-1 flex flex-1 flex-col w-full h-full justify-start overflow-y-scroll scrollbar-hide">
                        {
                            listResult.map((item : ResultDataType, index) => (
                                <SelectResult key={index} value={item.id} result={item.name}  />
                            ))
                        }
                        </div>
                        :
                        <TabNone />
                    }
                        <TabAdd examiId={value} create={create} />
                    </TabsList>
                    <div className="bg-blue-200 w-full h-full rounded-r-md">
                        <ResultContent value="0" result={[]} />
                    {
                        listResult.map((item : ResultDataType, index) => (
                            <ResultContent key={index} value={item.id} result={item.image}  />
                        ))
                    }
                    </div>
                </Tabs>
            </Card>

            <Card className="w-full h-[100px] shadow-md p-0 bg-blue-200">
                <CardHeader className="px-2 py-1 text-base font-semibold">
                    Nhận xét của bác sĩ
                </CardHeader>
                <CardContent>
                    {comment}
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default DayContent;

const TabName = () => {
    return (
        <div className="w-full bg-slate-500 px-3 py-1.5 rounded-tl-lg text-base font-semibold">
            Các lần khám
        </div>
    )
}

interface TabAddProps {
    examiId : string,
    create : (name : string) => void 
}
const FormSchema = z.object({
    name: z.string().min(5, {
      message: "Chú ý tên hồ sơ nhiều hơn 5 chữ",
    }),
})
const TabAdd = ({examiId, create} : TabAddProps) => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    // ham submit
    const addExami = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        setOpen(false)
        RelatePage(pathname)

        if(examiId != 'now') {
            await instance.post(`/createNewResult`, {
            comment : "",
            name : data.name,
            examiId,
            })
        } else {
            await create(data.name)
        }
        
    }
    // khoi tao mot form default
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: "",
        },
    })
    return (
    <Dialog open={open}  onOpenChange={(value) => setOpen(value)} >
        {/* header */}
        <DialogTrigger  asChild className="w-full bg-slate-400 px-3 py-1.5 rounded-bl-lg">
            <Button variant="outline" className="bg-blue-200 w-full  flex flex-row px-1 py-0.5 text-base font-semibold">
                <IoIosAddCircle className="mr-2"/>
                Thêm hồ sơ
            </Button>
        </DialogTrigger>
        {/* content */}
        <DialogContent className="sm:max-w-md bg-white ">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(addExami)} className=" space-y-6">    
        <DialogHeader>
            <DialogTitle>Tên hồ sơ</DialogTitle>
        </DialogHeader>
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input placeholder="Hồ sơ" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <DialogFooter className='sm:justify-between'>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
              Close
                </Button>
            </DialogClose>
            {/* <DialogClose asChild> */}
                <Button type="submit">
                    Thêm
                </Button>
            {/* </DialogClose> */}
           
        </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
    )
}

const TabNone = () => {
    return (
        <div className="flex-1 px-1 py-1 flex flex-row justify-start">
            Chưa có hồ sơ nào
        </div>
    )
}
