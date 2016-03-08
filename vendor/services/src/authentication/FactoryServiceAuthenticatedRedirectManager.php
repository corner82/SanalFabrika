<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticatedRedirectManager  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $roleResult = $serviceLocator->get('serviceAclRoleFinder');
        if(isset($roleResult['found'])) {
            $role = strtolower(trim($roleResult['resultSet'][0]['name']));
            //remove all whitespace from user role
            $role = preg_replace('/\s+/', '', $role);
            switch ($role) {
                case 'admin':
                    $serviceLocator->get('serviceAuthenticatedRedirectAdmin');
                    break;
                case 'supervisor':
                    $serviceLocator->get('serviceAuthenticatedRedirect');
                    break;
                case 'consultant':
                    $serviceLocator->get('serviceAuthenticatedRedirect');
                    break;
                case 'firmuser':
                    $serviceLocator->get('serviceAuthenticatedRedirectUser');
                    break;
                case 'firmowner':
                    $serviceLocator->get('serviceAuthenticatedRedirectUser');
                    break;
                case 'guest':
                    break;
                case 'newuser':
                    break;
                default:
                    break;
            }
            return true;
        } else {
            return false;
        }  
        return false;
    }

}
