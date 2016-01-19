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
       'Users' => 'layout/users.phtml',
       'Error' => 'layout/error.phtml',
       'Definitions' => 'layout/definitions.phtml',
       'Supervisor' => 'layout/supervisor.phtml',
        
   ),
    'action_layouts' => array(
        'SFDM' => array(
            'acldefinition' => 'layout/acldefinitionLayout.phtml',
                        ),
        'Companies' => array(
            'registration' => 'layout/registrationLayout.phtml',
            'meeting' => 'layout/meetingLayout.phtml',
                        ),
        'Users' => array(
            'registration' => 'layout/registrationLayout.phtml',
                        ),
        'Supervisor' => array(
            'coreg' => 'layout/coregLayout.phtml',
            'machinepark' => 'layout/machineparkLayout.phtml',
            'software' => 'layout/softwareLayout.phtml',
            'ureg' => 'layout/uregLayout.phtml',
            'umonitoring' => 'layout/umonitoringLayout.phtml',
            'cevaluation' => 'layout/cevaluationLayout.phtml',
                        ),
   )
    ,
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

    )
);
