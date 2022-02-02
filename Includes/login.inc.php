<?php

        session_start();

        $email = $_POST['email'];
        $pwd = $_POST['pwd'];

        if (!isset($_SESSION['s-uid']) && !empty($email) && !empty($pwd)) {

            require 'dbh.inc.php';

            $stmt = $conn->prepare('SELECT email FROM users WHERE email=?');
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $stmt->store_result();
            $rows = $stmt->num_rows;
            $stmt->close();

            if ($rows == 0) {
                echo "*Account doesn't exist with email";
            }
            else {
                $stmt = $conn->prepare('SELECT id, password_hash, al_auth FROM users WHERE email = ?');
                $stmt->bind_param('s', $email);
                $stmt->execute();
                $stmt->bind_result($uid, $hashed_pwd, $al_hash);
                $stmt->fetch();
                $stmt->close();

                $verify = password_verify($pwd, $hashed_pwd);

                if ($verify) {
                    setcookie('al_auth', $al_hash, time() + (10 * 365 * 24 * 60 * 60), '/');
                    
                    $_SESSION['s-uid'] = $uid;
                    $_COOKIE['s-al_auth'] = $al_hash;

                    echo '1';
                } else {
                    echo '*Incorrect password';
                }
            }

        }