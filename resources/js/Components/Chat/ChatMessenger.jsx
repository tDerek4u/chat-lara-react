import { Fragment } from "react";

export default function ChatMessenger({ messages, auth_id }) {

    const isReceivedMessage = (message) => {
        return message.receiver_id === auth_id;
    }

    return (
        <>
            {
                (messages || []).map((message, index) => (
                    <Fragment key={index}>
                        <div className={` ${isReceivedMessage(message) ? 'receive-chat' : 'send-chat' } flex relative ${isReceivedMessage(message) ? 'justify-start' : 'justify-end' } `}>
                            <div className={`text-sm mb-2 max-w-[80%] rounded ${isReceivedMessage(message) ? 'bg-violet-400' : 'bg-indigo-400' }  px-5 py-2 text-white`}>
                                <p>{message?.message}</p>
                            </div>
                        </div>

                    </Fragment>
                ))
            }
        </>
    );
}