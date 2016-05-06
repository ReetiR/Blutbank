/**
 * Created by reetika on 17/3/16.
 */
var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
(function(){
    $('#donors').removeClass('active');
    $('#users').addClass('active');
    var t = $('#datatable').DataTable({
        processing: true
    });
    $('#datatable_processing').show();
    var userRef= rootRef.child('users');
    userRef.on("child_added",function(snapshot){
        $('#datatable_processing').hide();
        var data = snapshot.val();
        console.log("Name: " + data.name);
        console.log("Email: " + data.email);
        var createdBy= '';
        if(data.createdBy){
            rootRef.child('users').child(data.createdBy).child("name").once('value', function(snapshot){
               createdBy= snapshot.val();
            });
        }
        t.row.add( [
            data.name,
            data.email,
            createdBy,
            '<a title="Delete" class="btn btn-xs btn-danger" onclick="del(\''+ snapshot.key() +'\');"><i class="fa fa-remove"></i></a>'
        ] ).draw( false );
    });
})();


function del(id){
    rootRef.child('users').child(id).remove(function(error){
        if(error){
            $('.alert').removeClass("alert-success").addClass("alert-warning").html("Deletion failed!").show();
        }
        else{
            $('.alert').removeClass("alert-danger").addClass("alert-success").html("Donor deleted successfully!").show();
        }
    })
}