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

/**
 * using tarnslator as service in zend service manager
 */
class FactoryServiceTranslator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $event = $serviceLocator->get('Application')
                                ->getMvcEvent();
        //print_r($_SERVER['HTTP_ACCEPT_LANGUAGE']);
        
        $lang = $event->getRouteMatch()
                      ->getParam('lang');
        $lang = trim(strtolower($lang));
        
        $route = $event ->getRouteMatch()
                        ->getMatchedRouteName();
        //print_r($route);
        
        /**
         * changing language  due to browser langugae settings 
         * @since 28/12/2016
         * @author Mustafa Zeynel Dağlı
         */
        if($lang == null){
            if($route!='admin' && $route!='sfdm' && $route!='cluster'){
                $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
            } else {
                $lang = 'tr';
            }
            
        }
        
        $translator = $event->getApplication()  
                            ->getServiceManager()
                            ->get('translator');
        $event->getApplication()
                            ->getServiceManager()
                            ->setService('test', $this);
        
        $systemLanguageCodes = SystemLanguages::getSystemLanguageCodes();

        if(in_array($lang, $systemLanguageCodes)) {
            switch ($lang) {
                case SystemLanguages::ENG : 
                    $translator->setLocale(SystemLanguages::ENG_LOCALE);
                    break;
                case SystemLanguages::AR : 
                    $translator->setLocale(SystemLanguages::AR_LOCALE);
                    break;
                case SystemLanguages::DE : 
                    $translator->setLocale(SystemLanguages::DE_LOCALE);
                    break;
                case SystemLanguages::RU : 
                    $translator->setLocale(SystemLanguages::RU_LOCALE);
                    break;
                case SystemLanguages::TR : 
                    $translator->setLocale(SystemLanguages::TR_LOCALE);
                    break;
                case SystemLanguages::FA : 
                    $translator->setLocale(SystemLanguages::FA_LOCALE);
                    break;
                case SystemLanguages::ZH : 
                    $translator->setLocale(SystemLanguages::ZH_LOCALE); 
                    break;
                default:
                    $translator->setLocale(SystemLanguages::TR_LOCALE);
            }
                
        } else {
            $translator->setLocale('tr_TR');
        }
        return $lang;

    }

}
