const NUMBER_OF_TESTS_PER_TARGET=10;
const NUMBER_OF_TARGETS=10;

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
    max_route_length=0;
    for(i in result)
    {
        route=result[i]['route'];
        route_length=Object.keys(route).length;
        
        if(route_length>max_route_length)
        {
            max_route_length=route_length;
            max_route=route;
        }
    }

    for(i in result)
    {
        stringified_target=result[i]['target']['i']+result[i]['target']['j'];

        route=result[i]['route'];
        route_length=Object.keys(route).length;
        
        if(route_length<max_route_length)
        {
            for(let step=0;step<max_route_length;step++)
            {
                if(!route[step])
                {
                    route[step]={
                        'i':0,
                        'j':0,
                    }
                }
            }
        }

        route_arr=[];
        for(let step in route)
        {
            route_arr[step]=Number.parseInt(route[step]['i'].toString()+route[step]['j'].toString());
        }

        target_arr=[];
        target_arr.push(Number.parseInt(stringified_target));
        inputs.push(target_arr);

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

function decompileWay(stringified_target,route_arr)
{
    stringified_target=stringified_target.toString();
    if(stringified_target.length==1)
    {
        stringified_target='0'+stringified_target;
    } 

    target={};
    target['i']=stringified_target[0];
    target['j']=stringified_target[1];

    route={};
    for(let step in route_arr)
    {
        route_arr[step]=route_arr[step].toString();
        if(route_arr[step].length==1)
        {
            route_arr[step]='0'+route_arr[step];
        } 
        
        route[step]={};
        route[step]={
            'i': route_arr[step][0],
            'j': route_arr[step][1],
        }
    }

    return {
        'target': target,
        'route': route,
    };
}