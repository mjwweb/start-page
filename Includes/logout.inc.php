
    <?php

    session_start();

        session_destroy();
        session_unset();
        setcookie('al_auth', '', time()-3600, '/');
        echo 1;