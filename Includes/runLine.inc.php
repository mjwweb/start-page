
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $val = $_POST['val'];

        $parts = explode(':', $val);

        if (!empty($parts[1]) && !empty($parts[2])) {
            $stmt = $conn->prepare('SELECT COUNT(*) FROM branch WHERE uid=? AND name=?');
            $stmt->bind_param('is', $_SESSION['s-uid'], $parts[1]);
            $stmt->execute();
            $stmt->bind_result($count);
            $stmt->fetch();
            $stmt->close();

            $stmt = $conn->prepare('INSERT INTO branch_urls (uid, url, branch_name) VALUES (?, ?, ?)');
            $stmt->bind_param('iss', $_SESSION['s-uid'], $parts[2], $parts[1]);
            $stmt->execute();
            $stmt->close();
            
            if ($count == 0) {
                $stmt = $conn->prepare('INSERT INTO branch (uid, name) VALUES (?, ?)');
                $stmt->bind_param('is', $_SESSION['s-uid'], $parts[1]);
                $stmt->execute();
                $stmt->close();
            }
        }
    }