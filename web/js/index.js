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



function getMaxIndex()
{
    max_i=1;
    $('#field').find('td').each(function(){
        i=Number.parseInt($(this).attr('i'));
        if(i>max_i)
        {
            max_i=i;
        }
    });

    max_j=1;
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

//Изменение положения
$('#change-position-button').on('click',function(){
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
});

//Подбор путей
const PLUS=1;
const MINUS=2;

const I=1;
const J=2;

$('#find-way-button').on('click',function(){

    cat_i=$('td.cat').attr('i'); 
    cat_j=$('td.cat').attr('j');

    sign=randomInteger(PLUS, MINUS);
    side=randomInteger(I, J);

    max_index=getMaxIndex();

    new_index=countNewIndex(cat_i,cat_j,sign,side);
    console.log(new_index);
    while(new_index['i']<1 || new_index['i']>max_index['i'] || new_index['j']<1 || new_index['j']>max_index['j'])
    {
        new_index=countNewIndex(cat_i,cat_j,sign,side);
        console.log(new_index);
    }

    

    setCatToCoordinates(new_index['i'],new_index['j']);
});


function countNewIndex(start_i,start_j,sign,side)
{
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
    new_index['i']=i;
    new_index['j']=j;

    return new_index;
}


$(function(){
    setCatToCoordinates(1,1);

    food_i=localStorage.getItem('food_i');
    food_j=localStorage.getItem('food_j');
    setFoodToCoordinates(food_i,food_j);
})