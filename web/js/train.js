$('#start-train-button').on('click',function(){
    startTrain()
});

function startTrain()
{
    let training_data=JSON.parse(TRAINING_DATA_JSON);

    for(key in training_data.inputs)
    {
        training_data.inputs[key][0]=Number.parseInt(training_data.inputs[key][0]);
        training_data.outputs[key][0]=Number.parseInt(training_data.outputs[key][0]);
    }

    console.log(training_data.outputs);

    // // Создание стартовых тензоров
    // const INPUT_TENSOR = tf.tensor2d(training_data.inputs,[10000,1]);
    // const OUTPUT_TENSOR = tf.tensor2d(training_data.outputs, [10000,1]);

    // // // Создание модели
    // let model = tf.sequential();
    // model.add(tf.layers.dense({inputShape: [1], units: 100 }));
    // model.add(tf.layers.dense({units: 16 }));
    // model.add(tf.layers.dense({units: 1, activation: 'softmax'}));

    // const train = async () => {
    //     model.compile({
    //         optimizer: tf.train.sgd(0.01),
    //         loss: 'meanSquaredError',
    //         metrics: ['accuracy'],
    //     });

    //     console.log('Training started');

    //     const EPOCHS = 50;
    //     await model.fit(INPUT_TENSOR, OUTPUT_TENSOR, {
    //         batchSize: 32,
    //         epochs: EPOCHS,
    //         shuffle: true,
    //         callbacks: {onEpochEnd: (epoch, logs) => {
    //             console.log(`Epoch ${epoch} `, logs);
    //         }},
    //     });

    //     // Удаление стартовых тензоров
    //     INPUT_TENSOR.dispose();
    //     OUTPUT_TENSOR.dispose();
    // }
    // train();
}

