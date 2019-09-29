<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Adldap;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

use App\Traits\HasUuid;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use HasRoles;
    use HasUuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'require_password_change'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userDatum() {
        return $this->hasOne(UserDatum::class);
    }

    public function findForPassport($username) {
        $localAccount = $this->where('username', $username)->first();
        $ldapProvider = Adldap::getDefaultProvider();
        $ldapAccount = $ldapProvider->search()->where('uid', '=', $username)->in('dc=sit,dc=kmutt,dc=ac,dc=th')->first();
        if (!$localAccount && $ldapAccount) {
            $localAccount = new User();
            $localAccount->username = $username;
            $localAccount->password = bcrypt(Str::random(16));
        }
        return $localAccount;
    }

    public function validateForPassportPasswordGrant($password) {
        $ldapProvider = Adldap::getDefaultProvider();
        $ldapAuth['student'] = $ldapProvider->auth()->attempt($this->username. ',ou=people,ou=st', $password);
        $ldapAuth['staff'] = $ldapProvider->auth()->attempt($this->username. ',ou=people,ou=staff', $password);
        $internalAuth = auth()->attempt([
            'username' => $this->username,
            'password' => $password
        ]);
        return $ldapAuth['student'] || $ldapAuth['staff'] || $internalAuth;
    }
}
