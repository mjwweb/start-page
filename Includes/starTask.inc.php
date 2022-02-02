
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $tid = $_POST['tid'];
        $action = $_POST['action'];

        $stmt = $conn->prepare('UPDATE tasks SET starred=? WHERE id=? AND uid=?');
        $stmt->bind_param('sss', $action, $tid, $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->close();
    }