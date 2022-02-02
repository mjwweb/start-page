
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $root_folders = array();

        $stmt = $conn->prepare('SELECT name FROM root_folders WHERE uid=?');
        $stmt->bind_param('i', $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->bind_result($root_name);
        while ($stmt->fetch()) {
            $root_folders[] = strtolower($root_name);
        }

        echo json_encode($root_folders);

        $stmt->close();

    }