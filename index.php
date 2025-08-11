<?php
require_once __DIR__.'/app/App.php';
require_once __DIR__.'/models/user/User.php';

App::init();
User::checkUser(true,true,true);
?>