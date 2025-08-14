<?php
    $rows=10;
    $columns=10;

    $commands=[
        'food'=>['description'=>'Еда'],
        'drink'=>['description'=>'Пить'],
        'tastes'=>['description'=>'Вкусняшки'],
    ];
?>
<html>
    <head>
        <script src="https://snipp.ru/cdn/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js"></script>
        <link rel="stylesheet" href="/web/css/index.css">
    </head>
    <body>
        <div class="container nowrap">
            <div class="d-inline-block">
                <table id="field" class="field">
                    <?php for($i=$rows-1;$i>=0;$i--) :?>
                        <tr class="row">
                            <?php for($j=0;$j<$columns;$j++) :?>
                                <td class="column" i="<?=$i?>" j="<?=$j?>">
                                    <div object class="align-center">
                                        <?=$i.' - '.$j?>
                                    </div>
                                </td>
                            <?php endfor; ?>
                        </tr>
                    <?php endfor; ?>
                </table>
            </div>
            <div class="d-inline-block w-25">
                <?php foreach($commands as $id=>$command) :?>
                    <div class="mt-15">
                        <button command-button command-id="<?= $id ?>" class="button-primary w-100" type="button"><?= $command['description'] ?></button>
                    </div>
                <?php endforeach; ?>
                <div class="mt-15">
                    <form id="form" class="block p-10">
                        <span>Сбор данных</span>
                        <div>
                            <select id="object-input" class="input-base w-100">
                                <?php foreach($commands as $id=>$command) :?>
                                    <option value="<?= $id ?>"><?= $command['description'] ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="mt-5">
                            <button id="change-position-button" class="button-primary w-100" type="button">Изменить положение</button>
                        </div>
                        <div class="mt-5">
                            <button id="clear-button" class="button-primary w-100" type="button">Сбросить</button>
                        </div>
                        <div class="mt-5">
                            <button id="find-way-button" class="button-primary w-100" type="button">Найти путь один раз</button>
                        </div>
                        <div class="mt-5">
                            <button id="start-test-button" class="button-primary w-100" type="button">Сбор данных</button>
                        </div>
                    </form>
                </div>

                <div class="mt-15">
                    <form id="form" class="block p-10">
                        <span>Обучение</span>
                        <div class="mt-5">
                            <button id="start-train-button" class="button-primary w-100" type="button">Запустить обучение</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>

    <script src="web/js/index.js"></script>
    <script src="web/js/training-data.js"></script>
    <script src="/training-data-json.js"></script>
    <script src="web/js/train.js"></script>

</html>