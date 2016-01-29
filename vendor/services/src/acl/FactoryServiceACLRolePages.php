<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */
namespace Custom\Services\Acl;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Permissions\Acl\Acl;
use Zend\Permissions\Acl\Role\GenericRole as Role;

class FactoryServiceACLRolePages  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        
        //print_r('--factoryservicerolecreater');  
        $acl = new Acl();
        $acl->addRole(new Role('Consultant'))
            ->addRole(new Role('Admin'))
            ->addRole(new Role('Firm Owner'))
            ->addRole(new Role('Firm User'))
            ->addRole(new Role('New User'))
            ->addRole(new Role('Supervisor'));
        return $acl;
    }

}
