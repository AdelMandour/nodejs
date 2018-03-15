
$(function(){
arr=[];
$(".product").on("click",function(E){

name=$(this).children(".nameiteam").text();
price=$(this).children(".price").text()


//$("#smallcontainer").append('<span class="s"><form oninput="result.value=parseInt(secondnumber.value)*parseInt(fristnumber.value)"><img src="/imgs/Close-2-icon.png"/ class="close"><input type="number" name="secondnumber" value='+price+' id="m">'+name+':<input type="number"name="fristnumber" value="0" id="inpnum" min="1"> EGP <output name="result" value='+price+'></form></span>');
$("#smallcontainer").append('<span class="s"><img src="/imgs/Close-2-icon.png"/ class="close"><span class="names">'+name +'</span><span class="number"> 1 </span><div class="add"> + </div><div class="sub"> - </div> EGP <span class="result">'+price+'</span><span class="h">'+price+'</span></span>');

$(".s").on("click","img",function(){

    $(this).parents("span").remove();
   });//delete
   $(".s").on("click",".add",function(){
     number=parseInt($(this).parents(".s").children(".number").text());
     number++;
      $(this).parents(".s").children(".number").text(number);
      $(this).parents(".s").children(".result").text(number*price);

   });//add

   $(".s").on("click",'.sub',function(){
     number=parseInt($(this).parents(".s").children(".number").text());
     if(number<1){
       number=1;
     }
     number--;
      $(this).parents(".s").children(".number").text(number);
      $(this).parents(".s").children(".result").text(number*price);

   });//sub
   //alert();
  $(this).unbind("click");

totalprice=0;
  console.log(document.getElementsByClassName("result").length);
  console.log($(document.getElementsByClassName("result")[1]).text());

});//total

totalprice=0;
sumOfNumberIteam=0;
     $(".total").on("click",function(){

     result=document.getElementsByClassName("result");
      number=document.getElementsByClassName("number");
      names=document.getElementsByClassName("names");
      price=document.getElementsByClassName("h");

     for(i=0;i<result.length;i++){
       obj={};
       totalprice =totalprice+ parseInt($(result[i]).text());
       //obj.numberItems=$(number[i]).text();
       obj.nameiteam=$(names[i]).text();
       obj.price=$(price[i]).text();
       sumOfNumberIteam =sumOfNumberIteam+ parseInt($(number[i]).text());


      arr.push(obj);
     }
     $("#totalprice").val(totalprice);

     console.log(arr);
     console.log(sumOfNumberIteam );
     $("#components").val(arr);
     $("#mount").val(sumOfNumberIteam);

});//select elem





});
