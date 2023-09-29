import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io"
import {useGetAllMixesQuery, useGetAllTrendingMixesQuery,useSwitchVideoMutation} from "../app/api/GlobalApiSlice"
import { Link } from 'react-router-dom';
import { Mix } from "../types";

interface CommonProps{
    title?: string
    owner?: string
    srcUrl?:string
    additionalStyles?: React.HTMLAttributes<HTMLDivElement>['className'] | undefined| string
    children?: React.ReactNode
    seeAllPath?: string
    path?:string
    onClick?: () => void;

}

export const SectionTitle = ({title,}: CommonProps) => {
    return(
        <div className="w-full flex justify-between items-center">
            <h3 className="text-lg font-semibold">
                 {title}
            </h3>
            <Link to="/explore/innerpage" className="text-text-primary cursor-pointer font-bold ml-2">See All</Link>
        </div>
    )
}
export const FeaturedItem = ({title,children,additionalStyles, owner,srcUrl}:CommonProps)=>(
    <div className={`w-1/3 min-w-[280px] mx-3 relative ${additionalStyles} flex flex-col cursor-pointer items-center justify-end pb-4 h-40`}>
        <img src={`${srcUrl}`} alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center"/>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl"></div>
        <div className="absolute  z-40">
            <h4 className="text-white text-center font-bold text-xl">
                {`${title?.slice(0, 20)}...`}
            </h4>
            <p className="text-center">{owner}</p>
        </div>
        {children}
    </div>
);
export const MusicItem = ({path,owner,srcUrl,title}:CommonProps)=>(
    <a href={path} className="min-w-[150px] mx-2 cursor-pointer hover:scale-105">
        <img src={`${srcUrl}`} alt="" className="w-32 h-32 rounded-xl object-cover"/>
        <h4 className="font-bold">
             {`${title?.slice(0, 20)}...`}
        </h4>
        <p className="uppercase text-xs">{owner}</p>
    </a>
)
export const RowScroll = ({children}:CommonProps)=>(
    <div className="w-full flex items-center no-scrollbar overflow-x-auto">
        {children}
    </div>
)

const ExplorePage = () => {

      const { data: allMixes } = useGetAllMixesQuery(1)
      const { data: trendingMixes } = useGetAllTrendingMixesQuery(1)

      const [switchVideoMutation] = useSwitchVideoMutation();

      const handleItemClick = async (id: string) => {
        try {
          const result = await switchVideoMutation({ variables: { id } });
      
          if ('data' in result) {
            console.log('Mutation response:', result.data);
          } else if ('error' in result) {
            console.error('Mutation error:', result.error);
          }
        } catch (error) {
          console.error('Mutation error:', error);
        }
      };
      


    return (
        <div className="mt-8 relative w-full no-scrollbar overflow-y-auto">
            <h2 className="text-2xl text-text-primary font-bold">Explore</h2>
            <div className="mt-10">
                <SectionTitle title="Featured Mixes" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                <div className="w-full flex items-center overflow-x-scroll">
                     {trendingMixes?.map((mix: Mix) => (
                        <FeaturedItem key={mix.id} title={`${mix?.name}`} owner={`${mix?.owner?.username}`} srcUrl={
                              mix && mix?.video_thumbnail
                                ? mix?.video_thumbnail
                                : 'https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                            }
                            onClick={() => handleItemClick(mix.id)}

                            />

                     ))}

                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="All mixes" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                <div className="w-full flex items-center">
                    <IoIosArrowDropleftCircle className="text-2xl mx-2 absolute left-0 text-text-primary"/>
                    <div className="flex mx-7 w-full relative overflow-y-hidden overflow-x-scroll items-center">
                        {allMixes?.map((mix: Mix) => (
                                <MusicItem
                                title={`${mix?.name}`}
                                owner={`${mix?.owner?.username}`}
                                srcUrl={mix && mix?.video_thumbnail
                                    ? mix?.video_thumbnail
                                    : 'https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'} onClick={function (): void {
                                        throw new Error("Function not implemented.");
                                    } }                                />
                        ))}

                    </div>
                    <IoIosArrowDroprightCircle className="text-2xl absolute right-0 mx-2 text-text-primary"/>
                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="New Releases" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
                <div className="w-full flex items-center">
                     {allMixes?.map((mix: Mix) => (
                                <MusicItem
                             title={`${mix?.name}`}
                             owner={`${mix?.owner?.username}`}
                             srcUrl={mix && mix?.video_thumbnail
                                 ? mix?.video_thumbnail
                                 : 'https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'} onClick={function (): void {
                                     throw new Error("Function not implemented.");
                                 } }                                />

                        ))}
                </div>
            </div>
            {/* <Player/> */}
        </div>
    );
};

export default ExplorePage;