'use server'
import ButtonTest from "@/components/MediaCom/ButtonTest";
import { IdPage } from "./[...id]/_page/IdPage";
import SearchParam from "@/components/SearchParam/SearchBar";
import ListDataSearch from "@/components/SearchParam/ListDataSearch";


const MediaPage = async({
  searchParams,
} : {
  searchParams? : {
      query? : string
  }
}) => {

  const query = searchParams?.query || ""

  return (
    <div className='w-full '>
      {/* <ButtonTest  path="user_2f9EC351AyOw5H0FYNsbxwOmBRg" idPage={IdPage.customer} />
      <ButtonTest  path="123" idPage={IdPage.profile} />
      <ButtonTest  path="123" idPage={IdPage.examination} /> */}


      <SearchParam />
      <ListDataSearch query={query}/>

    </div>
  )
};
  
export default MediaPage;