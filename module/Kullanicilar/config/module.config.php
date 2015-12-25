<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Kullanicilar\Controller\Kullanicilar' => 'Kullanicilar\Controller\KullanicilarController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'kullanicilar' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/ostim/sanalfabrika/kullanicilar/[:lang][/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))', 
                     ),
                     'defaults' => array(
                         'controller' => 'Kullanicilar\Controller\Kullanicilar',
                         'action'     => 'index',
                     ),
                 ),
             ),
         ),
     ),
     'view_manager' => array(
         /*'template_path_stack' => array(
             'admin' => __DIR__ . '/../view',  
         ),*/  
         'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/kullanicilar.phtml',   
            'kullanicilar/index/index' => __DIR__ . '/../view/kullanicilar/kullanicilar/index.phtml',
            'kullanicilar/index/kkayit' => __DIR__ . '/../view/kullanicilar/kullanicilar/kkayit.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

