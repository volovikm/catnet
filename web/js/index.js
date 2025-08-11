function setCatToCoordinates(i,j)
{
    $('[i="'+i+'"][j="'+j+'"]').addClass('cat');
}
setCatToCoordinates(1,1);

function setFoodToCoordinates(i,j)
{
    $('[i="'+i+'"][j="'+j+'"]').addClass('food');
}
setFoodToCoordinates(6,7);

function setCatEatingToCoordinates(i,j)
{
    $('[i="'+i+'"][j="'+j+'"]').addClass('cat-eating');
}
setCatEatingToCoordinates(8,8);