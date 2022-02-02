
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $tid = $_POST['tid'];
        $dateTime = $_POST['dateTime'];
        $taskText = $_POST['taskText'];
        $taskComment = $_POST['taskComment'];

        $stmt = $conn->prepare('UPDATE tasks SET task_text=?, date_time=?, task_comment=? WHERE id=? AND uid=?');
        $stmt->bind_param('sssss', $taskText, $dateTime, $taskComment, $tid, $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->close();
    }