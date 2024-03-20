modelUIDs = {
        "landing-gear-main-shaft": "348fb408-6946-4300-ba5a-69d684f4622e",
        "microengine": "b1891f18-8ea9-4b7d-8d7a-0dfa52dc4458",
        "wren-mw54-turbo-jet": "3d59b1fb-5fc7-4139-9aa4-829eadc30ed8",
        "ferrari-engine-v12": "6e12d497-7b8a-471d-babf-8fefc2c682b5",
        "Ducati900SS-cafe-racer": "60fffcaa-af1b-4ecf-be82-5d9f4f270a1e"
}


async function startViewer(modelName, uid) {
   
        var viewer;

//        let sessioninfo = await caasClient.getStreamingSession();
//        await caasClient.enableStreamAccess(sessioninfo.sessionid, [uid]);
        let sessioninfo = await caasClient.getStreamingSession({accessItems:[uid]});

        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: sessioninfo.endpointUri,
                model: modelName,
                enginePath: `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@20${versionNumer}`,
                rendererType: 0
        });

        viewer.start();
        return viewer

}

async function fetchVersionNumber() {
        let data = await caasClient.getHCVersion();
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