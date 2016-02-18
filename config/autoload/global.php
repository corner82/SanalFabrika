<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

return array(
    'module_layouts' => array(
       'Application' => 'layout/layout.phtml',
       'Admin' => 'layout/admin.phtml',      
       'Login' => 'layout/login.phtml',
       'SFDM' => 'layout/sfdm.phtml',
       'Sanalfabrika' => 'layout/sanalfabrika.phtml',
       'Companies' => 'layout/companies.phtml',
       'Error' => 'layout/error.phtml',
       'Definitions' => 'layout/definitions.phtml',
       'Supervisor' => 'layout/supervisor.phtml',
       'Signup' => 'layout/signup.phtml',
        
   ),
    'action_layouts' => array(
        'SFDM' => array(
            'acldefinition' => 'layout/acldefinitionLayout.phtml',
            'profile' => 'layout/profile.phtml',
            'confirm' => 'layout/confirm.phtml',
            'machinetest' => 'layout/machinetest.phtml'
                        ),
        'Companies' => array(
            'companyregistration' => 'layout/companyregistrationLayout.phtml',
            'meeting' => 'layout/meetingLayout.phtml',
                        ),
        'Supervisor' => array(
            'coreg' => 'layout/coregLayout.phtml',
            'machinepark' => 'layout/machineparkLayout.phtml',
            'software' => 'layout/softwareLayout.phtml',
            'ureg' => 'layout/uregLayout.phtml',
            'umonitoring' => 'layout/umonitoringLayout.phtml',
            'cevaluation' => 'layout/cevaluationLayout.phtml',
                        ),
        'Signup' => array(
            'signup' => 'layout/signup.phtml',
                        ),
        'Sanalfabrika' => array(
            'registration' => 'layout/registrationLayout.phtml',
            'login' => 'layout/loginLayout.phtml',
            'cmt' => 'layout/cmtLayout.phtml'
        ),
        'Error' => array(
            'index' => 'layout/401layout.phtml',
                        ),
   ),
    'session' => array(
        'config' => array(
            'class' => 'Zend\Session\Config\SessionConfig',     
            'options' => array(
                'name' => 'ostim',    
            ),
        ),
        'savehandler' => array(
            'database'=> array(
                    'table'=> 'act_session',
                    'savehandler' => 'sessionDbSaveHandler',
                ),
        ),
        'storage' => 'Zend\Session\Storage\SessionArrayStorage',
        'validators' => array(
            'Zend\\Session\\Validator\\RemoteAddr',   
            'Zend\\Session\\Validator\\HttpUserAgent',       
        ),
        'remember_me_seconds' => 2419200,
        'use_cookies' => true,
        'cookie_httponly' => true,
    ),
    'dbAdapterPostgre' => array(
        'driver'    => 'Pdo',    
        'dsn'       => "pgsql:host=localhost;dbname=ostim_development",
        'username'  => 'postgres',
        'password'  => '1Qaaal123',          
    ),
    'authentication' => array(
        'database' => array (
            'table' => 'info_users',
            'identityColumn' => 'username',
            'credentialColumn' => 'password',    
        )        
    ),
    'ControlorsTobeAuthenticated' => array(
        'Admin',
        'SFDM',
        'Supervisor',
        'Companies'

    ),
    'ACL_pages' => array(
        'consultant' => array(
                         'action' => array('sfdm' => array ('index',
                                                            'profile',
                                                            'confirm',
                                                            'machinetest'),
                                     'admin' => array('index'),
                                     'login' => array('index','logout'),
                                     'sanalfabrika' => array ('index',
                                                              'registration',
                                                              'login',
                                                              'cmt')),
                   ),
        'supervisor' => array(
                         'parent' => 'consultant',
                         'action' => array('sfdm' => array ('index'))
                   ),
        'admin' => array(
                         'parent' => 'supervisor',
                         'action' => array('admin' => array ('index'),
                                           )
                   ),
        'guest' => array(
                         'action' => array('sanalfabrika' => array ('index',
                                                                    'registration',
                                                                    'login',
                                                                    'cmt'),
                                     'login' => array('index'),)
                   ),
        'new user' => array(
                         'action' => array('sanalfabrika' => array ('index'))
                   ),
        
        'firm user' => array(
                         'parent' => 'new user',
                         'action' => array('sanalfabrika' => array ('index'))
                   ),
        'firm owner' => array(
                         'parent' => 'firm user',
                         'action' => array('sanalfabrika' => array ('index'))
                   ),
        
        
    )
);
