import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Header from "../(root)/_component/header";
import Sidebar from "../(root)/_component/sidebar";
import styles from '../(root)/_css/layout.module.css';


export const metadata : Metadata = {
    title: 'Magic Post',
    description: 'A Next.js 13 Meta Threads Application',
}

interface Props {
    children : React.ReactNode;
}

const inter = Inter({subsets:["latin"]})


async function RootLayout({children}: Props) {
    const user = await currentUser()
    if(!user) return

    return (
        <>
        <ClerkProvider>
            {/* <Provider> */}
            <div className={styles.layout}>
                <Header/>
                {/* <div className="w-full bg-black"> */}
                    {/* <Sidebar /> */}
                    <div className=''>
                        {children}
                    </div>
                {/* </div> */}
            </div>
            {/* </Provider> */}
        </ClerkProvider>
        </>
    )
}


export default RootLayout;