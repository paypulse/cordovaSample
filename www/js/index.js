/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



/**
 * Gloval 변수
 * **/
var fileAddressUrl = "http://192.168.50.213:8082/edulab/menuItem/sampeDownload";
var fileServerUrl ="http://211.34.230.55/atest/A.zip";

var saveFilePath;

//app.initialize();

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // 모든 기능이 여기에서 이뤄 져야 함
    saveFilePath = cordova.file.externalDataDirectory;


    //device 종류
    alert(device.platform);

    //앱을 실행 했을때
    fileUrlApiCall();
}

/****
 * file url file download
 */
var StatusCallback = function(status){
    alert(status);
    if(status == 0){
        // Everything OK
         window.open(saveFilePath+"A/1/index.html",'_blank','location=yes');
    }else if(status == -1){
        // Everything is wrong ...
    }
};

// Handle the progress of the decompression
var ProgressCallback = function(progressEvent){

    var percent =  Math.round((progressEvent.loaded / progressEvent.total) * 100);

    // Display progress in the console : 8% ...
    console.log(percent + "%");
};
function fileUrlApiCall(){
    alert("How to use plugin library");
    alert(fileServerUrl);
    alert(saveFilePath);
    var uri = encodeURI(fileServerUrl);
    alert(uri);


    var fileTransfer = new FileTransfer();
    alert(fileTransfer);

    //파일이 있는지 여부 체크


    fileTransfer.download(
        uri, saveFilePath + "A.zip", function(entry) {
            alert("download complete: ");
            // alert(JSON.stringify(entry));
            /**
             * Unzip
             * **/
            var zipPath = saveFilePath + "A.zip";
            var zipExtractDirectory = saveFilePath;
            window.zip.unzip(zipPath, zipExtractDirectory, StatusCallback, ProgressCallback);
        },
        function(error) {

            alert(JSON.stringify(error));
            alert("download error source ");

        },
        false, {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );



}



/**
 * Document ready
 * */
// document.addEventListener("DOMContentLoaded", function(){
//     fileUrlApiCall();
// });
