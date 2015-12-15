<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Sanalfabrika\Controller\Sanalfabrika' => 'Sanalfabrika\Controller\SanalfabrikaController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'sanalfabrika' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/ostim/sanalfabrika[/:action][/:id]',   
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                     ),
                     'defaults' => array(
                         'controller' => 'Sanalfabrika\Controller\Sanalfabrika',
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
            'layout/layout'           => __DIR__ . '/../view/layout/sanalfabrika.phtml',   
            'sanalfabrika/index/index' => __DIR__ . '/../view/sanalfabrika/sanalfabrika/index.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

