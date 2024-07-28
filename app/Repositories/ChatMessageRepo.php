<?php

namespace App\Repositories;

use App\Interfaces\ChatMessageInterface;
use App\Models\Message;
use App\Models\User;
use App\Services\ChatMessageService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;



class ChatMessageRepo implements ChatMessageInterface
{
    private $chatMessageService;

    public function __construct(ChatMessageService $chatMessageService){
        $this->chatMessageService = $chatMessageService;
    }
    
    public function index(int $senderId, int $receiverId) : Collection {
        return Message::whereIn('sender_id', [$senderId, $receiverId])->whereIn('receiver_id', [$receiverId, $senderId])->get();
    }

    public function getRecentUserWithMessage(int $senderId): Collection {

        DB::statement("SET SESSION sql_mode=''");
        $recentMessages = Message::where(function($query) use ($senderId) {
            $query->where('sender_id', $senderId)
                  ->orWhere('receiver_id', $senderId);
        })->groupBy('sender_id', 'receiver_id')->select('receiver_id', 'sender_id', 'message')->orderBy('id', 'desc')->limit(30)->get();
        
    
        return $this->filterRecentMessages($recentMessages, $senderId);
    }
    
    
    
    public function sendMessage(int $senderId, int $receiverId, string $message) : Collection {
        return $this->chatMessageService->sendMessage($senderId, $receiverId, $message);
    }

    public function filterRecentMessages(Collection $recentMessages,int $senderId) : Collection {
        $recentUserWithMessages = [];
        $usedUserIds = [];
        foreach ($recentMessages as $message) {
            
            $user_id = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            if (!in_array($user_id, $usedUserIds)) {
                $recentUserWithMessages[] = [
                    'user_id' => $user_id,
                    'message' => $message->message,
                ];

                $usedUserIds[] = $user_id;
            }
        }

        foreach ($recentUserWithMessages as $key => $userMessage) {
            $recentUserWithMessages[$key]['name'] = User::where('id',$userMessage['user_id'])->value('name') ?? '';
        }

        return collect($recentUserWithMessages);
    }
}
