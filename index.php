<?php
    $rows=10;
    $columns=10;
?>
<html>
    <head>
        <script src="https://snipp.ru/cdn/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js"></script>
        <link rel="stylesheet" href="/web/css/index.css">
    </head>
    <body>

        <div class="container">
            <table class="field">
                <?php for($i=10;$i>=1;$i--) :?>
                    <tr class="row">
                        <?php for($j=1;$j<=$columns;$j++) :?>
                            <td class="column" i="<?=$i?>" j="<?=$j?>">
                                <div class="align-center">
                                    <?=$i.' - '.$j?>
                                </div>
                            </td>
                        <?php endfor; ?>
                    </tr>
                <?php endfor; ?>
            </table>
        </div>

        <div class="align-center w-50 mt-15">
            <input placeholder="Команда Лютику"></input>
            <button id="apply-button" class="button-primary w-50" type="button">Применить</button>
        </div>
        
    </body>

    <script src="web/js/index.js"></script>
    <script src="web/js/training-data.js"></script>
    <script src="web/js/train.js"></script>
    <script src="web/js/net.js"></script>
    
</html>