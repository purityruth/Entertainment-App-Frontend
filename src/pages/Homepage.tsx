import { useGetAllArtistsQuery } from "../app/api/GlobalApiSlice";
import { useEffect, useState } from "react";
import { useGetAllGenresQuery } from "../app/features/content/contentApiSlice";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getContrastTextColor(bgColor: string) {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "text-black" : "text-white";
}
const topArt=[
    {
        name: "Harry",
        plays: "",
        img: "/E.png"
    },
    {
        name: "DJ Clef",
        plays: "",
        img: "/Q.png"
    },
    {
        name: "DJ Lensy",
        plays: "",
        img: "/Y.png"
    },
    {
        name: "DJ Bunney254",
        plays: "",
        img: "/R.png"
    },
    {
        name: "DJ Clef",
        plays: "",
        img: "/T.png"
    },
    {
        name: "Mr CEO",
        plays: "",
        img: "/W.png"
    },
]

interface MusicGenre {
    id: number;
    name: string;
    image: string;
    description: string | null;
}

function Homepage() {
  const { data: allArtists } = useGetAllArtistsQuery(1);
  console.log(allArtists)

    // const [genres, setAvailableGenres] = useState()
    const [musicGenres, setMusicGenres] = useState<MusicGenre[]>([]);

    console.log(musicGenres)

    const {
        data: genreItem,
    } = useGetAllGenresQuery(1)
   // console.log(genreItem.message);

    // if (genreItems !== null) {
    //     setMusicGenres(genreItems.message);
    //     console.log(genreItems.message)
    // }

    useEffect(() => {
        if(genreItem !== null) {

            const data = {
                ...genreItem
            };

            setMusicGenres(data.message);
           // console.log(data)

           //  console.log(genreItem)
        }

    }, [genreItem]);

  const genreItems = [
    "Hiphop",
    "Electric Pop",
    "Jazz",
    "Dance Beat",
    "Classic",
    "Metal",
    "Rock",
    "Country",
  ];

    return (
        

        <div className='container'>
            <div className='m-10 md:m-20'>
                <div className='mb-2'>
                    <p className='text-universal-primary  md:text-3xl'>OUR FEATURES</p>
                </div>
                <div className='mb-10'>
                    <h1 className='text-2xl md:text-5xl  font-semibold capitalize'>Get Premium Access &</h1>
                    <h1 className='text-xl md:text-4xl font-semibold capitalize'>Unlock All Popular Creators</h1>
                </div>
                <div className='flex flex-row items-center '>
                    <button className='bg-universal-primary text-sm hover:bg-blue-700 text-white font-bold md:py-3 py-2 md:px-8 px-6 rounded-full'>
                        Get Now
                    </button>
                    <div className='mx-1.5' />
                    <p className='text-universal-primary text-sm md:text-md underline underline-offset-1 opacity-100 hover:opacity-80 cursor-pointer'>1 Month Free Trial</p>
                </div>
            </div>

            <div className='md:mx-20 bg-white rounded-lg px-2 py-2 md:px-5 md:py-5'>
                <div className='flex flex-row items-center md:mx-4'>
                    <p className='mr-auto text-xl mb-2 font-semibold'>TOP ARTISTS</p>
                    <p className='text-md opacity-60 hover:opacity-100 cursor-pointer'>More List</p>
                </div>

                <div className="flex flex-wrap justify-center">
                    {topArt.map((artist) => {
                        return (
                            <div className='flex flex-col items-center p-1 cursor-pointer' >
                                <img src={artist.img} alt="" className='bg-grey shadow-md rounded-lg w-24 h-24' />
                                {/* <div className='bg-grey shadow-md rounded-lg w-28 h-28'></div> */}
                                <p className="text-sm">{artist.name}</p>
                                {/* <p>30M PLAYS</p> */}
                            </div>
                        );
                    })}
                </div>
            </div>

            
            <div className='h-10' />
            <div className='md:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
                
                <div className='bg-white rounded-lg'>
                    <div className='flex flex-row items-center mx-4 my-6'>
                        <p className='mr-auto text-xl mb-2 font-semibold'>TOP ARTISTS</p>
                        <p className='text-md opacity-60 hover:opacity-100 cursor-pointer'>More List</p>
                    </div>

                    <div className="flex flex-wrap justify-center">
                        {topArt.map((artist) => {

                            return (
                                <div key={artist.name} className='flex flex-col items-center p-1' >
                                    <div className='bg-grey shadow-md rounded-lg w-28 h-28'></div>
                                </div>
                                
                            );
                        })}
                    </div>
                </div>

                <div className='bg-white rounded-lg'>
                    <div className='flex flex-row items-center mx-4 my-6'>
                        <p className='mr-auto text-xl mb-2 font-semibold'>TOP GENRE</p>
                        <p className='text-md opacity-60 hover:opacity-100 cursor-pointer'>More List</p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center">

                        
                        {genreItems.map((genre) => {
                            const bgColor = getRandomColor();
                            const textColorClass = getContrastTextColor(bgColor);

                            return (
                                <button
                                    key={genre}
                                    className={`px-5 py-1 md:py-4 m-2 rounded-full font-bold ${textColorClass}`}
                                    style={{ backgroundColor: bgColor }}
                                >
                                    {genre}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            </div>
        
  );
}

export default Homepage;
