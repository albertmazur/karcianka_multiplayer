<?php

namespace App\Repository\Eloquent;

use App\Models\Game;
use App\Models\FriendList;
use App\Models\User;
use App\Repository\GameRepository as Repository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Date;

class GameRepository implements Repository{
    private Game $gameInvationModel;
    private FriendList $friendListModel;

    public function __construct(Game $gameInvation, FriendList $friendList){
        $this->gameInvationModel = $gameInvation;
        $this->friendListModel = $friendList;
    }

    public function listLatestGames(int $idAuth):Collection {
        $listLatestGames = $this->gameInvationModel->where("user_id", "=", $idAuth)->orderBy("updated_at", "DESC")->get();
        return $listLatestGames->unique('user_id');
    }

    public function listFriends(int $idAuth):Collection {
        $games = $this->gameInvationModel->where("user_id", "=", $idAuth)->get();

        $friendIds = $this->friendListModel
            ->where('user_id', $idAuth)
            ->where('accepted', true)
            ->pluck('user_friend_id')
            ->merge(
                $this->friendListModel
                    ->where('user_friend_id', $idAuth)
                    ->where('accepted', true)
                    ->pluck('user_id')
            )->unique();

        foreach ($games as $game) {
            $friendIds = $friendIds->reject(function ($friendId) use ($game){
                return $friendId == $game->send_user_id;
            });
        }

        return User::whereIn('id', $friendIds)->get();
    }

    public function add(int $idAuth, int $user):Game{
        $game1 = $this->gameInvationModel->where('user_id', '=', $idAuth)->where('send_user_id', '=', $user)->first();
        $game2 = $this->gameInvationModel->where('user_id', '=', $user)->where('send_user_id', '=', $idAuth)->first();

        if($game1 == null && $game2 == null){
            $newGame = new Game();
            $newGame->user_id = $user;
            $newGame->send_user_id = $idAuth;
            $newGame->who_now = $user;
            $newGame->sum = 0;
            $newGame->created_at = Date::now();
            $newGame->save();
            return $newGame;
        }
        else{
            if($game1 != null ) return $game1;
            if($game2 != null ) return $game2;
        }
    }

    public function remove(int $idAuth, int $user):User{
        $game = $this->gameInvationModel->where("user_id", '=', $idAuth)->where("send_user_id", '=', $user)->first();
        if($game != null){
            $game->delete();
            return User::find($user);
        }
        else return null;
    }

    public function get($id):Game|null{
        return $this->gameInvationModel->find($id);
    }
}
