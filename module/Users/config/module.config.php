<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Users\Controller\Users' => 'Users\Controller\UsersController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'users' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '[/:lang]/ostim/sanalfabrika/users[/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))', 
                     ),
                     'defaults' => array(
                         'controller' => 'Users\Controller\Users',
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
            'layout/layout'           => __DIR__ . '/../view/layout/users.phtml',   
            'users/index/index' => __DIR__ . '/../view/users/users/index.phtml',
            'users/index/registration' => __DIR__ . '/../view/users/users/registration.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

