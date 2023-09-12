const loadingArray = [1,2,3,4,5,6,7,8,9,10,11,12]
const LoadingSkeleton = () => {
    return(
        <div role="status" className="w-44 border-gray-300 m-2  min-w-[80px] xl:min-w-[100px] md:min-w-[190px] border p-3 md:p-2 rounded  animate-pulse ">
            <div className="flex items-center justify-center h-32 mb-4 bg-gray-300 rounded dark:bg-gray-900">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                </svg>
            </div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 w-20 mb-4"></div>
        </div>
    )
}
const LoadingSkeletonList = () => (
    <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-2">
            {loadingArray.map((index)=>(
                <LoadingSkeleton key={index}/>
            ))}
    </div>
)
export default LoadingSkeletonList;