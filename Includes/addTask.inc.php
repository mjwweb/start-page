
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {

        require 'dbh.inc.php';

        $dateTime = $_POST['dateTime'];
        $taskText = $_POST['taskText'];
        $taskComment = $_POST['taskComment'];

        $stmt = $conn->prepare('INSERT INTO tasks (uid, task_text, task_comment, date_time) VALUES(?, ?, ?, ?)');
        $stmt->bind_param('isss', $_SESSION['s-uid'], $taskText, $taskComment, $dateTime);
        $stmt->execute();
        $stmt->close();

    }