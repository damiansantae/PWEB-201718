<?php
header('Content-Type: text/json');


require "../../db_conn.php";
$id = $_GET['id'];
$id = $db->quote($id);

try {
    $db->beginTransaction();
    $get_exercises_id = "SELECT * FROM muscles_exercises WHERE id_muscles=$id";
    $exercises_id = $db->query($get_exercises_id);
    $exercises_id_data = array();
    while ($row = $exercises_id->fetch()) {
        $exercises_id_data[] = $row[2];
    }
    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}

try{
    $db->beginTransaction();
    $exercises_data = array();
    foreach ($exercises_id_data as $ids){
    $get_exercises = "SELECT * FROM exercises WHERE id=$ids";
    $exercises = $db->query($get_exercises);
        while ($row = $exercises->fetch()) {
            $exercises_data[] = array(
                'id' => $row["id"],
                'name' => $row["name"],
                'video_url' => $row["video_url"],
                'description' => $row["description"],
                'image_url' => $row["image_url"]
            );
        }

    }

    unset($ids);

    echo json_encode($exercises_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}



?>