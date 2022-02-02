<?php
    require 'dbh.inc.php';
    $response_obj = [];

    $dtNow = gmdate('Y-m-d H:i:s');

    $stmt = $conn->prepare('SELECT id, expires, url, first_name, instagram, location FROM unsplash_background ORDER BY id DESC LIMIT 1');
    $stmt->execute();
    $stmt->bind_result($bkgId, $expireDt, $bkgUrl, $person, $instagram, $location);
    $stmt->fetch();
    $expireDt = date('Y-m-d H:i:s', strtotime($expireDt));
    $stmt->close();

    // background image has not expired
    if ($expireDt > $dtNow && !empty($bkgUrl)) {
        array_push($response_obj, $bkgUrl, $person, $instagram, $location);
    }

    // background image is expired, query a new image url
    else {
        $newExpireDate = gmdate('Y-m-d').'00:00:00';
        $newExpireDate = date('Y-m-d H:i:s', strtotime($newExpireDate.'+1 day'));

        // check to see if the background image has already been used
        /*
        do {
            $unsplashUrl = 'https://api.unsplash.com/photos/random/?orientation=landscape&query=landscape&client_id=TkzQiClhATDzhGdMyqTQNFP_oU2KvkNHhzLlOZkCtzo';
            $data = file_get_contents($unsplashUrl);
            $json = json_decode($data, true);
            $bkgUrl = $json['urls']['full'];

            $prevBkg = prevImgCheck($bkgUrl);
            echo $prevBkg;

        } while ($prevBkg == 0);
        */

        $unsplashUrl = 'https://api.unsplash.com/photos/random/?orientation=landscape&query=landscape&client_id=TkzQiClhATDzhGdMyqTQNFP_oU2KvkNHhzLlOZkCtzo';
        $data = file_get_contents($unsplashUrl);
        $json = json_decode($data, true);
        $bkgUrl = $json['urls']['full'];
        $person = $json['user']['first_name'];
        $location = $json['location']['title'];
        $instagram = $json['user']['instagram_username'];

        $stmt = $conn->prepare('INSERT INTO unsplash_background (expires, url, first_name, instagram, location) VALUES(?, ?, ?, ?, ?)');
        $stmt->bind_param('sssss', $newExpireDate, $bkgUrl, $person, $instagram, $location);
        $stmt->execute();
        $stmt->close();

        array_push($response_obj, $bkgUrl, $person, $instagram, $location);
    }

    echo json_encode($response_obj);

    function prevImgCheck($bkgUrl) {
        global $conn;

        $stmt = $conn->prepare('SELECT COUNT(*) FROM unsplash_background WHERE url=?');
        $stmt->bind_param('s', $bkgUrl);
        $stmt->execute();
        $stmt->bind_result($prevBkg);
        $stmt->close();

        return $prevBkg;
    }



