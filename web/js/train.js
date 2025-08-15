$('#start-train-button').on('click',function(){
    startTrain()
});



function startTrain()
{
    let training_data=JSON.parse(TRAINING_DATA_JSON);

    for(key in training_data.inputs)
    {
        training_data.inputs[key][0]=Number.parseInt(training_data.inputs[key][0]);

        for(let route_number in training_data.outputs)
        {
            for(let step in training_data.outputs[route_number])
            {
                training_data.outputs[route_number][step]=Number.parseInt(training_data.outputs[route_number][step]);
            }
        }
    }    

    // Создание стартовых тензоров
    const INPUT_TENSOR = tf.tensor2d(training_data.inputs,[training_data.inputs.length,1]);
    const OUTPUT_TENSOR = tf.tensor2d(training_data.outputs);

    // Создание модели
    let model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [1], units: training_data.inputs.length }));
    model.add(tf.layers.dense({units: 64 }));
    model.add(tf.layers.dense({units: 16 }));
    model.add(tf.layers.dense({units: training_data.outputs[0].length, activation: 'softmax'}));

    const train = async () => {
        model.compile({
            optimizer: tf.train.sgd(0.01),
            loss: 'meanSquaredError',
            metrics: ['accuracy'],
        });

        console.log('Training started');

        const EPOCHS = 1000;
        await model.fit(INPUT_TENSOR, OUTPUT_TENSOR, {
            batchSize: 64,
            epochs: EPOCHS,
            shuffle: true,
            callbacks: {onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch} `, logs);
            }},
        });

        // Удаление стартовых тензоров
        INPUT_TENSOR.dispose();
        OUTPUT_TENSOR.dispose();
    }
    train();
}

