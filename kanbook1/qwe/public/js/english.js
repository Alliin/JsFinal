$(function(){
 var slideHeight = 300; // px
 var defHeight = $('#suibian').height();
 if(defHeight >= slideHeight){
  $('#suibian').css('height' , slideHeight + 'px');
  $('#read-more').append('<a href="#"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>');
  $('#read-more a').click(function(){
   var curHeight = $('#suibian').height();
   if(curHeight == slideHeight){
    $('#suibian').animate({
     height: defHeight
    }, "normal");
    $('#read-more a').html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
    $('#gradient').fadeOut();
   }else{
    $('#suibian').animate({
     height: slideHeight
    }, "normal");
    $('#read-more a').html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
    $('#gradient').fadeIn();
   }
   return false;
  });  
 }
});