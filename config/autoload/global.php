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
       'Firmalar' => 'layout/firmalar.phtml',
       'Kullanicilar' => 'layout/kullanicilar.phtml',
       'Error' => 'layout/error.phtml',
        
   ),
    'action_layouts' => array(
        'SFDM' => array(
            'users' => 'layout/usersLayout.phtml',
            'firmalar' => 'layout/firmalarLayout.phtml',
                        ),
        'Firmalar' => array(
            'fkayit' => 'layout/fkayitLayout.phtml',
            'randevu' => 'layout/randevuLayout.phtml',
                        ),
        'Kullanicilar' => array(
            'kkayit' => 'layout/kkayitLayout.phtml',
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
                    'table'=> 'session__silinecek',
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
            'table' => 'users__silinecek',
            'identityColumn' => 'username',
            'credentialColumn' => 'password',    
        )        
    ),
    'ControlorsTobeAuthenticated' => array(
        'Admin',
        'SFDM',

    )
);
