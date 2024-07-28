<?php

namespace App\Services;

use App\Models\Message;

class ChatMessageservice
{
    public function sendMessage($senderId, $receiverId, $message){
        return Message::create([
            'sender_id' => $senderId,
            'image'=> null,
            'room_id' => null,
            'receiver_id' => $receiverId,
            'message' => $message,
        ]);
    }
}