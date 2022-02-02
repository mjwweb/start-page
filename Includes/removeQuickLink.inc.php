
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $qlid = $_POST['qlid'];
        $root = $_POST['root'];

        $stmt = $conn->prepare('DELETE FROM quick_links WHERE id=? AND uid=?');
        $stmt->bind_param('ss', $qlid, $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->close();
    }