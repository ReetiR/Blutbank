/**
 * Created by reetika on 25/4/16.
 */

var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
function change(){
    $('.alert').hide();
    if($('#oldPassword').val()==""){
        document.getElementById('oldPassword').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#newPassword').val()==""){
        document.getElementById('newPassword').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#confirmPassword').val()==""){
        document.getElementById('confirmPassword').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#newPassword').val()!=$('#confirmPassword').val()){
        document.getElementById('newPassword').style.borderColor= "red";
        document.getElementById('confirmPassword').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Values do not match!").show();
        return false;
    }
    rootRef.child("users").child(authData.uid).child("email").once("value", function(snapshot) {
        console.log(snapshot.val());
        rootRef.changePassword({
            email: snapshot.val(),
            oldPassword: $('#oldPassword').val(),
            newPassword: $('#newPassword').val()
        }, function(error) {
            if (error) {
                switch (error.code) {
                    case "INVALID_PASSWORD":
                        console.log("The specified user account password is incorrect.");
                        $('.alert').addClass("alert-danger").html("The specified user account password is incorrect.").show();
                        break;
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                        $('.alert').addClass("alert-danger").html("The specified user account does not exist.").show();
                        break;
                    default:
                        console.log("Error changing password:", error);
                        $('.alert').addClass("alert-danger").html("Error changing password: "+ error).show();
                }
            } else {
                console.log("User password changed successfully!");
                $('.alert').removeClass("alert-danger").addClass("alert-success").html("User password changed successfully!").show();
                window.location.replace("/home.html");
            }
        });
    });

}