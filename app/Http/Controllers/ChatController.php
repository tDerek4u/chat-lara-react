<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\User;
use App\Repositories\ChatMessageRepo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends Controller
{
    //
    private $chatMessageRepo;


    public function __construct(ChatMessageRepo $chatMessageRepo)
    {
        $this->chatMessageRepo = $chatMessageRepo;
    }

    public function index(Request $request , ?int $receiverId = null){
        
        $messages = empty($receiverId) ? ([]): $this->chatMessageRepo->index((int)$request->user()->id,(int) $receiverId);

        return Inertia::render('Chat/Chat', [
            'messages' => $messages,
            'recentMessages' => $this->chatMessageRepo->getRecentUserWithMessage($request->user()->id),
            'receiver' => User::find($receiverId)
        ]);
    }

    public function store(Request $request, ?int $receiverId = null){
        
        $request->validate([
            'message' => 'required|string'
        ]);

        if(empty($receiverId)){
            return;
        }

       

        try {
            $messages = $this->chatMessageRepo->sendMessage((int) $request->user()->id, $receiverId, $request->message);

            event(new MessageSent($messages));

            return Redirect::route('chat.index', $receiverId);
        } catch (\Throwable $th) {
            logger($th);
        }


    }
}

