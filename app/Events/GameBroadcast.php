<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameBroadcast implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private int $userId;
    private array $gameState;

    /**
     * Create a new event instance.
     */
    public function __construct(int $userId, array $gameState){
        $this->userId = $userId;
        $this->gameState = $gameState;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array{
        return [
            new PrivateChannel('PrivateGameChannel.user.'.$this->userId),
        ];
    }

    public function broadcastAs(){
        return 'private_game';
    }

    public function broadcastWith(){
        return $this->gameState;
    }
}
