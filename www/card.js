/**
 * Created by yunlong on 14-7-18.
 */

onload = function() {
//    typeof updateCardDisplay == "undefined" ? alert("updateCardDisplay in not defined") : updateCardDisplay();
    alert("direction onload!");

    var dir=1;

    var rightDirName= dir == 1 ? "right":"left";
    var wrongDirName= dir == 1 ? "left":"right";

    imgNum=6;

    var indexSel = parseInt(Math.random() * imgNum);

    for(var i=0;i<imgNum;i++) {
        var imgSrc = i == indexSel ? "img/direction/"+rightDirName+"/"+parseInt(Math.random() * imgNum)+".jpg" :"img/direction/"+wrongDirName+"/"+i+".jpg" ;
        $("#img"+i).attr("src",imgSrc);
    }
};
alert("card.js");

function card_update() {
    alert("card_update");

    var dir=1;

    var rightDirName= dir == 1 ? "right":"left";
    var wrongDirName= dir == 1 ? "left":"right";

    imgNum=6;

    var indexSel = parseInt(Math.random() * imgNum);

    for(var i=0;i<imgNum;i++) {
        var imgSrc = i == indexSel ? "img/direction/"+rightDirName+"/"+parseInt(Math.random() * imgNum)+".jpg" :"img/direction/"+wrongDirName+"/"+i+".jpg" ;
        $("#img"+i).attr("src",imgSrc);
    }
}