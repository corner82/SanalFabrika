<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceAuthenticationControlerLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $routeMatch = $serviceLocator->get('Application')->getMvcEvent()->getRouteMatch();
        $controller = $routeMatch->getParam('controller');
        $action = $routeMatch->getParam('action');
        //print_r('--factoryServiceAuthenticationControlerLocator()  action-->'.$action.'--');
        //print_r('--factoryServiceAuthenticationControlerLocator()  controlor-->'.$controller.'--');
        
        foreach ($config['ControlorsTobeAuthenticated'] as $value) {
           print_r($value);
           if (0 === strpos($controller, $value, 0)) {
                return true;
            } 
        } 
        return false;
        
    }

}
