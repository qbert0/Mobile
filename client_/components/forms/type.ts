
export interface RecomentDoctor {
    major : string,
    name : string,
    doctorId : string,
}

export const convertDataToRecommentDoctor = (data : any) : RecomentDoctor[] => {
    if(!Array.isArray(data)) {
        return []
    }

    const redoc : RecomentDoctor[] = data.map((item : any)=>({
        major : item['name'],
        name : item['Doctor']['name'],
        doctorId : item['doctor_id']
    }))

    return redoc
}
