import { Separator } from "@/components/ui/separator";


const MediaLayout = ({children} : {children : React.ReactNode}) => {

  return (
    <>
    <div className="w-full h-full flex-col ">
      <div className="w-full py-2 mb-4 flex justify-center ">
        <div className="flex-col">
          <div className="text-2xl font-bold w-full px-10">
            Hồ sơ khám bệnh
          </div>
          <Separator orientation='horizontal' className="mt-2 w-full bg-black" />
        </div>
      </div>
      <div className="w-full h-full px-24 flex-1">
        {children}
      </div>
    </div>
    </>
  )
};
  
export default MediaLayout;

