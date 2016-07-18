<?php

namespace Sanalfabrika\View\Helper;

use Zend\View\Helper\AbstractHelper;

class Testhelper extends AbstractHelper {

    public function __invoke($pk) {
        if ($pk != null) {
            echo($pk);
            echo("</br>");
            echo('User registered');
        } else {
            echo('User not registered');
//            header("Location: https://www.bahram.sanalfabrika.com/ostim/sanalfabrika/login"); /* Redirect browser */
//            exit();
        }
    }
}
