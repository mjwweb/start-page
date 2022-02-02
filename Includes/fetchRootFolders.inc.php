
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $stmt = $conn->prepare('SELECT id, name FROM root_folders WHERE uid=? ORDER BY list_order');
        $stmt->bind_param('i', $_SESSION['s-uid']);
        $stmt->execute();
        $stmt->store_result();
        $count = $stmt->num_rows;
        $stmt->bind_result($id, $name);

        if ($count > 0) {
            while ($stmt->fetch()) {
                echo '<div value="'.$id.'" class="rootFolderRow">
                         <div class="rootFolderIcon">
                            <i class="fas fa-folder-open"></i>
                         </div>
                         <p class="rootFolderTitle">'.$name.'</p>
                      </div>';
            }
        }
        else {
            echo '<div class="quickLinkInstructions">
                    <p class="instructionStep">1. Type in a keyword or key phrase to create a group.</p>
                        <p class="instructionExample">E.g. <i>Work links</i></p>
                    <p class="instructionStep">2. Click on the plus icon that appears on the right side of the search bar.</p>
                    <p class="instructionStep">3. Create a name for your quick link and provide the full url path. Click save.</p>
                    </p>
                 </div>';
        }

        $stmt->close();
    }