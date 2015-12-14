<?php

namespace Custom\Services\Database;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceDbAdapterPostgre  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $dbAdapter = new \Zend\Db\Adapter\Adapter($config['dbAdapterPostgre']);
        // Test 
        /*$sql = "SELECT * FROM info_firm_process ";
        $statement = $dbAdapter->query($sql);
        $res =  $statement->execute();
        print_r($res);
        foreach ($res as $key=>$value) {
            print_r($value);
        }*/
        return $dbAdapter;
    }

}
