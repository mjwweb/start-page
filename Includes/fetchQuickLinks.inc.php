
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        //$root = $_POST['root'];

        $stmt = $conn->prepare('SELECT id, title, url FROM quick_links WHERE uid=? ORDER BY list_order');
        $stmt->bind_param('i', $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->bind_result($id, $title, $url);
        while ($stmt->fetch()) {
              echo '<div value="'.$id.'" url="'.$url.'" class="quickLinkRow">
                        <div class="qlFavIconWrap">
                            <img src="https://s2.googleusercontent.com/s2/favicons?domain_url='.$url.'" />
                        </div>
                        <p class="quickLinkTitle">'.$title.'</p>
                        <p qlid="'.$id.'" class="quickLinkRemove">Remove</p>
                    </div>';
        }

    }