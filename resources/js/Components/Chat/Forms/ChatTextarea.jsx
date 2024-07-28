import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ChatTextarea({ receiver }) {
    const { data, setData, post, reset } = useForm({
        message: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
       
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(receiver);
        post(route('chat.store', receiver?.id));
        reset('message');
    };

    return (
        <>
            <div className="fixed bottom-0 bg-gray-100 py-1.5 w-full rounded">
                <form action="" onSubmit={submit}>
                    <TextInput
                        type="text"
                        name="message"
                        value={data.message}
                        onChange={onHandleChange}
                        cols="111"
                        className="h-14 w-full place-content-center rounded-md overflow-y-auto focus:outline-none text-black border-none shadow-none focus:ring-0 px-4 pt-3 font-light"
                        placeholder="Write a message . . ."
                    />
                </form>
            </div>
        </>
    );
}
