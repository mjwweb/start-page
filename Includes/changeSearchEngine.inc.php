
    <?php

        session_start();

        if (isset($_SESSION['s-uid'])) {
            require 'dbh.inc.php';

            $engine = $_POST['engine'];

            $stmt = $conn->prepare('UPDATE preferences SET search_engine=? WHERE uid=?');
            $stmt->bind_param('si', $engine, $_SESSION['s-uid']);
            $stmt->execute();
            $stmt->close();
        }