<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        echo $theme = $_POST['theme'];

        $stmt = $conn->prepare('UPDATE preferences SET theme=? WHERE uid=?');
        $stmt->bind_param('si', $theme, $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->close();

    }