export interface SearchUser {
    id : string,
    email : string,
    phone : string,
    role : string,
}

export const converDataToSearchUser = (data : any[]) : SearchUser[] => {

    if(!Array.isArray(data)) {
        return []
    }
    const user : SearchUser[] = data.map((item : any) => ({
        id : item.id,
        email : item.email,
        phone: item.phone,
        role : item.role,
    }))

    return user
}