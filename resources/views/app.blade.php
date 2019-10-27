<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>SIT ResearchStock</title>
        <link href={{ asset('css/app.css') }} rel="stylesheet" />
    </head>
    <body>
        <noscript>
            <div>
                <h1>JavaScript Disabled</h1>
                <p>To continue using this application, please enable JavaScript for this domain name at your web browser setting.</p>
                <p>For more information, please visit <a href="https://enable-javascript.com/" target="_blank">this page</a> to learn how to enable JavaScript on your browser.</p>
                <hr />
                <em>&copy; {{ Carbon::now()->year }} School of Information Techonlogy, KMUTT. All right reserved.</em>
            </div>
        </noscript>
        <div id="app"></div>
        <script src={{ asset('js/app.js') }}></script>
    </body>
</html>