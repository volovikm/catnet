const NUMBER_OF_TESTS_PER_TARGET=100;
const NUMBER_OF_TARGETS=100;

$('#start-test-button').on('click',function(){
    collectTrainingData();
});

function collectTrainingData()
{
    result={};
    k=0;
    for(let i=0;i<NUMBER_OF_TARGETS;i++)
    {
        changePosition();
        for(let j=0;j<NUMBER_OF_TESTS_PER_TARGET;j++)
        {
            clear();
            result[k]=findWay();
            k++;
        }
    }

    inputs=[];
    outputs=[];

    for(i in result)
    {
        stringified_target=result[i]['target']['i']+result[i]['target']['j'];

        route=result[i]['route'];
        stringified_route='';
        for(step in route)
        {
            stringified_route=stringified_route+route[step]['i']+route[step]['j'];
        }

        target_arr=[];
        target_arr.push(Number.parseInt(stringified_target));
        inputs.push(Ntarget_arr);

        route_arr=[];
        route_arr.push(Number.parseInt(stringified_route));
        outputs.push(route_arr);
    }

    training_data={
        inputs: inputs,
        outputs: outputs,
    }

    // way=decompileWay(inputs[0],outputs[0]);
    // traceWay(way['target'],way['route']);

    $.ajax({
        url: '/training-data.php',
        type: 'POST',
        data: {
            training_data: training_data
        },
        dataType : 'json',
        success: function(data) {
            console.log('Training data collected');
        },
    });
}

function decompileWay(stringified_target,stringified_route)
{
    target={};
    target['i']=stringified_target[0][0];
    target['j']=stringified_target[0][1];

    route={};
    step=0;
    is_i=true;
    for(item in stringified_route[0])
    {
        if(item % 2 === 0) //i
        {
            route[step]={};
            route[step]['i']=stringified_route[0][item];
        }
        else //j
        {
            route[step]['j']=stringified_route[0][item];
            step++;
        }
    }

    return {
        'target': target,
        'route': route,
    };
}