<?php

namespace Kullanicilar\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;

class KullanicilarController extends AbstractActionController {

    public function kkayitAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function indexAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function addAction() {
        
    }

    public function editAction() {
        
    }

    public function deleteAction() {
        
    }

}
