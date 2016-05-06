/**
 * Created by reetika on 28/3/16.
 */
/**
 * Created by reetika on 22/3/16.
 */

var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
(function(){
    $('#users').removeClass('active');
    $('#donors').addClass('active');
    for (var i = new Date().getFullYear(); i > 1900; i--)
    {
        $('#batch').append($('<option />').val(i).html(i));
    }
    var id = localStorage.getItem('id');
    console.log(id);
    rootRef.child('donors').child(id).on('value', function(snapshot){
        console.log(snapshot.val().name);
        $('#name').val(snapshot.val().name);
        $('#number').val(snapshot.val().number);
        $('#email').val(snapshot.val().email);
        $('#age').val(snapshot.val().age);
        $('#weight').val(snapshot.val().weight);
        $('#batch').val(snapshot.val().batch);
        $('#semester').val(snapshot.val().semester);
        $(':radio[value="' + snapshot.val().sex + '"]').attr('checked', 'checked');
        $(':radio[value="' + snapshot.val().bloodGroup + '"]').attr('checked', 'checked');
        $(':radio[value="' + snapshot.val().rhesus + '"]').attr('checked', 'checked');
        if(snapshot.val().medicalCondition)
            $('#medCond').val(snapshot.val().medicalCondition);
        if(snapshot.val().lastDonated){
            var d = new Date(snapshot.val().lastDonated);
            var date = [
                d.getFullYear(),
                ('0' + (d.getMonth() + 1)).slice(-2),
                ('0' + d.getDate()).slice(-2)
            ].join('-');
            $('#lastDonated').val(date);
        }

    });
})();

function edit(){
    var date;
    $('.alert').hide();
    if($('#name').val()==""){
        document.getElementById('name').style.borderColor= "red";
        $('.alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#number').val()==""){
        document.getElementById('number').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#number').val().length!=10){
        document.getElementById('number').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Invalid number").show();
        return false;
    }
    if($('#email').val()==""){
        document.getElementById('email').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#age').val()==""){
        document.getElementById('email').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#weight').val()==""){
        document.getElementById('weight').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#batch').val()==""){
        document.getElementById('batch').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#semester').val()==""){
        document.getElementById('semester').style.borderColor= "red";
        $('#user-alert').addClass("alert-danger").html("Fill field").show();
        return false;
    }
    if($('#lastDonated').val()){
        date= new Date($('#lastDonated').val()+" 00:00:00").getTime();
    }
    var id = localStorage.getItem("id");
    var donorRef= rootRef.child('donors').child(id);
    donorRef.update({
        name: $('#name').val(),
        email: $('#email').val(),
        number: $('#number').val(),
        age: $('#age').val(),
        weight: $('#weight').val(),
        semester: $('#semester').val(),
        batch: $('#batch').val(),
        sex: $('input[name=gender]:checked').val(),
        bloodGroup: $('input[name=bloodGroup]:checked').val(),
        rhesus: $('input[name=rhesus]:checked').val(),
        medicalCondition: $('#medCond').val(),
        lastDonated: date
    }, function (error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            if($('#lastDonated').val()){
                donorRef.update({
                    lastDonated: date
                }, function (error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    } else {
                        window.location.replace('/donors.html');
                        $('.alert').removeClass("alert-danger").addClass("alert-success").html("Edited Donor successfully!").show();
                    }
                });
            }
            if($('#medCond').val()){
                donorRef.update({
                    medicalCondition: $('#medCond').val()
                }, function (error) {
                    if (error) {
                        console.log("Data could not be saved." + error);
                    } else {
                        window.location.replace('/donors.html');
                        $('.alert').removeClass("alert-danger").addClass("alert-success").html("Edited Donor successfully!").show();
                    }
                });
            }
            window.location.replace('/donors.html');
            $('.alert').removeClass("alert-danger").addClass("alert-success").html("Edited Donor successfully!").show();
        }
    });
}

function cancel(){
    console.log("here");
    window.location.replace('/donors.html');
}