<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;




interface ChatMessageInterface
{
    public function index(int $senderId ,int $receiverId) : Collection;
    public function getRecentUserWithMessage(int $senderId) : Collection;
    public function sendMessage(int $senderId, int $receiverId, string $message) : Collection;
    public function filterRecentMessages(Collection $recentMessages, int $senderId) : Collection;

}