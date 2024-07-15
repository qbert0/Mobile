// import AccountProfile from '@/components/forms/AccountProfile';
// import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page () {
    const user = await currentUser();
    if(!user) return null;

    // const userInfor = await fetchUser(user.id);
    // if (userInfor) redirect("/");


    // const userData = {
    //     id: user.id,
    //     objectId: userInfor?._id.toString(),
    //     firstName: userInfor ? userInfor.firstName : user.firstName,
    //     lastName: userInfor ? userInfor.lastName : user.lastName,
    //     image: userInfor ? userInfor.image: user.imageUrl,
    //     email :  user.emailAddresses[0].emailAddress,
    // }

  

    return (
        <>
        <main className='mx-auto flex  max-w-3xl flex-col justify-start px-10 py-5'>
            <section className='mt-9 bg-nununu p-10'>
                {/* <AccountProfile user={userData} btnTitle='Continue' /> */}
            </section>
        </main>
        </>
    )
}

export default Page;