<?php

namespace Custom\Services\Session;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceSessionExpireControlerLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $app = $serviceLocator->get('Application');  
        $sessionManager = $app ->getServiceManager()
                               ->get('SessionManagerDefault');
        
        // session oluşmadıysa login sayfasına yönlendirme
        $sessionID = $sessionManager->getId();
        if(!$sessionManager->getSaveHandler()->read($sessionID)) {
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
        
        print_r('!!session_id-->'.$sessionID.'!!');
        //$container = new \Zend\Session\Container('admin',$sessionManager);    
        //print_r($container->adminAccess);
        //print_r($_SESSION); 
        //$container->adminAccess = 2;
        
        /*if (!$container->offsetExists('adminAccess')) {
            print_r("---session container initialized zeynelllll---");
            //$serviceManager = $app->getServiceManager();
            //$sessionManager->regenerateId(true);
            $container->adminAccess = 2;
        }         
        return $container;*/
        
        return true;
    }

}