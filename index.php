
<?php
    require 'header.php';

    if (isset($_SESSION['s-uid'])) {
        require 'loggedIn.php';
    }
    else if (isset($_COOKIE['s-al_auth'])) {
        require 'Includes/dbh.inc.php';

        $stmt = $conn->prepare('SELECT id FROM users WHERE al_auth=?');
        $stmt->bind_param('s', $_COOKIE['s-al_auth']);
        $stmt->execute();
        $stmt->bind_result($uid);
        $stmt->fetch();
        $_SESSION['s-uid'] = $uid;
        $stmt->close();

        require 'loggedIn.php';
    }
    else if (isset($_GET['c'])) {
        require 'credentials.php';
    }
    else {
        require 'loggedIn.php';
    }
    
?>