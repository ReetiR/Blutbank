/**
 * Created by reetika on 23/3/16.
 */

var rootRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
(function(){
    $('#users').removeClass('active');
    $('#donors').addClass('active');
    var t = $('#datatable').DataTable({
        
        processing: true,
        responsive: true,
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 3 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 4 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 8 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 9 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 10 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 13 ],
                "visible": false,
                "searchable": false
            }
        ]
    });
    $('#datatable_processing').show();
    var donorRef= rootRef.child('donors');
    donorRef.on("child_added",function(snapshot){
        $('#datatable_processing').hide();
        var data = snapshot.val();
        var med= "no";
        var desc = "None";
        var sign;
        var date= " ";
        if(data.rhesus="positive")
            sign= '+';
        else sign= '-';
        if(data.medicalCondition){
            med="yes";
            desc = data.medicalCondition;
        }

        if(data.lastDonated){
            var d = new Date(data.lastDonated);
             date = [
                d.getFullYear(),
                ('0' + (d.getMonth() + 1)).slice(-2),
                ('0' + d.getDate()).slice(-2)
            ].join('-');
        }
        t.row.add( [
            data.name,
            data.age,
            data.sex,
            data.batch,
            data.semester,
            data.weight,
            data.bloodGroup + sign,
            med,
            desc,
            data.number,
            data.email,
            date,
            '<a title="Delete" class="btn btn-xs btn-danger" onclick="del(\''+ snapshot.key() +'\');"><i class="fa fa-remove"></i></a><a title="Edit" class="btn btn-xs btn-warning" onclick="edit(\''+ snapshot.key() +'\');"><i class="fa fa-pencil"></i></a><a title="View" class="btn btn-xs btn-info" onclick="openModal(\''+ snapshot.key() +'\');"><i class="fa fa-eye"></i></a>',
            snapshot.key()
        ] ).draw( false );
        t.columns().every( function () {
            var column = this;
            var select = $('<select><option value=""></option></select>')
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );

            column.data().unique().sort().each( function ( d, j ) {
                if(column.search() === '^'+d+'$'){
                    select.append( '<option value="'+d+'" selected="selected">'+d+'</option>' );
                } else {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                }
            } );
        } );
    });
    $('#datatable tbody').on('click', 'tr', function () {
        var data = t.row( this ).data();
        document.getElementById('Name').innerHTML= data[0];
        document.getElementById('Age').innerHTML= data[1];
        document.getElementById('Sex').innerHTML= toTitleCase(data[2]);
        document.getElementById('Batch').innerHTML= data[3];
        document.getElementById('Semester').innerHTML= data[4];
        document.getElementById('Weight').innerHTML= data[5];
        document.getElementById('BloodGroup').innerHTML= data[6];
        document.getElementById('MedCond').innerHTML= data[8];
        document.getElementById('Phone').innerHTML= data[9];
        document.getElementById('Email').innerHTML= data[10];
        document.getElementById('LastDonated').innerHTML= data[11];
        $('#myModal').modal('show');
        $( "#lastDonated" ).click(function() {
            var date= new Date().getTime();
            rootRef.child('donors').child(data[13]).update({
                lastDonated: date
            }, function(error){
                if(error){
                    $('#myModal').modal('hide');
                    $('.alert').addClass("alert-warning").html("Date couldn't be changed!").show();
                }
                else{
                    window.location.replace('/donors.html');
                }
            });
        });
    } );
})();

function del(id){
    rootRef.child('donors').child(id).remove(function(error){
        if(error){
            window.location.replace('/donors.html');
            $('.alert').removeClass("alert-success").addClass("alert-danger").html("Deletion failed!").show();
        }
        else{
            window.location.replace('/donors.html');
            $('.alert').removeClass("alert-danger").addClass("alert-success").html("Donor deleted successfully!").show();
        }
    })
}

function edit(id){
    localStorage.setItem("id", id);
    window.location.replace('edit-donor.html');
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function openModal(id){
    rootRef.child('donors').child(id).once("value", function(snapshot){
        var data = snapshot.val();
        var desc = "None";
        var sign;
        var date= " ";
        if(data.rhesus="positive")
            sign= '+';
        else sign= '-';
        if(data.medicalCondition){
            desc = data.medicalCondition;
        }

        if(data.lastDonated){
            var d = new Date(data.lastDonated);
            date = [
                d.getFullYear(),
                ('0' + (d.getMonth() + 1)).slice(-2),
                ('0' + d.getDate()).slice(-2)
            ].join('-');
        }
        document.getElementById('Name').innerHTML= data.name;
        document.getElementById('Age').innerHTML= data.age;
        document.getElementById('Sex').innerHTML= toTitleCase(data.sex);
        document.getElementById('Batch').innerHTML= data.batch;
        document.getElementById('Semester').innerHTML= data.semester;
        document.getElementById('Weight').innerHTML= data.weight;
        document.getElementById('BloodGroup').innerHTML= data.bloodGroup+sign;
        document.getElementById('MedCond').innerHTML= desc;
        document.getElementById('Phone').innerHTML= data.number;
        document.getElementById('Email').innerHTML= data.email;
        document.getElementById('LastDonated').innerHTML= date;
        $('#myModal').modal('show');
        $( "#lastDonated" ).click(function() {
            var date= new Date().getTime();
            rootRef.child('donors').child(id).update({
                lastDonated: date
            }, function(error){
                if(error){
                    $('#myModal').modal('hide');
                    $('.alert').addClass("alert-warning").html("Date couldn't be changed!").show();
                }
                else{
                    window.location.replace('/donors.html');
                }
            });
        });
    });
}