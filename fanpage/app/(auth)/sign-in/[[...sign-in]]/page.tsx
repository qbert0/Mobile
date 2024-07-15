import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
// import login1 from "@/assets/login1.png";
// import login2 from "@/assets/login2.png";

function Page() {
  return (
    <div className="flex mx-[200px] items-center space-x-20">
      <div>
        {/* <Image src={login1} width={600} alt="login" /> */}
      </div>
      <div className="flex flex-col items-center mt-5">
        <div className="">
          {/* <Image src={login2} width={200} alt="login" /> */}
        </div>
        <div className="mt-5">
          <SignIn />
        </div>
      </div>
    </div>
  );
}

export default Page;
