<?php

namespace Custom\Services\Session;

/*use Zend\ServiceManager\InitializerInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\EventManager\EventManagerAwareInterface;*/

class serviceSession /*implements InitializerInterface*/ {
    public function __construct() {
        
    }
    /*
    public function initialize($instance,ServiceLocatorInterface $serviceLocator) {
        
    }
    */
    
    public function test() {
        print_r("!!custom service test fonk()!!");
    }
}

