/**
 * Created by reetika on 1/4/16.
 */

var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");

function reset(){
    $('.alert').hide();
    if($('#email').val()==""){
        document.getElementById('email').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    console.log(typeof($('#email').val()));
    rootRef.resetPassword({
        email: $('#email').val()
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    $('.alert').addClass("alert-danger").html("The specified user account does not exist.").show();
                    console.log("The specified user account does not exist.");
                    break;
                default:
                    $('.alert').addClass("alert-danger").html("Error resetting password:").show();
                    console.log("Error resetting password:", error);
            }
        } else {
            $('.alert').removeClass("alert-danger").addClass("alert-success").html("Password reset email sent successfully!").show();
            console.log("Password reset email sent successfully!");
            window.location.replace('/login.html');
        }
    });
}