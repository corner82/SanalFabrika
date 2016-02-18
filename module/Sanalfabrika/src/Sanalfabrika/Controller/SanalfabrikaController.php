<?php

 namespace Sanalfabrika\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class SanalfabrikaController extends AbstractActionController
 {
     public function indexAction()  
     {
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
     
     public function registrationAction()  
     {
         
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        /*
        $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
        */
        
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);
        
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
       
     public function loginAction()  
     {         
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        /*
        $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
        */
        
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);
        
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }  
         
     public function cmtAction(){
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
        
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);
        
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     
     public function addAction()
     {
     }

     public function editAction()
     {
     }

     public function deleteAction()
     {
     }
 }

