
function myFunction (el){
	   console.log(el)
       var id = $(el).closest('tr').find("input").val();
	   console.log(id)
       var name = $(el).closest('tr').children('td:nth-child(2)').text(); 
       var age = $(el).closest('tr').children('td:nth-child(3)').text(); 
       var book = $(el).closest('tr').children('td:nth-child(4)').text(); 

        $("#name").val(name);
        $("#age").val(age);
        $("#book").val(book);
		$("#row-id").val(id);

        $("#update").show();
        $("#save").hide();

    }
	
function deleteRow(el) {
	var id = $(el).closest('tr').find('input').val();
       
       $.ajax({
            type:"DELETE",
            url:"https://backend-app-git-mathiyalagan.dsopmi-training-1607940-f72ef11f3ab089a8c677044eb28292cd-0000.sjc03.containers.appdomain.cloud/api/users/" + id,
            success: function(data){
				$("tbody").empty();
                assignDataToTable()
				alertUsing("Delete Success.", true);
                
            },
            error: function(err) {  
                console.log(err);
                alert(err);
            }
        });
}

function assignDataToTable() {
        
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"https://backend-app-git-mathiyalagan.dsopmi-training-1607940-f72ef11f3ab089a8c677044eb28292cd-0000.sjc03.containers.appdomain.cloud/api/users",
          success: function(data) {
            var users = JSON.parse(JSON.stringify(data));
			var n = 1;
            for (var i in users) {
                $("tbody").
                append("<tr> \
                            <td>" +  n + "</td> \
                            <td><input type='hidden' value = '"+  users[i].id +"'/>" +  users[i].name + "</td> \
                            <td>" +  users[i].age + "</td> \
                            <td>" +  users[i].book + "</td> \
                            <td> \ <button id='delete' class='btn btn-danger delete' onclick='deleteRow(this)'>Delete</button> \
                           <button id='edit' class='btn btn-warning edit' onclick = 'myFunction(this)'>Edit</button> \ </td> \
                        </tr>");
						n = n + 1;
            }
          },
          error: function(data) { 
            console.log(data);
            }
        });
       
    }	
		


$(document).ready(function(){

    $("#update").hide();

    assignDataToTable();

    
	
	$("#update").click(function() {

            var ageNum = parseInt($("#age").val());
			var id = $("#row-id").val()

            var jsonVar = {
                name: $("#name").val(),
                age: ageNum,
                book: $("#book").val()
				
            };

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"https://backend-app-git-mathiyalagan.dsopmi-training-1607940-f72ef11f3ab089a8c677044eb28292cd-0000.sjc03.containers.appdomain.cloud/api/users/" + id,
                success: function(data){
					alertUsing("Update Success.", true);
					$("tbody").empty();
                    
                    $("#update").hide();
                    $("#save").show();
                    $("#name").val("");
                    $("#age").val("");
                    $("#book").val("");
					assignDataToTable();
                    
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });
} )
	
	
	

    /*$('table').on('click', 'button[class="edit"]', function(e){
		console.log("clicked")
       var id = $(this).closest('tr').children('td:first').text();
       var name = $(this).closest('tr').children('td:nth-child(2)').text(); 
       var age = $(this).closest('tr').children('td:nth-child(3)').text(); 
       var book = $(this).closest('tr').children('td:nth-child(4)').text(); 

        $("#name").val(name);
        $("#age").val(age);
        $("#book").val(book);

        $("#update").show();
        $("#save").hide();

        $("#update").click(function() {

            var ageNum = parseInt($("#age").val());

            var jsonVar = {
                name: $("#name").val(),
                age: ageNum,
                book: $("#book").val()
            };

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"https://backend-app-git-mathiyalagan.dsopmi-training-1607940-f72ef11f3ab089a8c677044eb28292cd-0000.sjc03.containers.appdomain.cloud/api/users/" + id,
                success: function(data){
                    alertUsing("Update Success.", true);
                    $("#update").hide();
                    $("#save").show();
                    $("#name").val("");
                    $("#age").val("");
                    $("#book").val("");
                    assignDataToTable();
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });

    });

    })*/

    var age = $("#age");

    age.keypress(function(key){
        if(age.val().length < 3){
                return true;
            }else{
                alertUsing("3 character max", false);
                return false;
            }
    });

    $("#save").click(function() {
		console.log("update")

        var jsonVar = {
            name: $("#name").val(),
            age: $("#age").val(),
            book: $("#book").val()
        };
		$("tbody").empty();

        $.ajax({
            type:"POST",
            url:"https://backend-app-git-mathiyalagan.dsopmi-training-1607940-f72ef11f3ab089a8c677044eb28292cd-0000.sjc03.containers.appdomain.cloud/api/users",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
				$(".input-field").val('');
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });

    });

    
	function alertUsing(text, flag) {

		var alert = $(".alert");

		if(flag){
			alert.removeClass("alert-danger").addClass("alert-success");
		}else{
			alert.removeClass("alert-success").addClass("alert-danger");
			
		}
		
		alert.fadeIn(400);
		alert.css("display", "block");
		alert.text(text);
		setTimeout(function() {
			alert.fadeOut();
		}, 2000);

	}


});

function alertUsing(text, flag) {

    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }
