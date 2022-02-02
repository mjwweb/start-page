
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $taskId = $_POST['taskId'];
        $action = $_POST['action'];

        if ($action == 1) {
            $stmt = $conn->prepare('UPDATE tasks SET completed=? WHERE id=?');
            $stmt->bind_param('ss', $action, $taskId);
            $stmt->execute();
            $stmt->close();
        }

        else {
            $stmt = $conn->prepare('UPDATE tasks SET completed = NULL WHERE id=?');
            $stmt->bind_param('s', $taskId);
            $stmt->execute();
            $stmt->close();
        }

    }