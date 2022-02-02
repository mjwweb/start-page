
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $title = $_POST['title'];
        $url = $_POST['url'];

        $stmt = $conn->prepare('INSERT INTO quick_links (uid, title, url) VALUES(?, ?, ?)');
        $stmt->bind_param('iss', $_SESSION['s-uid'], $title, $url);
        $stmt->execute();
        $stmt->close();

    }

?>