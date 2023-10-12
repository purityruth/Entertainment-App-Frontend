import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUploadVideoContentMutation } from '../../app/api/GlobalApiSlice';

interface UploadContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: FormData) => void;
}

// interface ContentInformation {
//   name: string;
//   media: string;
//   video_thumbnail?: string | null;
//   description?: string | null;
// }

interface FormValues {
  name: string;
  media: string;
  description: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  media: yup.string().url('Invalid URL').required('Media URL is required'),
  description: yup.string().required('Description is requhttps://tailwindcss.com/docs/text-colorired'),
});

const UploadContentModal: React.FC<UploadContentModalProps> = ({ isOpen, onClose }) => {

  const [uploadContent] = useUploadVideoContentMutation()
  
  // const [title, setTitle] = useState<string>('');
  // const [description, setDescription] = useState<string>('');
  // const [genre, setGenre] = useState<string>('');
  // const [videoUrl, setVideoUrl] = useState<string>('');
  // const [musicFile, setMusicFile] = useState<File | null>(null);
  // const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // const [postableVideoUrl, setPostableVideoUrl] = useState<string>('')

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('description', description);
  //   formData.append('genre', genre);
  //   formData.append('video_url', videoUrl);
  //   if (musicFile) {
  //     formData.append('music', musicFile);
  //   }
  //   if (thumbnailFile) {
  //     formData.append('thumbnail', thumbnailFile);
  //   }

  //     formData.forEach((value, key) => {
  //     if (key.includes('video_url')) {
  //       setPostableVideoUrl(`${value}`)
  //     }

  //     const data = {
  //       videorefUrl: `${videoUrl}`,
  //       content_owner: `${userName}`
  //     };



  //   });

    


  //   // Call the onUpload function with the form data
  //   onUpload(formData);

  //   // Close the modal
  //   onClose();
  // };

  // const handleMusicFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const droppedFiles = e.dataTransfer.files;
  //   if (droppedFiles.length > 0) {
  //     setMusicFile(droppedFiles[0]);
  //   }
  // };

  // const handleThumbnailFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const droppedFiles = e.dataTransfer.files;
  //   if (droppedFiles.length > 0) {
  //     setThumbnailFile(droppedFiles[0]);
  //   }
  // };

  // const handleBrowseMusicClick = () => {
  //   const musicFileInput = document.getElementById('musicFileInput');
  //   if (musicFileInput) {
  //     musicFileInput.click();
  //   }
  // };

  // const handleBrowseThumbnailClick = () => {
  //   const thumbnailFileInput = document.getElementById('thumbnailFileInput');
  //   if (thumbnailFileInput) {
  //     thumbnailFileInput.click();
  //   }
  // };

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const videoObject = {
      name: `${data.name}`,
      media: `${data.media}`,
      video_thumbnail: `https://unsplash.com/photos/dKeB0-M9iiA`,
      description: `${data.description}`
    }

    console.log(videoObject)

    try {
      const response = await uploadContent(videoObject)
      console.log(response)


    } catch (error) {
     
//      console.error('Error:', error);
    }





  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="modal-container rounded-3xl bg-white w-96 md:w-1/2 mx-auto rounded shadow-lg z-50">
        <div className="modal-content p-4 text-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Upload Content</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter Name"
                {...register('name')} />
              <p className='text-xs text-rose-600'>{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter youtube url"
                {...register('media')} />
              <p className='text-xs text-rose-600'>{errors.media?.message}</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter description"
                {...register('description')} />
              <p className='text-xs text-rose-600'>{errors.description?.message}</p>
            </div>
          
            <button 
              type="submit"
              className="mt-4 bg-orange-500 w-60 text-white py-2 px-4 rounded-2xl hover:bg-orange-600"
              >Submit</button>
          </form>
        </div>
        {/* <div className="modal-content p-4 text-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Upload Content</h2>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="genre"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              placeholder="Enter genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="video_url"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              placeholder="Enter Youtube Video Url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <div className="flex p-4 justify-between">
            <div className="mb-4">
              <div
                className="border-dashed border rounded-2xl h-40 w-60 p-4 border-orange-500 cursor-pointer flex items-center justify-center"
                onDrop={handleMusicFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleBrowseMusicClick}
              >
                <label htmlFor="musicFileInput" className="cursor-pointer">
                  {musicFile ? (
                    <p>Music File: {musicFile.name}</p>
                  ) : (
                    <p>Drag & Drop Music File or <span className="text-blue-500">Browse</span></p>
                  )}
                </label>
                <input
                  type="file"
                  id="musicFileInput"
                  accept=".mp3, .wav"
                  style={{ display: 'none' }}
                  onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="mb-4">
              <div
                className="border-dashed border rounded-2xl h-40 w-60 border-orange-500 p-4 cursor-pointer w-300 flex items-center justify-center"
                onDrop={handleThumbnailFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleBrowseThumbnailClick}
              >
                <label htmlFor="thumbnailFileInput" className="cursor-pointer">
                  {thumbnailFile ? (
                    <p>Thumbnail File: {thumbnailFile.name}</p>
                  ) : (
                    <p className='text-base'>Drag & Drop Thumbnail Here or <span className="text-blue-500">Browse</span></p>
                  )}
                </label>
                <input
                  type="file"
                  id="thumbnailFileInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
          <button
            className="mt-4 bg-orange-500 w-60 text-white py-2 px-4 rounded-2xl hover:bg-orange-600"
            onClick={handleUpload}
          >
            Upload file
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UploadContentModal;
