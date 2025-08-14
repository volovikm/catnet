<?php
    if(isset($_POST['training_data']))
    {
        $training_data=$_POST['training_data'];
        file_put_contents('training-data-json.js',"const TRAINING_DATA_JSON='".json_encode($training_data,JSON_UNESCAPED_UNICODE)."';");
        echo true;
    }
?>