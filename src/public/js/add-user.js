/**
 * Created by reetika on 18/3/16.
 */

var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
(function(){
    $('#users').removeClass('active');
    $('#donors').addClass('active');
})();
var genNonce = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


function add(){
    $('.alert').hide();
    if($('#name').val()==""){
        document.getElementById('name').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#email').val()==""){
        document.getElementById('email').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    var password = genNonce(16);
    console.log("send email with password ", password);
    //alert(password);
    rootRef.createUser({
        email    : $('#email').val(),
        password : password
    }, function(error, userData) {
        if (error) {
            //alert("error");
            console.log("Error creating user:", error);

            $('.alert').addClass("alert-warning").html("Error").show();
        } else {
            //alert("Successfully created user account with uid:"+ userData.uid);
            console.log("Successfully created user account with uid:", userData.uid);
            rootRef.resetPassword({
                email: $('#email').val()
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_USER":
                            console.log("The specified user account does not exist.");
                            break;
                        default:
                            console.log("Error resetting password:", error);
                    }
                } else {
                    console.log("Password reset email sent successfully!");
                    var userRef= rootRef.child('users').child(userData.uid);
                    userRef.update({
                        createdAt: Firebase.ServerValue.TIMESTAMP,
                        name: $('#name').val(),
                        email: $('#email').val(),
                        createdBy:rootRef.getAuth().uid
                    });
                    window.location.replace('/users.html');
                    $('.alert').removeClass("alert-danger").addClass("alert-success").html("Added User successfully!").show();
                }
            });
        }
    });
}