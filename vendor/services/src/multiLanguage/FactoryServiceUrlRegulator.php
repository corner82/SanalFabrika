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
use Custom\Services\MultiLanguage\SystemLanguages;

class FactoryServiceUrlRegulator implements FactoryInterface{
    
    public function createService(ServiceLocatorInterface $serviceLocator){
        $lang = $serviceLocator->get('serviceTranslator');
        
        $requestUri = $_SERVER['REQUEST_URI'];
        $patterns = array('/\/'.SystemLanguages::ENG.'/',
                          '/\/'.SystemLanguages::AR.'/',
                          '/\/'.SystemLanguages::DE.'/',
                          '/\/'.SystemLanguages::FA.'/',
                          '/\/'.SystemLanguages::RU.'/',
                          '/\/'.SystemLanguages::TR.'/',
                          '/\/'.SystemLanguages::ZH.'/');
        
        $requestUri = preg_replace($patterns, '/--dil--', $requestUri);  
        //print_r('-- değiştirilen request uri-->'.$requestUri);
        return $requestUri;
    }
}

