<?php

namespace Sanalfabrika\View\Helper;

use Zend\View\Helper\AbstractHelper;

class Testhelper extends AbstractHelper {

    public function __invoke($acl) {
        $arr = $acl['resultSet'];
        $values = array_values($arr);
            
        for ($x = 0; $x < count($values); $x++) {
            if($values[$x]['resource_name'] == 'firmaİşlemleri'){
//                print_r('This user has access to resource firmaIslemleri and these privileges are assigned:');
                print_r('-------' . $values[$x]['privilege_name']);
            }else{
                print_r('This user has not access to resource firmaIslemleri');               
            }
                
        }
    }

}
