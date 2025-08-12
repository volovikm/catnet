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

setCatToCoordinates(1,1);
setFoodToCoordinates(6,7);