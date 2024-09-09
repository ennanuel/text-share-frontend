

export default function LoadingSpace() {
    return (
        <div className="flex min-h-[100vh] gap-20 px-[10%] py-20">
            <div className="flex-1 flex flex-col gap-10">
                <div className="flex items-center justify-between gap-10">
                    <span className="loading-gradient w-full h-full max-w-[80%] block rounded-full" />
                    <span className="loading-gradient block h-[50px] aspect-square rounded-full" />
                </div>
                <div className="flex flex-wrap gap-4">
                    <span className="loading-gradient w-full rounded-full max-w-[120px] flex items-center p-2 ">
                        <span className="w-6 aspect-square rounded-full bg-black/20"></span>
                    </span>
                    <span className="loading-gradient w-full rounded-full max-w-[120px] flex items-center p-2">
                        <span className="w-6 aspect-square rounded-full bg-black/20"></span>
                    </span>
                    <span className="loading-gradient w-full rounded-full max-w-[120px] flex items-center p-2">
                        <span className="w-6 aspect-square rounded-full bg-black/20"></span>
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="loading-gradient h-6 w-full block px-[2px] rounded-full"></span>
                    <span className="loading-gradient h-6 w-[30%] block px-[2px] rounded-full"></span>
                </div>
                <div className="loading-gradient flex justify-end p-3 rounded-full">
                    <span className="loading-gradient block h-10 w-20 rounded-full"></span>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <span className="loading-gradient block flex-1 max-h-[300px] rounded-2xl"></span>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex gap-4">
                        <span className="loading-gradient h-6 flex-1 max-w-[100px] block px-[2px] rounded-full"></span>
                        <span className="loading-gradient h-6 flex-1 max-w-[100px] block px-[2px] rounded-full"></span>
                    </div>
                    <span className="loading-gradient h-6 w-full max-w-[100px] block px-[2px] rounded-full"></span>
                </div>
                <span className="block h-[50px] rounded-full bg-black/20 mt-4" />
            </div>
        </div>
    )
}