<?php

namespace App\Http\Controllers;

use Adldap;
use DB;
use Exception;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use URL;
use Validator;

use App\Models\User;

class AuthController extends Controller
{
    public function login() {
        $data = request()->all();
        $rules = array(
            'username' => 'required',
            'password' => 'required',
        );
        $validator = Validator::make($data,$rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $http = new \GuzzleHttp\Client;
        $authClient = DB::table('oauth_clients')->where('name', 'Laravel Password Grant Client')->first();
        try {
            $response = $http->post(env('DOCKER_SERVER_CONTAINER_NAME'). '/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $authClient->id,
                    'client_secret' => $authClient->secret,
                    'username' => $data['username'],
                    'password' => $data['password'],
                    'scope' => '',
                ],
            ]);
        }
        catch (RequestException $e) {
            if ($e->hasResponse()) {
                return $e->getResponse();
            }
        }
        return json_decode((string) $response->getBody(), true);
    }
}
