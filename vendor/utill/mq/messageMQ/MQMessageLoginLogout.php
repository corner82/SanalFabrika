<?php

namespace Utill\MQ\MessageMQ;

class MQMessageLoginLogout extends \Utill\MQ\MessageMQ\MQMessage {
    
    
    const LOGIN_OPERATAION                 = 42;
    const LOGOUT_OPERATION                 = 43;


    public function __construct() {

    }
}

