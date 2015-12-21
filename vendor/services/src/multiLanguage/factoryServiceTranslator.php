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
use Custom\Services\MultiLanguage\systemLanguages;

/**
 * using tarnslator as service in zend service manager
 */
class FactoryServiceTranslator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $event = $serviceLocator->get('Application')
                                ->getMvcEvent();
        
        $lang = $event->getRouteMatch()
                      ->getParam('lang');
        $lang = trim(strtolower($lang));
        
        $translator = $event->getApplication()
                            ->getServiceManager()
                            ->get('translator');
        
        $systemLanguageCodes = systemLanguages::getSystemLanguageCodes();

        if(in_array($lang, $systemLanguageCodes)) {
            switch ($lang) {
                case systemLanguages::ENG : 
                    $translator->setLocale(systemLanguages::ENG_LOCALE);
                    break;
                case systemLanguages::AR : 
                    $translator->setLocale(systemLanguages::AR_LOCALE);
                    break;
                case systemLanguages::DE : 
                    $translator->setLocale(systemLanguages::DE_LOCALE);
                    break;
                case systemLanguages::RU : 
                    $translator->setLocale(systemLanguages::RU_LOCALE);
                    break;
                case systemLanguages::TR : 
                    $translator->setLocale(systemLanguages::TR_LOCALE);
                    break;
                case systemLanguages::FA : 
                    $translator->setLocale(systemLanguages::FA_LOCALE);
                    break;
                case systemLanguages::ZH : 
                    $translator->setLocale(systemLanguages::ZH_LOCALE); 
                    break;
                default:
                    $translator->setLocale(systemLanguages::TR_LOCALE);
            }
            
        } else {
            $translator->setLocale('tr_TR');
        }

        return false;

    }

}
