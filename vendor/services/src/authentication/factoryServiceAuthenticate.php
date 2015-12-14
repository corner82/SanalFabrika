<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceAuthenticate  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        //$config = $serviceLocator->get('config');
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        if($authManager->getStorage()->isEmpty()) {
            $event = $serviceLocator->get('Application')
                                    ->getMvcEvent();
            $route = $event ->getRouteMatch()
                            ->getMatchedRouteName();
            // event detach denemesi tam olrak anlaşılmadı!!!!
            /*$eventManager = $app->getEventManager();
            $routeListener = new \Zend\Mvc\RouteListener();
            $routeListener->detach($eventManager);*/
            //$eventManager->detach($moduleRouteListener);
           if($route !== 'login') {
                $url = $event->getRouter()
                             ->assemble(array('action' => 'index'), 
                                                 array('name' => 'login'));
                $response = $event->getResponse();  
                $response->setHeaders( $response->getHeaders ()
                                                ->addHeaderLine ('Location', $url));
                $response->setStatusCode(302);
                $response->sendHeaders();
                $event->stopPropagation();       
                exit ();
            }
            //}
        }
        return false;
        
        
    }

}
