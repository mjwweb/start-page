<?php

    $email = $_POST['email'];
    $pwd = $_POST['pwd'];
    $pwdRpt = $_POST['pwdRpt'];
    $search_engine = 'Google';
    $theme = 'white';

    if (!empty($email) && !empty($pwd) && !empty ($pwdRpt)) {

        require 'dbh.inc.php';

        $stmt = $conn->prepare('SELECT email FROM users WHERE email=?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        $rows = $stmt->num_rows;
        $stmt->close();

        if ($rows > 0) {
            echo '*Account with email already exists';
            exit();
        } 
        elseif ($pwd !== $pwdRpt) {
            echo '*Passwords do not match';
            exit();
        }
        else {

            $pwd_hash = password_hash($pwd, PASSWORD_DEFAULT);
            $al_hash = password_hash(uniqid(), PASSWORD_DEFAULT);

            $stmt = $conn->prepare('INSERT INTO users (email, password_hash, al_auth) VALUES(?, ?, ?);');
            $stmt->bind_param('sss', $email, $pwd_hash, $al_hash);
            $stmt->execute();
            $uid = $stmt->insert_id;
            $stmt->close();

            session_start();

            $_SESSION['s-uid'] = $uid;

            // set the auto login cookie
            setcookie('al_auth', $al_hash, time() + (10 * 365 * 24 * 60 * 60), '/');

            $_COOKIE['s-al_auth'] = $al_hash;
            $_SESSION['s-uid'] = $uid;
            echo '1';

            // add in default quick links
            $quickLinkNames = ['Google', 'Facebook', 'Twitter', 'Weather'];
            $quickLinkUrls = ['https://www.google.com', 'https://www.facebook.com', 'https://www.twitter.com', 'https://www.weather.com'];

            for ($i=0; $i < count($quickLinkNames); $i++) {
                $name = $quickLinkNames[$i];
                $url = $quickLinkUrls[$i];

                $stmt = $conn->prepare('INSERT INTO quick_links (title, url, uid) VALUES(?,?,?)');
                $stmt->bind_param('ssi', $name, $url, $uid);
                $stmt->execute();
                $stmt->close();
            }

        }
        
    }