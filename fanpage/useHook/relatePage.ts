'use server'

import { revalidatePath } from "next/cache"


export const RelatePage = async (pathname : string) => {
    revalidatePath(pathname)
}