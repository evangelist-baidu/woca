/**
 * Created by yunlong on 14-7-15.
 */

console.log("11111");
window.onload=function(){
    //0:左 1:右
    var dir = Math.random() > 0.5 ? 1 : 0;
    sessionStorage.setItem('direction',dir);

    $(".page-content#dir"+dir).show();
    $(".page-content#dir"+(1- dir)).hide();

}