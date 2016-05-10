/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function readURL(input) {
    if (input.files && input.files[0]) {


        var reader = new FileReader();
        var goUpload = true;
        var uploadFile = input.files[0];
        var maxWidth = 300; // Max width for the image
        var maxHeight = 400; // Max height for the image
        var ratio = 3 / 4; // Used for aspect ratio
//        var width = reader.width(); // Current image width
//        var height = reader.height(); // Current image height

//        if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(uploadFile.name)) {
        if (!(/\.(png)$/i).test(uploadFile.name)) {
//            $('#file_input').effect("shake");
            $('#file_input').text('Select an image for your company logo');
            setTimeout(function () {
                $('#file_input').text('Choose file');
            }, 5000);
            goUpload = false;
            console.log('proper image not selected yet');
        } else {

            console.log('image selected');
        }
        if (uploadFile.size > 3000000) { // 2mb
//common.notifyError('Please upload a smaller image, max size is 2 MB');
            $('#file_input').text('Please upload a smaller image, max size is 3 MB');
            setTimeout(function () {
                $('#file_input').text('Choose file');
            }, 5000);
            goUpload = false;
            console.log('proper image size not selected yet');
        } else {

            console.log('image selected');
        }
        var img = uploadFile;
        console.log($(this));
        console.log(img.naturalWidth);
        console.log('width ' + reader.naturalWidth);
//        if (uploadFile.width > 300) {
////common.notifyError('Please upload a smaller image, max size is 2 MB');
//            $('#file_input').text('Image width is more than 300 pixels...');
//            setTimeout(function () {
//                $('#file_input').text('Choose file');
//            }, 5000);
//            goUpload = false;
//            console.log('large width');
//        } else {
//
//            console.log('image selected');
//        }
//
//        if (uploadFile.height > 400) { // 2mb
////common.notifyError('Please upload a smaller image, max size is 2 MB');
//            $('#file_input').text('Image height is more than 300 pixels...');
//            setTimeout(function () {
//                $('#file_input').text('Choose file');
//            }, 5000);
//            goUpload = false;
//            console.log('large height');
//        } else {
//
//            console.log('image selected');
//        }



        if (goUpload) {
            $('#file_input').text("Uploading " + uploadFile.name);
            reader.onload = function (e) {
                $('#company_logo').attr('src', e.target.result).show();
                $('#file_input').text(uploadFile.name);
            };
            reader.readAsDataURL(uploadFile);
        }
    }
}

$("#file_input").change(function () {
    readURL(this);
});

   