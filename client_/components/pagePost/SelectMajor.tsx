import { listMajor } from '@/constant/listMajor';
import { MajorTitle } from '@/constant/screen/post';
import { MajorType } from '@/constant/type';
import React from 'react';
import { useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

interface Props {
  setMajor : (list : MajorType[]) => void 
  major : MajorType[]
}

const SelectMajor = ({setMajor, major } : Props) => {



  return(
    <MultipleSelectList 
        setSelected={setMajor} 
        data={listMajor} 
        save="value"
        placeholder={MajorTitle.title}
        notFoundText={MajorTitle.notFound}
        searchPlaceholder={MajorTitle.search}
        label={MajorTitle.major}
        boxStyles={{borderRadius:0}}
        
    />
  )

};

export default SelectMajor