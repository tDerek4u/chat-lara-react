import { Link } from "@inertiajs/react";

export default function ChatSidebar({recentMessages}) {
    return (
        <>
            <div className="search-box px-3 pt-3.5 text-slate-300">
                <div className="flex items-center justify-between">
                    <form action="" className="flex">
                        <i className="fa fa-search me-2 pt-3"></i>
                        <input type="text" className="font-light focus:outline-none text-black border-none shadow-none focus:ring-0" placeholder="Search" />
                    </form>
                    <div className="">
                        <button className="flex">
                            <i className="fa fa-user-group"></i>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="mt-3.5" />
            <div className="user-list h-screen overflow-y-auto">
                {
                    recentMessages.map((message, index) => (
                        <Link href={`/chat/${message.user_id}`} key={index} className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-200">
                            <div className="pr-2">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSle5CxW6QjBz4FH6p5szdloz2gPoQLJ8Outg&s" width="45" className="rounded-full" alt="" />
                            </div>
                            <div className="">
                                <h3 className="text-md text-violet-500">{message.name.length > 0 ? message.name : 'N/A'}</h3>
                                <p className="h-5 overflow-hidden text-sm font-light text-gray-400">{message.message}</p>
                            </div>
                        </Link>
                    ))
                }
               
                
            </div>
        </>
    );
}