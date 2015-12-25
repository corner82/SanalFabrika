<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'SFDM\Controller\SFDM' => 'SFDM\Controller\SFDMController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'sfdm' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/sfdm/[:lang][/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))', 
                     ),
                     'defaults' => array(
                         'controller' => 'SFDM\Controller\SFDM',
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
         'not_found_template'       => 'error/404',
         'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/sfdm.phtml',   
            'sfdm/index/index' => __DIR__ . '/../view/sfdm/sfdm/index.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

