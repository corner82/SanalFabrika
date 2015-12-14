<?php
namespace Admin;

 use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
 use Zend\ModuleManager\Feature\ConfigProviderInterface;
 use Zend\Mvc\ModuleRouteListener;
 use Zend\Mvc\MvcEvent;
 use Zend\Session\SessionManager;
 use Zend\Session\Container;

 class Module implements AutoloaderProviderInterface, ConfigProviderInterface
 {
     
     public function init() {

     }
     
     public function onBootstrap(MvcEvent $e)
    {
         
        $eventManager = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        
        // session expire control event
        $eventManager->attach('route', array($this, 'sessionExpireControl'));
        // auth control event
        $eventManager->attach('route', array($this, 'authControl'));
        
        $eventManager->getSharedManager()->attach('Zend\Mvc\Controller\AbstractActionController', 
                                                    'dispatch', 
                                                    function($e) {
            $controller = $e->getTarget();
            $controllerClass = get_class($controller);
            $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
            $config          = $e->getApplication()->getServiceManager()->get('config');
            if (isset($config['module_layouts'][$moduleNamespace])) {
                $controller->layout($config['module_layouts'][$moduleNamespace]);
            }
        }, 100);
        
        
        
        $moduleRouteListener->attach($eventManager);   
        
    }
    
    public function sessionExpireControl(MvcEvent $e) { 
        $serviceManager = $e->getApplication()->getServiceManager();
        $sessionManager = $serviceManager ->get('SessionManagerDefault');
        $serviceManager ->get('sessionExpireControler');
    }


    public function authControl(MvcEvent $e) {

        /* 
         * sessionManager servis çağırılıyor
         */ 
        $serviceManager = $e->getApplication()->getServiceManager();
        
        
        // if auth control will be made block
        if($serviceManager->get('authenticationControlerLocator')) {
            // calling auth service and makes auth control inside service
            $serviceManager->get('serviceAuthenticate');
        } 
    }

    public function getServiceConfig()
    {
         
    }
    
     public function getAutoloaderConfig()
     {
         return array(
             'Zend\Loader\ClassMapAutoloader' => array(
                 __DIR__ . '/autoload_classmap.php',
             ),
             'Zend\Loader\StandardAutoloader' => array(
                 'namespaces' => array(
                     __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                 ),
             ),
         );
     }

     public function getConfig()
     {
         return include __DIR__ . '/config/module.config.php';
     }
 }

