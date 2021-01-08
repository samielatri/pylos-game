'use strict';

$(document).ready(function(){
    $("#regBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/register',
          success: function(data){
            $("#regDiv").html(data);
          }
        });
    });
    $("#loginBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/login',
          success: function(data){
            $("#loginDiv").html(data);
          }
        });
    });
    //=====Login Form Request=============================================
    $("#loginForm").click(function(){
      var uname  = $("#uname").val();
      var upass = $("#upass").val();
      var loginData ={'name': uname,'pass':upass};
      $.ajax({
          type : 'POST',
          url : '/login',
          data : loginData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
    });
 //=====Register Form=============================================
    $("#regForm").click(function(){
      var uname  = $("#uname").val();
      var upass = $("#upass").val();
      var regData ={'name': uname,'pass':upass};
        $.ajax({
          type : 'POST',
          url : '/regiterToDb',
          data : regData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
    });
 //Save profile Data================================================
 $('#saveBtn').click(function(){
   var email = $("#email").val();
   var phone = $("#phone").val();
   var education = $("#education").val();
   var aoi = $("#aoi").val();
   var name = $("#name").val();
   var pass = $("#pass").val();
   var profileData = {'email':email,'phone':phone,'education' : education,'aoi':aoi,'name' : name,'pass' : pass};
   $.ajax({
     type : 'POST',
     url : '/completeprofile',
     data : profileData,
     success : function(data){
        $("#mainDiv").html(data);
     }
   });
 });
 });