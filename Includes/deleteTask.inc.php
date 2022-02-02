
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $stmt = $conn->prepare('DELETE FROM tasks WHERE id=? AND uid=?');
        $stmt->bind_param('ii', $_POST['tid'], $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->close();
        
    }