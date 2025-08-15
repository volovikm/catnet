function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}



//Установка объектов
function setCatToCoordinates(i,j)
{
    $('[i="'+i+'"][j="'+j+'"]').addClass('cat');
}

function setFoodToCoordinates(i,j)
{
    $('[i="'+i+'"][j="'+j+'"]').addClass('food');
}

function setCatEatingToCoordinates(i,j)
{
    $('[i="'+i+'"][j="'+j+'"]').addClass('cat-eating');
}

//Поле 
function getMaxIndex()
{
    max_i=0;
    $('#field').find('td').each(function(){
        i=Number.parseInt($(this).attr('i'));
        if(i>max_i)
        {
            max_i=i;
        }
    });

    max_j=0;
    $('#field').find('td').each(function(){
        j=Number.parseInt($(this).attr('j'));
        if(j>max_j)
        {
            max_j=j;
        }
    });

    max_index=[];
    max_index['i']=max_i;
    max_index['j']=max_j;

    return max_index;
}

function countNewIndex(start_i,start_j)
{
    sign=randomInteger(PLUS, MINUS);
    side=randomInteger(I, J);

    i=start_i;
    j=start_j;

    if(sign==PLUS)
    {
        if(side==I)
        {
            i=Number.parseInt(start_i)+1;
        }
        if(side==J)
        {
            j=Number.parseInt(start_j)+1;
        }
    }

    if(sign==MINUS)
    {
        if(side==I)
        {
            i=Number.parseInt(start_i)-1;
        }
        if(side==J)
        {
            j=Number.parseInt(start_j)-1;
        }
    }

    new_index=[];
    new_index['i']=Number.parseInt(i);
    new_index['j']=Number.parseInt(j);

    return new_index;
}

function clear()
{
    $('.cat-eating').removeClass('cat-eating');

    setCatToCoordinates(0,0);
    food_i=localStorage.getItem('food_i');
    food_j=localStorage.getItem('food_j');
    setFoodToCoordinates(food_i,food_j);
}

$('#clear-button').on('click',function(){
    clear();
});



//Изменение положения
$('#change-position-button').on('click',function(){
    changePosition();
});

function changePosition()
{
    clear();

    object=$('#object-input').val();

    $('td[i][j]').removeClass(object);

    min_i=1;
    min_j=1;
    
    max_index=getMaxIndex();

    object_i=randomInteger(min_i,max_index['i']);
    object_j=randomInteger(min_j,max_index['j']);

    $('td[i="'+object_i+'"][j="'+object_j+'"]').addClass(object);

    localStorage.setItem(object+'_i',object_i);
    localStorage.setItem(object+'_j',object_j);
}



//Подбор путей
const PLUS=1;
const MINUS=2;
const I=1;
const J=2;

$('#find-way-button').on('click',function(){
    result={};
    findWay(result);
});

function move(route)
{
    cat_i=$('td.cat').attr('i'); 
    cat_j=$('td.cat').attr('j');

    max_index=getMaxIndex();
    new_index=countNewIndex(cat_i,cat_j);

    route_length=Object.keys(route).length;
    
    while(
        new_index['i']<0 || new_index['i']>max_index['i'] || 
        new_index['j']<0 || new_index['j']>max_index['j'] || 
        (route[route_length-2] && route[route_length-2]['i']==new_index['i'] && route[route_length-2]['j']==new_index['j']) ||
        (new_index['i']==cat_i && new_index['j']==cat_j)
    )
    {
        new_index=countNewIndex(cat_i,cat_j);
    }

    $('td[i][j]').removeClass('cat');
    setCatToCoordinates(new_index['i'],new_index['j']);

    route[route_length]={};
    route[route_length]['i']=new_index['i'];
    route[route_length]['j']=new_index['j'];

    return route;
}

function findWay()
{
    clear();
    object=$('#object-input').val();

    route={};
    route[0]={};
    route[0]['i']=0;
    route[0]['j']=0;

    while(true)
    {
        setTimeout(function(){},100);

        route=move(route);
        
        //Встретил объект
        if($('td.cat').hasClass(object))
        {
            cell=$('td.cat');
            $(cell).removeClass('cat');
            $(cell).removeClass(object);
            $(cell).addClass('cat-eating');

            cell_i=$(cell).attr('i');
            cell_j=$(cell).attr('j');

            let result={
                'target':   {
                    'i': cell_i,
                    'j': cell_j,
                },
                'route': route,
            };

            return result;
        }
    }
}



//Воспроизведение путей
function traceWay(target,route)
{
    clear();

    object=$('#object-input').val();
    $('.'+object).removeClass(object);
    localStorage.setItem(object+'_i',target['i']);
    localStorage.setItem(object+'_j',target['j']);
    setFoodToCoordinates(target['i'],target['j']);

    let step_=0;
    interval=setInterval(function(){

        $('td[i][j]').removeClass('cat');
        setCatToCoordinates(route[step_]['i'],route[step_]['j']);

        if($('td.cat').hasClass(object))
        {
            cell=$('td.cat');
            $(cell).removeClass('cat');
            $(cell).removeClass(object);
            $(cell).addClass('cat-eating');

            clearInterval(interval);
        }

        step_++;
    },100);
}



$(function(){
    clear();
})