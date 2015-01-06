var images = Alloy.Collections.image;
images.fetch();

// var image = Alloy.createModel("image", {
	// date: Date.now(),
	// name: 'test'
// });
// 
// images.add(image);
// image.save();

function deleteImage(event){
	var selectedImage = event.source;
	var args = {
		id: selectedImage.alloy_id,
	};
}

function viewImage(event){
	var selectedImage = event.source;
	console.log("selected image:");
	console.log(selectedImage);
	var args = {
		guid: selectedImage.guid
	};
	var imageView = Alloy.createController("imagedetails", args).getView();
	if (OS_IOS) {
        $.navWin.openWindow(imageView);
    }
 	if (OS_ANDROID){
        imageView.open();
    }   
}

function saveImage(filepath, imageData){
	var f = Ti.Filesystem.getFile(filepath);
	f.write(imageData, true);
}

function takeImage(e){
	Ti.Media.showCamera({
	success:function(event) {
 	// called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
 		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			var image = event.media;
			var guid = Ti.Platform.createUUID();
			var path = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, guid + '.png').nativePath;
			saveImage(path, image);
			console.log(path);
			var newImage = Alloy.createModel('image', {
				date: Date.now(),
				name: 'test',
				filepath: path,
				alloy_id: guid
			});
			images.add(newImage);
			newImage.save();
			
			var args = {
				guid: guid
			};
			var imageView = Alloy.createController("imagedetails", args).getView();
			if (OS_IOS) {
		        $.navWin.openWindow(imageView);
		    }
		 	if (OS_ANDROID){
		        imageView.open();
		    }   
		    			
		} else {
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function() {
 	// called when user cancels taking a picture
	},
	error:function(error) {
 	// called when there's an error
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
 		if (error.code == Titanium.Media.NO_CAMERA) {
			a.setMessage('Please run this test on device');
		} else {
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	saveToPhotoGallery:true,
 	// allowEditing and mediaTypes are iOS-only settings
	allowEditing:true,
	mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

$.navWin.open();
