modelUIDs = {
        "landing-gear-main-shaft": "7451c93e-a26e-44a1-b341-cc8ab8fb6c1a",
        "microengine": "2b3a2eb9-42de-4b16-936d-b41822be6f4a",
        "wren-mw54-turbo-jet": "1f9c0951-082a-4c79-a9b1-00a9ec2f289b",
        "ferrari-engine-v12": "46df0595-207c-44ff-9bb0-572e01be7a1d",
        "Ducati900SS-cafe-racer": "431619ea-e6c5-4354-882b-fc32a527e2ef"
}

async function startViewer(modelName, uid) {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        var viewer;

        let res = await fetch(conversionServiceURI + '/api/streamingSession');
        var data = await res.json();
        
        var endpointUriBeginning = 'ws://';

        if(conversionServiceURI.substring(0, 5).includes("https")){
                endpointUriBeginning = 'wss://'
        }
        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify([uid]) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: endpointUriBeginning + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: modelName,
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer",
                rendererType: 0
        });

        viewer.start();

        return viewer

}

async function fetchVersionNumber() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        let res = await fetch(conversionServiceURI + '/api/hcVersion');
        var data = await res.json();
        versionNumer = data;
        
        return data

}



async function initializeViewer() {
        var model_name = Sample._getParameterByName("instance");
        var model_uid = modelUIDs[model_name]
  
        var viewer = await startViewer(model_name, model_uid)
  
        var ui = null;
        var md = new MobileDetect(window.navigator.userAgent);
  
        var date = new Date();
        var start = date.getTime();
  
        viewer.setCallbacks({
          modelStructureReady: function () {
            var date = new Date();
            var start = date.getTime();
  
            var end = date.getTime();
            console.log("Load time = " + (end - start) / 1000.0 + " seconds.");
  
            $(".dropdown").css("display", "inline-block");
          },
        });
  
        var screenConfiguration = (md.mobile() !== null) ? Communicator.ScreenConfiguration.Mobile : Sample.screenConfiguration;
        const uiConfig = {
          containerId: "content",
          screenConfiguration: screenConfiguration,
        };
  
  
        ui = new Communicator.Ui.Desktop.DesktopUi(viewer, uiConfig);
  
  
        // const ui = new Communicator.Ui.Desktop.DesktopUi(viewer, uiConfig);
  
        window.onresize = function () {
          viewer.resizeCanvas();
        };
  
        if (model_name === "ferrari-engine-v12") {
          $("#citation").text("Model courtesy of Darren Simpson");
        } else if (model_name === "wren-mw54-turbo-jet") {
          $("#citation").text("Model courtesy of Vasileios Thalassinos");
        }
        var end = date.getTime();
  
        console.log("Load time = " + (end - start) / 1000.0 + " seconds.");
  
        $(".dropdown").css("display", "inline-block");
}