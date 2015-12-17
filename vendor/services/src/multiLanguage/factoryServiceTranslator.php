<?php

namespace Custom\Services\MultiLanguage;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class factoryServiceTranslator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $event = $serviceLocator->get('Application')
                                ->getMvcEvent();
        
        $lang = $event->getRouteMatch()
                      ->getParam('lang');
        $translator = $event->getApplication()
                            ->getServiceManager()
                            ->get('translator');
        if($lang == 'eng'){
            $translator->setLocale('en_EN');
        } else if($lang == 'ru') {
            $translator->setLocale('ru_RU');
        } else if($lang == null) {
            $translator->setLocale('tr_TR');
        }
        return false;

    }

}
