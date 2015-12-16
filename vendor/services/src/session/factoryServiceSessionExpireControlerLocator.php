<?php

namespace Custom\Services\Session;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceSessionExpireControlerLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $app = $serviceLocator->get('Application');  
        $sessionManager = $app ->getServiceManager()
                               ->get('SessionManagerDefault');
        
        // İf session is not ready go to login module index action
        $sessionID = $sessionManager->getId();
        if(!$sessionManager->getSaveHandler()->read($sessionID)) {
            
            // if session expires set auth data empty
            $authManager = $serviceLocator->get('authenticationManagerDefault');
            $authManager->getStorage()->clear();
            
            $event = $app->getMvcEvent();
            $route = $event->getRouteMatch()->getMatchedRouteName();
            $sessionManager->regenerateId(true);
            if($route !== 'login') {
                $url = $event->getRouter()->assemble(array('action' => 'index'), array('name' => 'login'));
                $response = $event->getResponse();  
                $response->setHeaders( $response->getHeaders ()->addHeaderLine ('Location', $url));
                $response->setStatusCode(302);
                $response->sendHeaders();
                $e->stopPropagation();       
                exit ();
            }
        }
              return true;
    }

}