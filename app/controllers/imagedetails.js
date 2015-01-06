var args = arguments[0] || {};

var id = args.guid;

$.image.image = Ti.Filesystem.applicationDataDirectory + id +'.png';

function enableTextField(event){
	$.imageName.visible = true;
	$.imageName.focus();
	console.log(event.y + "-" + $.image.height);
	if(event.y > ($.image.height - 50)){
		$.nameContainer.top = $.image.height - 50;
	}else{
		$.nameContainer.top = event.y;
	}
}

