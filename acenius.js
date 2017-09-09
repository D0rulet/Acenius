var images = $("#images");
var selectedCardsArr = [];
var divDelete = [];

$("form").submit(function(event){
    event.preventDefault();
});
var inputArr = {};
$(".submit").click(function(){
  return inputArr = $(":input").serializeArray();
})



$("#players").bind('keyup change click', function (e) {

    if (!$(this).data("previousValue") || $(this).data("previousValue") != $(this).val()){
        numPlayers = $(this).val();
        createNameInput(numPlayers);   
   }
});

function createNameInput(num){
    var htmlName = '';
    var htmlPlayer = '';
    var htmlScoreboard ='';
    for(var i = 1; i <= num; i++){
        htmlName += '<div><label for="player' + i +'">Player '+ i +'</label><input type="text" name="player'+ i +'" id="player'+ i +'"></div>';
        htmlPlayer += '<div class="player-icon"><img src="player.png" alt="player"></div>'
        htmlScoreboard += '<div class="score"><h3>Name1</h3><h4>Score</h4></div>'
    }   
    $(".select-names").empty().append(htmlName);
    $(".players").empty().append(htmlPlayer);
    $(".scores").empty().append(htmlScoreboard);
}

$(".submit").click(function(){
    $.ajax({
        type: 'GET',
        url: "https://www.acenius.com/scripts/getPinterestJson.php?user="+inputArr[0].value+"&board="+ inputArr[1].value +"",
        success: function(data){            
            images.empty();
            var imageArr = [];
            $.each(data.item, function(i, itemImage){
                imageArr.push(itemImage.image,itemImage.image);
                shuffle(imageArr);
            })            
            createCards(imageArr);
            tryCard();
            playerNames(inputArr);
        },
        error: function(){
            alert('User or Board not found');
        }
    })
})
function tryCard(){
    $(".img-wrapper").click(function(){
        var imgWrapper = $(this);
        var divDel = imgWrapper.attr("data-order");
        // console.log(divDelete,divDel);
        var pic = imgWrapper.children().attr("src");
        switch(selectedCardsArr.length){
            case 0:            
            selectedCardsArr.push(pic);
            divDelete.push(divDel);
            break;
            case 1:            
            selectedCardsArr.push(pic);
            divDelete.push(divDel);
            selectedCardsArr[0] == selectedCardsArr [1] ? win(divDelete) : lose(divDelete);
            break;             
        }
        imgWrapper.addClass("flip");
        setTimeout(function(){
            imgWrapper.removeClass("flip");
            imgWrapper.children().css('filter', 'opacity(1)');
        },100)        
    })
}
function shuffle(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
function createCards(arr){
    for(var i =0; i < arr.length; i++){
        images.append('<div class="img-wrapper" data-order="'+ i +'"><img src="' + arr[i] + '"></div>');
    }
}
// console.log(divDelete)
function win(divOrder){
    console.log('win');
    for(var i = 0;i < 2;i++){
        var correctDiv = parseInt(divOrder[i]) + 1;
        $(".row.game #images div:nth-child(" + correctDiv + ")").fadeOut();
    }
    var canContinue = true;
    selectedCardsArr=[];
    divDelete = [];
}
function lose(divOrder){
    console.log(divOrder);
    for(var i = 0; i < 2; i++){
        var correctDiv = parseInt(divOrder[i]) + 1;
        $("#images div:nth-child(" + correctDiv + ")").children().css('filter', 'opacity(0)');
    }
    var canContinue = false;
    selectedCardsArr = [];
    divDelete = [];
}

function playerNames(arr){
    for(var i = 0; i< arr.length; i++){
        var rightIndex = i + 2;
        arr[rightIndex].name === ('player' + i) ? $(".score:nth-child("+i+") h3").html(arr[rightIndex].value) : console.log("dude?")
    }
}

function whoIsUp(arr){

}

// To do:
// fix lose function / playerNames function
// loop through players when their turn comes
// keep track of score
// implement max number of cards
// implement reward for winning
// implement form check
// disable menu during game

// 9 hours have passed, did not want to send mail at a late hour
// I clocked 2 hours on wednesday, 1:45 thursday and friday 5:15
// I really do believe I can do [a bit] better than this
// I will keep playing with this project as it is super nice.
// I will do it using OOP
// and try it in angular just to test myself
// #nofilter review please and a tip towards what to look into [or do] - it would make me very happy
// I would love to keep in touch, no matter what happends next.

