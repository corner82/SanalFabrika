<?php

namespace Custom\Services\Session;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceSessionManagerDefaultLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $request = $serviceLocator->get('request');
        if (isset($config['session'])) {
            $session = $config['session'];

            $sessionConfig = null;
            if (isset($session['config'])) {
                $class = isset($session['config']['class'])  ? $session['config']['class'] : '\Zend\Session\Config\SessionConfig';
                $options = isset($session['config']['options']) ? $session['config']['options'] : array();
                $sessionConfig = new $class();
                $sessionConfig->setOptions($options);        
            }

            $sessionStorage = null;
            if (isset($session['storage'])) {
                $class = $session['storage'];
                $sessionStorage = new $class();
            }

            $sessionSaveHandler = null;
            if (isset($session['savehandler'])) {
                /**
                 * getting session save handler from service manager,
                 * session save handler service name is configured on global config
                 */
                $sessionSaveHandler = $serviceLocator->get($session['savehandler']['database']['savehandler']);
            }
            
            $sessionManager = new \Zend\Session\SessionManager($sessionConfig, $sessionStorage, $sessionSaveHandler);
            $sessionManager->start();
            //print_r('--session manager get id first-->'.$sessionManager->getId().'--');
            $metaData = $sessionManager->getStorage()->getMetadata();
            print_r($sessionManager->getStorage()->getMetadata('_VALID'));
            //print_r($_SESSION);
            if(empty($sessionManager->getStorage()->getMetadata('_VALID'))) {
                print_r('--_VALID empty --');
                if (isset($config['session']['validators'])) {
                    $chain   = $sessionManager->getValidatorChain();

                    foreach ($config['session']['validators'] as $validator) {
                        switch ($validator) {  
                            case 'Zend\Session\Validator\HttpUserAgent':
                                //print_r('--Zend\Session\Validator\HttpUserAgent case girdi--');
                                $validator = new $validator($request->getServer()->get('HTTP_USER_AGENT'));
                                break;
                            case 'Zend\Session\Validator\RemoteAddr':
                                //print_r('--Zend\Session\Validator\RemoteAddr case girdi--');
                                $validator  = new $validator($request->getServer()->get('REMOTE_ADDR'));
                                break;
                            default:  
                                $validator = new $validator();  
                        }
                        $chain->attach('session.validate', array($validator, 'isValid'));
                    }
                }
                
            } else {
                 print_r('--_VALID not empty --');
            }
        } else {
            $sessionManager = new \Zend\Session\SessionManager();
        }
        \Zend\Session\Container::setDefaultManager($sessionManager);
        $sessionManager->start();
        return $sessionManager;
    }

}