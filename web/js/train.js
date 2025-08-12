// Создание стартовых тензоров
const INPUT_TENSOR = tf.tensor2d(TRAINING_DATA.inputs,[2,2]);
//const OUTPUT_TENSOR = tf.tensor3d(TRAINING_DATA.outputs, [2,10,2],'int32');
const OUTPUT_TENSOR = tf.tensor2d(TRAINING_DATA.outputs, [2,2],'int32');

// Создание модели
let model = tf.sequential();
model.add(tf.layers.dense({inputShape: [2], units: 100 }));
model.add(tf.layers.dense({units: 16 }));
model.add(tf.layers.dense({units: 2, activation: 'softmax'}));

const train = async () => {
    model.compile({
        optimizer: tf.train.sgd(0.01),
        loss: 'meanSquaredError',
        metrics: ['accuracy'],
    });

    console.log('Training started');

    const EPOCHS = 50;
    await model.fit(INPUT_TENSOR, OUTPUT_TENSOR, {
        batchSize: 32,
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