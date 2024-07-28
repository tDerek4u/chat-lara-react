import ChatMessenger from '@/Components/Chat/ChatMessenger';
import ChatSidebar from '@/Components/Chat/ChatSidebar';
import ChatUserInfo from '@/Components/Chat/ChatUserInfo';
import ChatTextarea from '@/Components/Chat/Forms/ChatTextarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Chat(props) {
    
    const {auth , errors, recentMessages , receiver, messages } = props;

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user.name}
            errors={errors}

        >
            <Head title="Chat" />
            <div className="">
                <div className="messenger min-h-screen overflow-hidden p-1">
                    <div className="flex">
                        <div className="basis-2/6 bg-white">
                            <ChatSidebar recentMessages={recentMessages} />
                        </div>
                        <div className="basis-4/6 w-full">
                            {
                                receiver?.id ?
                                    (
                                        <>

                                            <ChatUserInfo receiver={receiver} />
                                            <hr />

                                            <div className="messenger mt-4 px-4">
                                                <div className="px-2">
                                                    <ChatMessenger messages={messages} auth_id={auth?.user.id} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className='flex justify-center items-center h-full  bg-slate-100'>
                                                Please select a User to start chatting...
                                            </p>
                                        </>
                                    )

                            }

                            <ChatTextarea receiver={receiver} />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
