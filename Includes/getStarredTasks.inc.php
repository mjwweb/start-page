
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $star = 1;
        $query = $_POST['query'];
        $query_format = "%{$_POST['query']}%";

        if (empty($query)) {
            $stmt = $conn->prepare('SELECT task_text, DATE(date_time) FROM tasks WHERE uid=? AND starred=?');
            $stmt->bind_param('ii', $_SESSION['s-uid'], $star);
            $stmt->execute();
            $stmt->bind_result($task_text, $date);
            while ($stmt->fetch()) {
                $format_date = date('F j, Y', strtotime($date));
                echo '<div class="starredTaskWrap"><p class="starredTaskDate">'.$format_date.'</p><p class="starredTaskText">'.$task_text.'</p><i class="fas fa-star"></i></div>';
            }
            $stmt->close();
        }
        else {
            $stmt = $conn->prepare('SELECT task_text, DATE(date_time) FROM tasks WHERE uid=? AND starred=? AND task_text LIKE ?');
            $stmt->bind_param('iis', $_SESSION['s-uid'], $star, $query_format);
            $stmt->execute();
            $stmt->bind_result($task_text, $date);
            while ($stmt->fetch()) {
                $format_date = date('F j, Y', strtotime($date));
                echo '<div class="starredTaskWrap"><p class="starredTaskDate">'.$format_date.'</p><p class="starredTaskText">'.$task_text.'</p><i class="fas fa-star"></i></div>';
            }
            $stmt->close();
        }
    }