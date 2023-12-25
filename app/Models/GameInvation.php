<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameInvation extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function userFriend(): BelongsTo{
        return $this->belongsTo(User::class, 'send_user_id');
    }
}
