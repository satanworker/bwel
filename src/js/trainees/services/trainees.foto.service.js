/**
 * Сервис работы с фотографиями
 * 
 */
function TraineesFotoServices($window, $q, $cordovaCamera, $cordovaFileTransfer, $cordovaFile) {
  var currentPicture = null; ///'img/logo.png';
  //var _urlUpload = 'http://192.168.1.167:8089/upload';
  var _urlUpload = 'http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc/UploadDocument';
  return {
    getPicture: _getPicture,
    uploadPicture: _upload,
    setCurrentPicture: _setCurrentPicture,
    currentPicture: currentPicture
  };

  function _upload() {
    //File for Upload
    var targetPath = this.currentPicture; //cordova.file.externalRootDirectory + "someFile.png";
    // File name only
    var filename = targetPath.split("/").pop();
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/png",
      params: {
        'Key': "VT$BbZGmM59exoO",
        'File': "file",
        'TraineeId': "2a2c5a5d-ba0d-e411-af9f-d89d6764e58c",
        'directory': 'upload',
        'fileName': filename
      } // directory represents remote directory,  fileName represents final remote file name

    };
    return this.$cordovaFileTransfer.upload(_urlUpload, targetPath, options).then(
      function(data) {
        alert('upload' + JSON.stringify(data));
      },
      function(err) {
        alert(JSON.stringify(err));
      }
    );
  }

  function _setCurrentPicture(picturePath) {
    console.log(picturePath);
    this.currentPicture = picturePath;
  }

  function _getPicture() {
    //var currentPicture =  this.currentPicture;
    if ($window.Camera === undefined) {
      return $q.when(false);
    }
    let options = {
      quality: 50,
      allowEdit: false,
      targetWidth: 300,
      targetHeight: 300,
      //destinationType: Camera.DestinationType.DATA_URL
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: 1, //Camera.PictureSourceType.CAMERA, // 0:Photo Library, 1=Camera, 2=Saved Photo Album 
      encodingType: Camera.EncodingType.JPEG, // 0=JPG 1=PNG
      popoverOptions: CameraPopoverOptions, //Camera.PopoverOptions,
      cameraDirection: 1,
      correctOrientation: true
    };
    return $cordovaCamera.getPicture(options).then((imagePath) => {

      //currentPicture = imagePath;
      this.currentPicture = imagePath;
      //alert(imagePath + this.currentPicture)
      //alert('!' + currentPicture);
      //Grab the file name of the photo in the temporary directory
      var currentName = imagePath.replace(/^.*[\\\/]/, '');
      //Create a new name for the photo
      var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
      // alert(currentName, cordova.file.tempDirectory);
      // //Move the file to permanent storage
      // return $cordovaFile.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then(function(success) {
      //   alert(currentName, cordova.file.dataDirectory, newFileName);
      //   //success.nativeURL will contain the path to the photo in permanent storage, do whatever you wish with it, e.g:
      //   //createPhoto(success.nativeURL);

      // }, function(error) {
      //   alert(currentName);
      //   //an error occured

      // });
      return currentPicture;
    }, function(error) {
      alert(error);
    });

  }
  // @see https://gist.github.com/sean-hill/4abcec4577a44195db51
  // @see example http://www.gajotres.net/using-cordova-file-transfer-plugin-with-ionic-framework/
  function _sendFile(fileURL) {
    var uploadOptions = new FileUploadOptions();
    uploadOptions.fileKey = "file";
    uploadOptions.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    uploadOptions.mimeType = "image/jpeg";
    uploadOptions.chunkedMode = false;

    this.$cordovaFile.uploadFile(serverURL, fileURL, uploadOptions).then(

      function(result) {
        deferred.resolve(result);
      },
      function(err) {
        deferred.reject(err);
      });
  }
}
TraineesFotoServices.$inject = ['$window', '$q', '$cordovaCamera', '$cordovaFileTransfer', '$cordovaFile'];
export default TraineesFotoServices;
