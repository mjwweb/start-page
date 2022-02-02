
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $query = $_POST['query'];

        $stmt = $conn->prepare('INSERT INTO search_history (uid, search_query) VALUES(?, ?)');
        $stmt->bind_param('ss', $_SESSION['s-uid'], $query);
        $stmt->execute();
        $stmt->close();
    }
