export default function ChatUserInfo({receiver}) {
    return (
        <>
            <div className="user-info-header bg-white px-5 py-[11px]">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSle5CxW6QjBz4FH6p5szdloz2gPoQLJ8Outg&s" width="46" className="rounded-full" alt="" />
                        <h3 className="pl-2 text-gray-400">{receiver?.name}</h3>
                    </div>
                    <div className="place-content-center">
                        <i className="fa fa-message text-violet-400"></i>
                        <i className="fa fa-video ms-2 text-violet-400"></i>
                        <i className="fa fa-phone ms-2 text-violet-400"></i>
                    </div>
                </div>
            </div>
        </>
    );
}