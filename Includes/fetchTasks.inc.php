
<?php

    session_start();

    if (isset($_SESSION['s-uid'])) {
        require 'dbh.inc.php';

        $date = $_POST['date'];
        $noTime = '00:00:00';
        $showCompletedTasks = $_POST['showCompletedTasks'];

        $stmt = $conn->prepare('SELECT id, DATE(date_time), TIME(date_time), task_text, task_comment, completed, starred FROM tasks WHERE uid=? AND DATE(date_time)=? AND completed IS NULL');
        $stmt->bind_param('is', $_SESSION['s-uid'], $date);
        $stmt->execute();
        $stmt->store_result();
        $uncompletedCount = $stmt->num_rows;
        $stmt->bind_result($id, $date, $time, $text, $comment, $completed, $starred);

        while ($stmt->fetch()) {

            $time_format = date('g:i a', strtotime($time));
            $date_value = date('Y-m-d', strtotime($date));
            
                echo '<div tid="'.$id.'" class="incompleteTaskWrap taskWrap">
                            <div class="taskBox">
                                <div action="1" taskid="'.$id.'" class="checkCircle uncheckedTask"></div>
                                <div class="'.($time !== $noTime ? 'taskTxtTimeAdded' : 'taskTxtWrap').'">
                                    <p tid="'.$id.'" class="taskTitle incompleteTaskTxt">'.$text.'</p>
                                </div>';
                                if ($time !== '00:00:00') {
                                    echo '<p tid="'.$id.'" class="taskTime"><i class="far fa-clock taskClockIcon"></i>'.$time_format.'</p>';
                                }
                                if ($starred == 1) {
                                    echo  '<i tid="'.$id.'" class="taskStar fas fa-star"></i>';
                                }
                                else {
                                    echo  '<i tid="'.$id.'" class="taskStar fal fa-star"></i>';
                                }

                                echo '<div time="'.$time.'" date="'.$date_value.'" tid="'.$id.'" class="taskEditBtn"><i class="taskEditIcon fas fa-ellipsis-h"></i></div>';

                      echo '</div>
                        </div>';

        }
        $stmt->close();

        $stmt2 = $conn->prepare('SELECT id, DATE(date_time), TIME(date_time), task_text, completed, starred FROM tasks WHERE uid=? AND DATE(date_time)=? AND completed IS NOT NULL');
        $stmt2->bind_param('is', $_SESSION['s-uid'], $_POST['date']);
        $stmt2->execute();
        $stmt2->store_result();
        $completedCount = $stmt2->num_rows;
        $stmt2->bind_result($id, $date, $time, $text, $completed, $starred);

        if ($showCompletedTasks == 'true') {
            $togArrow = 'fa-chevron-down';
            $taskDisplay = 'block';
        } else {
            $togArrow = 'fa-chevron-right';
            $taskDisplay = 'none';
        }

        if ($completedCount > 0) {
            echo '<p class="completeTasksTog noselect"><i class="far '.$togArrow.'"></i>Completed<span>'.$completedCount.'</span></p>';
        }

        while ($stmt2->fetch()) {

            $time_format = date('g:i a', strtotime($time));
            $date_value = date('Y-m-d', strtotime($date));

                echo '<div tid="'.$id.'" class="completeTaskWrap taskWrap" style="display: '.$taskDisplay.'">
                        <div class="taskBox">
                            <div action="0" taskid="'.$id.'" class="checkCircle checkedTask"><i class="far fa-check"></i></div>
                            <div class="'.($time !== $noTime ? 'taskTxtTimeAdded' : 'taskTxtWrap').'">
                                <p tid="'.$id.'" class="taskTitle completeTaskTxt">'.$text.'</p>
                            </div>';

                            if ($time !== '00:00:00') {
                                echo '<p tid="'.$id.'" class="taskTime"><i class="far fa-clock taskClockIcon"></i>'.$time_format.'</p>';
                            }
                            if ($starred == 1) {
                                echo  '<i tid="'.$id.'" class="taskStar fas fa-star"></i>';
                            }
                            else {
                                echo  '<i tid="'.$id.'" class="taskStar fal fa-star"></i>';
                            }

                            echo '<div time="'.$time.'" date="'.$date_value.'" tid="'.$id.'" class="taskEditBtn"><i class="taskEditIcon fas fa-ellipsis-h"></i></div>';

                            echo '</div>
                            </div>';

                    
                        

        }
        $stmt2->close();
    }