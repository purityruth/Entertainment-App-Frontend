import { BiShuffle, BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useGetLatestMusicQuery } from "../../app/api/GlobalApiSlice";
import { LoadingSkeleton } from "../LoadingSkeletonList";
import { useSwitchContentMutation } from "./features";
interface MusicItPrp extends MusicItemProp{
    onClick: (mediaUrl:string| number)=>void
}
export const SuccessPopUp = ({text,closeModal}:{text:string,closeModal:(val:boolean)=>void})=>(
    <Backdrop>
        <div className="p-4 relative flex flex-col items-center top-1/2 left-1/3 mb-4 text-sm w-1/3 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <AiOutlineClose onClick={closeModal} className="text-black text-2xl absolute mb-2 right-0 cursor-pointer font-bold"/>
            <div className="m-2">
                <FiCheckCircle className="text-green-500 text-9xl"/>
                <h5 className="block font-bold ">{text}</h5>
            </div>
        </div>
    </Backdrop>
)
const MusicItem = ({name, onClick,id, video_thumbnail,owner}:MusicItPrp)=>(
    <div onClick={()=>{onClick(id)}} className=" container bg-white cursor-pointer hover:bg-slate-200 shadow-md w-full rounded-lg p-1 mt-2 flex  items-center justify-between">
        <div className="flex">
            <img src={video_thumbnail} alt="" className=" sm:w-10 md:w-14 lg:w-16 sm:h-10 md:h-14 lg:h-16 rounded-sm "/>
            <div className="ml-4">
                <h4 className="sm:text-sm md:text-md lg:text-lg font-semibold">
                    {name.slice(0,20)??'Music Name'}
                </h4>
                <h6 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
                    {owner.username??'Artist Name'}
                </h6>
            </div>
        </div>
        <div className="flex items-center ">
            <button className=" sm:text-xs md:text-sm lg:text-base sm:mr-8 md:mr-8 lg:mr-10">
                <BiDotsVerticalRounded />
            </button>
        </div>
    </div>
);
interface MusicItemProp{
    name:string;
    description:string;
    id:number;
    media:{
        id:number
        media_url:string
    }
    owner:{
        id:number
        username:string
        email:string
    }
    video_thumbnail:string,
}
import LoadingSpinner from "../LoadingSpinner";
import { SnackBar } from "../auth/userLogin";
import { ErrorType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AiOutlineClose } from "react-icons/ai";
import Backdrop from "../Backdrop";
import { FiCheckCircle } from "react-icons/fi";
import React from "react";
export default function ControllerMusicPage(){
    const {data,isError:isErrorMusicFetch,  isLoading}=useGetLatestMusicQuery(1);
    const [switchContent,{isLoading:isLoadingSwitch, isSuccess, isError,error}] = useSwitchContentMutation()
    const d = useAppSelector((state:RootState)=>state.persistController.controller.matatu.id);
    const [openModal,setOpenModal] = React.useState(false);
    const handleSwitchContent = async (mediaUrl:string|number)=>{
        console.log('Attempting to swtich music')
        const data = {
            mediaID:mediaUrl,
            matatuID:d
        }
        console.log(data);
        try {
            const response = await switchContent(data).unwrap();
            console.log(response);
            setOpenModal(!openModal);
        } catch (error) {
            console.log(error)
            return;
        }
    }
    console.log('Error',isError,error);
    return (
        <>
            {isLoadingSwitch&&<LoadingSpinner/>}
            {isError&&
                <SnackBar text={'Error encountered'}/>
            }
            {
                isErrorMusicFetch&&(
                    <SnackBar text={(error as ErrorType).data.message??'Error encountered'}/>
                )
            }
            {isSuccess &&openModal &&<SuccessPopUp closeModal={()=>{setOpenModal(!openModal)}} text={'Music switched successfully'}/>}
            <div className="container">
                <div className="flex justify-between">
                    <div className="text-red-600">
                        <h5 className=" sm:text-base md:text-xl lg:2xl">My Music</h5>
                    </div>
                    <div className="flex gap-x-5 text-red-600">
                        <div className="flex">
                            <button className=" sm:text-sm md:text-md lg:text-md">
                                <BsFillPlayFill />
                            </button>
                            <button className=" sm:text-sm md:text-md lg:text-md ml-1">
                                Play
                            </button>
                        </div>
                        <div className="flex mr-2">
                            <button className="sm:text-sm md:text-md lg:text-md">
                                <BiShuffle />
                            </button>
                            <button className="sm:text-sm md:text-md lg:text-md ml-1">
                                Shuffle
                            </button>
                        </div>
                    </div>
                </div>
                {
                    isLoading?(
                        [1,2,3].map((id)=><LoadingSkeleton key={id}/>)
                    ):(<div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                            { data?.map((music:MusicItemProp,id:number)=>(
                                <MusicItem 
                                    video_thumbnail={music.video_thumbnail} 
                                    name={music.name}
                                    description={music.description}
                                    id={music.id}
                                    media={music.media}
                                    onClick={handleSwitchContent}
                                    owner={music.owner} 
                                    key={id}
                                />
                            ))}
                        </div>)
                    }
            </div>
        </>
    );
}