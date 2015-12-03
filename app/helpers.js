function get_data(key){
	$.ajax({
		type: "GET",
		data: { format : 'json' },
		url: "/api/get_content/" + key,
		success: function(data){
			return data;
		}
	});
}

function put_data(key, content){
	var url_component = key + '?content="' + content + '"';
	$.ajax({
		type: "PUT",
		data: { format : 'json' },
		url: "/api/get_content/" + url_component, 
		success: function(data){
			// what should happen here?
			return data;
		}
	});
}
