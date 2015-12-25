<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Firmalar\Controller\Firmalar' => 'Firmalar\Controller\FirmalarController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'firmalar' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/ostim/sanalfabrika/firmalar/[:lang][/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))',
                     ),
                     'defaults' => array(
                         'controller' => 'Firmalar\Controller\Firmalar',
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
            'layout/layout'           => __DIR__ . '/../view/layout/firmalar.phtml',   
            'firmalar/index/index' => __DIR__ . '/../view/firmalar/firmalar/index.phtml', 
            'firmalar/index/fkayit' => __DIR__ . '/../view/firmalar/firmalar/fkayit.phtml', 
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

