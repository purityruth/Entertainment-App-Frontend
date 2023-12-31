import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io"
import { useGetAllTrendingMixesQuery, useGetLatestMusicQuery } from "../app/api/GlobalApiSlice"
import { Link, useNavigate } from 'react-router-dom';
import { Mix, MusicItemProp } from "../types";
import { LoadingSkeleton } from "../components/LoadingSkeletonList";
import { BsFillPlayFill } from "react-icons/bs";

interface CommonProps{
    title?: string
    owner?: string
    srcUrl?:string
    additionalStyles?: React.HTMLAttributes<HTMLDivElement>['className'] | undefined| string
    children?: React.ReactNode
    seeAllPath?: string
    path?:string
    onClick?: (id: string) => void;
    id?:string
}

export const SectionTitle = ({title, seeAllPath, }: CommonProps) => {
    return(
        <div className="w-full flex justify-between items-center">
            <h3 className="text-lg font-semibold">
                 {title}
            </h3>
            <Link to={seeAllPath?seeAllPath:"/explore/innerpage"} className="text-text-primary cursor-pointer font-bold ml-2">See All</Link>
        </div>
    )
}
export const FeaturedItem = ({ title, children, additionalStyles, owner, srcUrl, onClick }:CommonProps)=>(
    <div className={`w-1/3 min-w-[280px] mx-3 relative ${additionalStyles} flex flex-col cursor-pointer items-center justify-end pb-4 h-40`} onClick={() => onClick?.('some-id')}>
        <img src={`${srcUrl}`} alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center"/>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl"></div>
        <div className="absolute  z-40">
            <h4 className="text-white text-center font-bold text-xl">
                {`${title?.slice(0, 10)}...`}
            </h4>
            <p className="text-center">{owner}</p>
            <div className="flex">
              <button className=" sm:text-sm md:text-md lg:text-xl">
                <BsFillPlayFill />
              </button>
              <button className=" sm:text-sm md:text-md lg:text-xl ml-1">
                Play
              </button>
            </div>
        </div>
        {children}
    </div>
);
export const MusicItem = ({ path, owner, srcUrl,id, title, onClick }:CommonProps)=>(
    <Link to={path ?? ''} state={{id:id,name:title}} className="min-w-[150px] mx-2 cursor-pointer hover:scale-105" onClick={() => onClick?.('some-id')}>
        <img src={`${srcUrl}`} alt="" className="w-32 h-32 rounded-xl object-cover"/>
        <h4 className="font-bold">
             {`${title?.slice(0, 10)}...`}
        </h4>
        <p className="uppercase text-xs">{owner}</p>
        <div className="flex">
              <button className=" sm:text-sm md:text-md lg:text-xl">
                <BsFillPlayFill />
              </button>
              <button className=" sm:text-sm md:text-md lg:text-xl ml-1">
                Play
              </button>
        </div>
    </Link>
)
export const RowScroll = ({children}:CommonProps)=>(
    <div className="w-full flex items-center no-scrollbar overflow-x-auto">
        {children}
    </div>
)

const ExplorePage = () => {

    const navigate = useNavigate();

    // const isNormalUser: any = useAppSelector((state: RootState) => state.persistAuth.auth.is_normaluser);

    const { data: allMixes, isLoading: isLoadingMix } = useGetLatestMusicQuery(1)
    
      const { data: trendingMixes,isLoading:isLoadingAllTrend } = useGetAllTrendingMixesQuery(1)

      // const [switchVideoMutation] = useSwitchVideoMutation();

      const handleItemClick = (id: number) => { 
          navigate(`/creators/videos/${id}`)
      };

    return (
        <div className="mt-8 relative w-full no-scrollbar overflow-y-auto">
            <h2 className="text-2xl text-text-primary font-bold">Discover</h2>
            {/* <div className="mx-4 w-full my-6">
                    <div  className="flex border w-2/4 rounded-xl p-px cursor-pointer hover:scale-105 m-2 items-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMw89oVMvX1fVuYE8Hq9Z6NFe5lWvkl-7QODGdR02How&s" alt="tunyce media" className="min-w-2/4 max-h-70 rounded-xl" />
                        <div className="ml-3 w-2/4">
                            <h4 className="text-sm my-2 uppercase px-2 py-1 font-bold">Lokole Festival</h4>
                            <p>Watch Lokole Festival Live! </p>
                    
                            <button onClick={() =>{
                                        navigate("/ferregola")}}
                        
                        className="bg-universal-primary w-4/5 my-2  text-white font-bold text-lg px-2 py-1 rounded-md">Book Now</button>
                            
                        
                        </div>
                        
                    </div>
                    <RowContainer onClick={showMore} text='Buy Online Tickets' />
                    
            </div> */}
            <div className="mt-10">
                <SectionTitle title="Featured Mixes" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                <div className="w-full flex items-center no-scrollbar overflow-x-scroll">
                     {
                        isLoadingAllTrend?(
                            [1,2,3,4,5,].map((index)=>(<LoadingSkeleton key={index}/>))
                        ):(
                            trendingMixes?.filter((mix: Mix) => mix.media?.media_url.includes('youtube.com')).map((mix: Mix) => (
                                <FeaturedItem key={mix.id} title={`${mix?.name}`} owner={`${mix?.owner?.username}`} srcUrl={mix?.video_thumbnail}
                                    onClick={() => {
                                        const stringVal: string = mix.id;
                                        const mixId: number = parseInt(stringVal, 10);
                                        handleItemClick(mixId)
                                    }}
                                />
                            ))
                        )
                     }

                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="All mixes" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                <div className="w-full flex no-scrollbar overflow-x-auto items-center">
                    <IoIosArrowDropleftCircle className="text-2xl mx-2 absolute left-0 text-text-primary"/>
                    <div className="flex mx-7 w-full relative overflow-y-hidden overflow-x-scroll items-center">
                        {
                            isLoadingMix?(
                                [1,2,3,4,5,].map((index)=>(<LoadingSkeleton key={index}/>))
                            ):(
                                    allMixes?.filter((mix: MusicItemProp) => mix.media?.media_url.includes('youtube.com'))
                                    .map((mix: MusicItemProp) => (
                                        <MusicItem
                                            title={`${mix?.name}`}
                                            owner={`${mix?.owner?.username}`}
                                            srcUrl={mix?.video_thumbnail}
                                            onClick={() => handleItemClick(mix.id)}
                                        />
                                    )
                        ))}

                    </div>
                    <IoIosArrowDroprightCircle className="text-2xl absolute right-0 mx-2 text-text-primary"/>
                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="New Releases" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                <div className="w-full no-scrollbar overflow-x-auto flex items-center">
                    {allMixes?.filter((mix: MusicItemProp) => mix.media?.media_url.includes('youtube.com'))
                    .map((mix: MusicItemProp) => (
                        <MusicItem
                            title={`${mix?.name}`}
                            owner={`${mix?.owner?.username}`}
                            srcUrl={mix?.video_thumbnail}
                            onClick={() => handleItemClick(mix.id)}                           
                        />
                        ))}
                </div>
            </div>
            {/* <Player/> */}
        </div>
    );
};

export default ExplorePage;