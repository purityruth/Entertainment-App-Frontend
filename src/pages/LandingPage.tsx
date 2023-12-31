// import React from 'react';
// import Backdrop from '../components/Backdrop';   
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { useGetAllTrendingMixesQuery, useGetLatestMusicQuery } from '../app/api/GlobalApiSlice';
import { useState } from 'react';
import { Mix } from '../types';
import SignModal from './SignModal';
// import { useNavigate } from 'react-router-dom';

const ButtonStyle = ({ text }: { text: string }) => (<button className='w-full rounded-md hover:bg-red-600 my-3 font-bold uppercase text-white bg-text-primary py-3'>{text}</button>)
export const JointTunce = () => (
    <div className='h-screen flex pt-8 justify-center md:items-center'>
        <div className='bg-black w-4/5 md:w-1/2 max-h-[500px] rounded-xl'>
            <div className='flex py-8 flex-col md:flex-row w-full h-full px-2 items-center'>
                <img src='/tunyce-light-text.jpeg'
                    alt='tunyce media'
                    className='w-full md:w-1/2 min-h-[200px] h-3/4'
                />
                <div className='m-4 md:ml-4 w-full md:w-1/2'>
                    <p className='text-white text-2xl'>Join the Tunyce community</p>
                    <p className='text-white text-sm'>Already have an account?</p>
                    <ButtonStyle text='Sign Up' />
                    <ButtonStyle text='Sign In' />
                </div>
            </div>
        </div>
    </div>
);
const BoldText = ({ text }: { text: string }) => <h2 className="font-bold md:text-2xl text-xl my-4">{text}</h2>
const RowContainer = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <div className="flex items-center w-full justify-between px-3" onClick={onClick}>
        <BoldText text={text} />
        <div>
            <BiChevronLeftCircle className="text-2xl inline-block mx-1" />
            <BiChevronRightCircle className="text-2xl inline-block mx-1" />
        </div>
    </div>
);
const GenreBox = ({ text, bgcolor, onClick }: { text: string, bgcolor: string, onClick: () => void }) => (
    <p onClick={onClick} className={`px-4 cursor-pointer text-white text-sm mx-1 my-2 rounded-lg font-semibold py-1 ${bgcolor}`}>
        {text}
    </p>
);
const EasyAfterNoon = ({ image, onClick }: { image: string, onClick: () => void }) => (
    <div onClick={onClick} style={{ backgroundImage: `url(${image}` }} className="w-1/2 relative bg-opacity-10 bg-black cursor-pointer h-40  bg-cover bg-center bg-no-repeat rounded">
        <div className='absolute bottom-2 left-1/4'>
        </div>
    </div>
)
const MusItem = ({ plays, title, image, onClick }: { plays: string, title: string, image: string, onClick: () => void }) => (
    <div onClick={onClick} className="flex border rounded-xl p-px cursor-pointer hover:scale-105 m-2 justify-center items-center">
        <img src={image} alt="tunyce media" className="min-w-1/4 max-h-12 rounded-xl" />
        <div className="ml-3 w-3/4">
            <h4 className="text-sm uppercase font-bold">{title}</h4>
            <p className="text-sm my-2">{plays}</p>
        </div>
    </div>
)


function Page() {
    const { data: latestMixes, isLoading: isLoadingMixes } = useGetLatestMusicQuery([]);
    const { data: trendingMixes, isLoading: isLoadingTrending } = useGetAllTrendingMixesQuery([]);
    const [visibleItems, setVisibleItems] = useState(9);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const navigate = useNavigate()
    console.log(trendingMixes);
    console.log(isLoadingMixes)
    console.log(isLoadingTrending)


    const showMore = () => {
        // Go to next page
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 9);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='w-full h-full py-3'>
            <header className="w-full flex mb-3 items-center justify-between">
                <div className="flex items-center justify-between rounded-2xl px-2 w-4/5 md:w-1/3 bg-gray-200">
                </div>
                <div className="hidden md:flex md:flex-row flex-col items-center">
                    <a href="/signup" className="border cursor-pointer px-4 my-2 rounded-2xl border-black ">Sign Up</a>
                    <a href="/login" className="px-4 py-1 my-2 mx-3 bg-text-primary rounded-2xl text-white font-semibold">Sign In</a>
                </div>
            </header>
            <div className="flex flex-row flex-wrap">
                <GenreBox onClick={() => openModal()} text="Hip hop" bgcolor="bg-pink-400" />
                <GenreBox onClick={() => openModal()} text="Afro pop" bgcolor="bg-red-500" />
                <GenreBox onClick={() => openModal()} text="Dancehall" bgcolor="bg-lime-300" />
                <GenreBox onClick={() => openModal()} text="Jazz" bgcolor="bg-purple-600" />
                <GenreBox onClick={() => openModal()} text="Rhumba" bgcolor="bg-blue-500" />
                <GenreBox onClick={() => openModal()} text="Gengetone" bgcolor="bg-pink-400" />
                <GenreBox onClick={() => openModal()} text="Kenyan" bgcolor="bg-pink-400" />
                <GenreBox onClick={() => openModal()} text="Reggae" bgcolor="bg-orange-500" />
                <GenreBox onClick={() => openModal()} text="Podcasts" bgcolor="bg-red-500" />
            </div>
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
            <div className="mx-4 w-full my-6">
                <div>
                    <p>MUSIC TO GET YOU STARTED</p>
                    <RowContainer onClick={showMore} text='Popular' />
                    <div className="grid grid-cols-1 md:grid-cols-4 xs:grid-cols-3">
                        {trendingMixes && trendingMixes?.slice(visibleItems - 9, visibleItems).map((tmix: Mix) => (
                            <MusItem
                                key={tmix.id}
                                plays='Artist'
                                title={tmix?.owner.username ?? 'Mix'}
                                onClick={() => openModal()}
                                image={tmix && tmix.video_thumbnail ? tmix.video_thumbnail :
                                    'https://png.pngtree.com/png-vector/20190605/ourmid/pngtree-headphones-icon-png-image_1477434.jpg'} />
                        ))}
                    </div>
                </div>
                <div>
                    <RowContainer onClick={showMore} text='New Releases' />
                    <div className="flex flex-row gap-2">
                        {latestMixes?.slice(0, 7).map((mix) => (
                            <EasyAfterNoon
                                key={mix.id}
                                onClick={() => openModal()}
                                image={mix && mix.video_thumbnail ? mix.video_thumbnail :
                                    'https://png.pngtree.com/png-vector/20190605/ourmid/pngtree-headphones-icon-png-image_1477434.jpg'} />
                        ))}
                    </div>
                </div>

                
            </div>
            <SignModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Page;