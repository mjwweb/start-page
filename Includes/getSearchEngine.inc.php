
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $stmt = $conn->prepare('SELECT search_engine FROM preferences WHERE uid=?');
        $stmt->bind_param('i', $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->bind_result($engine);
        $stmt->fetch();
        echo $engine;
        $stmt->close();
    }