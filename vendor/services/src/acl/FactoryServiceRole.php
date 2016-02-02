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

/**
 * service layer for user role determination
 * @author Mustafa Zeynel Dağlı
 * @since 29/01/2016
 * @todo User role due to uesr info sql query will be implemented
 */
class FactoryServiceRole  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        $storage = $authManager->getStorage()->read();
        print_r($storage);
        if(isset($storage) && isset($storage['username'])) {
            $userName = $storage['username'];
            $storage['role'] = 2;
            $authManager->getStorage()->write(
                             $storage
                        );
            return true;
        } else {
            $storage['role'] = 7;
            /*$authManager->getStorage()->write(
                             $storage
                        );*/
            return false;
        }
        
        //print_r($userName);
        $pdo = $serviceLocator->get('dbAdapterPostgre');
        /*try {
            $sql = "              
                    SELECT id,pkey,sf_private_key_value FROM (
                            SELECT COALESCE(NULLIF(root_id, 0),id) as id, 	
                                CRYPT(sf_private_key_value,CONCAT('_J9..',REPLACE('".$publicKey."','*','/'))) = CONCAT('_J9..',REPLACE('".$publicKey."','*','/')) as pkey,	                                
                                sf_private_key_value
                            FROM info_users WHERE active=0 AND deleted =0) AS logintable
                        WHERE pkey = TRUE

                    "; 
            $statement = $pdo->prepare($sql);  
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            //print_r($result);

            $errorInfo = $statement->errorInfo();
            if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                throw new \PDOException($errorInfo[0]);
            return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);
        } catch (\PDOException $e ) {
            $pdo->rollback();
            return array("found" => false, "errorInfo" => $e->getMessage());
        }*/
        
        
        
        
        return false;
        
        
    }

}
