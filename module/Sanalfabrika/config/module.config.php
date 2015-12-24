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
             'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',     
                    'defaults' => array(
                        'controller' => 'Sanalfabrika\Controller\Sanalfabrika',
                        'action'     => 'index',
                    ),
                ),
            ),
             'sanalfabrika' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/ostim/sanalfabrika[/:lang][/:action][/:id]',   
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         //'lang' => '[a-zA-Z]{2}+',
                         //'lang' => '(([en])|(tr)|(fa)|[ru]|[ar]|[de]|[zh]){2}+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))',     
                     ),
                     'defaults' => array(
                         'controller' => 'Sanalfabrika\Controller\Sanalfabrika',
                         'action'     => 'index',
                     ),
                 ),
             ),
         ),
     ),
     'translator' => array(
        //'locale' => 'en_US',
        'locale' => 'tr_TR',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../../language',
                'pattern'  => '%s.mo',
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

