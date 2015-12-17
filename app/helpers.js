function get_data(key, id, callback){
	$.ajax({
		type: "GET",
		url: "/api/get_content/" + id + "/sections/" + key,
		dataType: 'json',
		success: function(data){
			console.log(data);
			if (callback){
				callback(data);
			}
		}
	});
}

function getRFQs(callback){
	$.ajax({
		type: "GET",
		url: "/api/rfqs",
		dataType: 'json',
		success: function(data){
			console.log(data);
			if (callback){
				callback(data);
			}
		}
	});
}

function createRFQ(dataDict, callback){
	console.log(dataDict);
	$.ajax({
		type: "POST",
		url: "/api/rfqs",
		data: dataDict,
		dataType: 'json',
		success: function(data){
			if (callback){				
				callback(data);
			}
		}
	});
}


function put_data(key, content, callback){	
	$.ajax({
		type: "PUT",		
		url: "/api/get_content/" + key,
		data: JSON.stringify({text: content}),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			if (callback){
				callback(data);
			}
		}
	});
}
