import { useState } from "react"

export interface ThreadDataType {
    id: string,
    customId : string | undefined,
    nurfeId : string | undefined,
    image : string,
    createAt : Date ,
    content : string,
    gender : string,
    major : string[],
    age : string,
    puImage : boolean,
    comment : Comment[],
}

export interface Comment {
    content : string
    createAt : Date
    name : string
}

export const ConvertDataToThreadType  = (data : any[]) : ThreadDataType[] => {
    const thread : ThreadDataType[] = data.map((item : any) => ({
        id: item['id'],
        customId : item['customid'],
        nurfeId : item['nurfeId'],
        image : item['image'],
        createAt : item['createAt'],
        content : item['content'],
        gender: item['gender'],
        major : item['major'],
        age : item['age'],
        puImage : item['puImage'],
        comment : item['comment'],
      }))

    return thread
}

export const ConvertDatatoThreadObject = (item : any) : ThreadDataType => {
    const comment : Comment[] = item[0]['comment'].map((item : any) => ({
        content : item['content'],
        createAt : item['createAt'],
        name : item['name'],

    }) )
    const thread : ThreadDataType = {
        id: item[0]['id'],
        customId : item[0]['customId'],
        nurfeId : item[0]['nurfeId'],
        image : item[0]['image'],
        createAt : item[0]['createAt'],
        content : item[0]['content'],
        gender: item[0]['gender'],
        major : item[0]['major'],
        age : item[0]['age'],
        puImage : item[0]['puImage'],
        comment : comment
    }

    return thread
}

export const convertName = (gender : string , age : string ) : string => {
    if(gender === "woman") {
        return "Nữ, " + age + " tuổi"
    } else return "Nam, " + age + " tuổi"
}

export const convertCreateAt = (date : Date) : string => {
    const formattedDate : Date = new Date(date)
    const createAt = formattedDate.toLocaleDateString() 
    return createAt
}

export const convertDateToAge = (date : Date) : number | "Chưa điền" => {
    if(date == null) {
        return "Chưa điền"
    }
    const today = new Date()
    const birth = new Date(date)
    const age = today.getFullYear() - birth.getFullYear()
    return age
}


export const sortComment = (comment : Comment[]) : Comment[] => {
    return comment.sort((a : Comment, b : Comment) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
}