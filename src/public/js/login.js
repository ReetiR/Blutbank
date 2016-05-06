/**
 * Created by reetika on 15/3/16.
 */
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
(function(){
    var authData = ref.getAuth();
    if (authData) {
        console.log("User " + authData.uid + " is logged in");
        window.location.replace('/home.html');
    }
    else{
        console.log("User not logged in");
    }
})();

function login(){
    ref.authWithPassword({
        email    : $('#email').val(),
        password : $('#password').val()
    }, function(error, authData) {
        if (error) {
            var msg;
            switch (error.code) {
                case "INVALID_EMAIL":
                    msg = "The specified user account email is invalid.";
                    console.log("The specified user account email is invalid.");
                    $('.alert').addClass("alert-danger").html(msg).show();
                    break;
                case "INVALID_PASSWORD":
                    msg = "The specified user account password is incorrect.";
                    console.log("The specified user account password is incorrect.");
                    $('.alert').addClass("alert-danger").html(msg).show();ho
                    break;
                case "INVALID_USER":
                    msg = "The specified user account does not exist.";
                    console.log("The specified user account does not exist.");
                    $('.alert').addClass("alert-danger").html(msg).show();
                    break;
                default:
                    msg = "Error logging user in: "+ error;
                    console.log("Error logging user in:", error);
                    $('.alert').addClass("alert-danger").html(msg).show();
            }
        } else {
            console.log("Authenticated successfully with payload:", authData);
            if (authData.password.isTemporaryPassword) {
                window.location.replace('/change-password.html');
            } else {
                window.location.replace('/home.html');
            }

        }
    });
}
