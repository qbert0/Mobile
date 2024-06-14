'use server'

import { DoctorDataType, convertDataToDoctorType } from "@/contants/Type/DoctorType";
import instance from "@/untils/axios";
import InfoDoctor from "./InfoDoctor";
import Clinics from "./Clinics";
import ClinicForm from "./ClinicForm";

interface Props {
    id : string
}

const CusPage = async ({id} : Props) => {
    const data : any = await instance.get(`/doctor/${id}`);
    const doctors : DoctorDataType[] = convertDataToDoctorType(data)
    const doctor = doctors[0];
    return (
        <div className="">
            <InfoDoctor doctor={doctor}/>
            <Clinics doctor={doctor}/>
            <ClinicForm doctor={doctor}/>
        </div>
    )
}

export default CusPage;