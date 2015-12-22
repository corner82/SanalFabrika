<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticationControlerLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $routeMatch = $serviceLocator->get('Application')->getMvcEvent()->getRouteMatch();
        $controller = $routeMatch->getParam('controller');
        $action = $routeMatch->getParam('action');
       
        // if no action found in the request object then no authentication
        if($controller == null) return true;
        
        foreach ($config['ControlorsTobeAuthenticated'] as $value) {
           if (0 === strpos($controller, $value, 0)) {
                return true;
            } 
        } 
        return false;
        
    }

}
