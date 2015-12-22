<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Custom\Services\MultiLanguage;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceUrlRegulator implements FactoryInterface{
    
    public function createService(ServiceLocatorInterface $serviceLocator){
        $lang = $event->getApplication()
                            ->getServiceManager()
                            ->get('translatorService');
        
        return $lang;
    }
}

