
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $ids = $_POST['ids'];
        $order = 0;

        foreach ($ids as $id) {
            $stmt = $conn->prepare('UPDATE quick_links SET list_order=? WHERE id=? AND uid=?');
            $stmt->bind_param('iii', $order, $id, $_SESSION['s-uid']);
            $stmt->execute();
            $order++;
        }
        $stmt->close();
    }