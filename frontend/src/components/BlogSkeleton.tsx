import Appbar from "./Appbar";

export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="h-12 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-10"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                    </div>
                    <div className="col-span-4">
                        <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-4"></div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="w-full">
                                <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                                <div className="h-4 bg-gray-200 rounded-full w-3/4 mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
