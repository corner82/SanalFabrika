<?php

 namespace Admin\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class AdminController extends AbstractActionController
 {
     public function indexAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     
     /**
      * admin menu operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 29/03/2016
      */
     public function menuAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * machine categories admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 30/03/2016
      */
     public function machctgAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     
     /**
      * machine properties admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 31/03/2016
      */
     public function machpropAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * machine property  admin crud operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 23/06/2016
      */
     public function machpropdefAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * machine  admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 31/03/2016
      */
     public function machAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * system units definitions admin panel
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 04/05/2016
      */
     public function untAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * system units definitions admin panel
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 04/05/2016
      */
     public function prodtypesAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * system machine attributes definitions admin panel
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 21/04/2016
      */
     public function machattrAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     
     
     /**
      * unique machine property admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 03/06/2016
      */
     public function uniquemachpropAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
         
     }
     
     /**
      * resources action page for ACL operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 13/07/2016
      */
     public function aclresourcesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
         
     }
     

 }

