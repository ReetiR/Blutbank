/**
 * Created by reetika on 17/3/16.
 */

var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
var authData = rootRef.getAuth();
(function(){


    if (authData) {
        console.log("User " + authData.uid + " is logged in");
        rootRef.child("users").child(authData.uid).child("name").once("value", function(snapshot) {
            console.log(snapshot.val());
            document.getElementById("username").innerHTML = snapshot.val();
        });
    } else {
        console.log("User is logged out");
        window.location.replace('/login.html');
    }
})();


function logout(){
    rootRef.unauth();
    console.log("User is logged out");
    window.location.replace('/login.html');
}

function changePassword(){
    rootRef.child("users").child(authData.uid).child("email").once("value", function(snapshot) {
        console.log(snapshot.val());
        rootRef.resetPassword({
            email: snapshot.val()
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
            }
        });
    });
}