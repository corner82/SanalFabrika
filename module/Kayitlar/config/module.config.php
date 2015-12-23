<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Kayitlar\Controller\Kayitlar' => 'Kayitlar\Controller\KayitlarController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'sfdm' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/kayitlar[/:lang][/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang'   => '[a-zA-Z]+',
                     ),
                     'defaults' => array(
                         'controller' => 'Kayitlar\Controller\Kayitlar',
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
            'layout/layout'           => __DIR__ . '/../view/layout/kayitlar.phtml',   
            'kayitlar/index/index' => __DIR__ . '/../view/kayitlar/kayitlar/index.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

