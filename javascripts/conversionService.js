import { WebViewer, ScreenConfiguration, Camera} from "@hoops/web-viewer";
import { DesktopUi } from "./desktop/DesktopUi.js";

var modelUIDs = {
        "landing-gear-main-shaft": "348fb408-6946-4300-ba5a-69d684f4622e",
        "microengine": "b1891f18-8ea9-4b7d-8d7a-0dfa52dc4458",
        "wren-mw54-turbo-jet": "3d59b1fb-5fc7-4139-9aa4-829eadc30ed8",
        "ferrari-engine-v12": "6e12d497-7b8a-471d-babf-8fefc2c682b5",
        "Ducati900SS-cafe-racer": "60fffcaa-af1b-4ecf-be82-5d9f4f270a1e"
}


async function startViewer(modelName, uid) {
        var viewer;

        let sessioninfo = await caasClient.getStreamingSession({accessItems:[uid]});

        viewer = new WebViewer({
                containerId: "viewerContainer",
                showModelBrowser: true,
    showToolbar: true,
                endpointUri: "model/snowmanv4.scs",//.endpointUri,
                // model: modelName,
                enginePath: `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@latest`, 
                rendererType: 0
        });

        viewer.start();
        return viewer

}

export async function fetchVersionNumber() {
        let data = await caasClient.getHCVersion();
        versionNumer = data;        
        return data
}



export async function initializeViewer() {

        // var model_name = Sample._getParameterByName("instance");
        const queryString = window.location.search;

        // Create a URLSearchParams object
        const urlParams = new URLSearchParams(queryString);
        
        // Get the value of a specific parameter
        const model_name = urlParams.get('instance');
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
          firstModelLoaded: async function (){
            await animate(viewer);
            console.log("done")
          }
        });
  
        var screenConfiguration = (md.mobile() !== null) ? ScreenConfiguration.Mobile : ScreenConfiguration.screenConfiguration;
        const uiConfig = {
          containerId: "content",
          screenConfiguration: screenConfiguration,
        };
  
  
        ui = new DesktopUi(viewer, uiConfig);
  
  
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

        return viewer
}


function animate(viewer){
  var animationArray = [26,
  30,
  34,
  42,
  38,
  46,
  50,
  58,
  54,
  62,
  114,
  71, 77,
  109, 103,
  66,
  86,
  82,
  90,
  94,
  98]

    // console.log(node)
    viewer.model.setNodesOpacity(animationArray, 0);
    var myJson = cameraPositions[0]; 
    viewer.view.setCamera(Camera.fromJson(myJson));

  for(let i = 0; i < animationArray.length; i++){
    setTimeout(() => {
      gradualFade(viewer, animationArray[i] )
    }, i * 1000); 
      
 
  }

  // viewer.view.setCamera(Camera.fromJson(cameraPositions[1]));
}


function gradualFade(viewer, nodeId){  
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      viewer.model.setNodesOpacity([nodeId], (i+1)/200);
    }, i * 10); 
  }
  
}

function setOpacity(viewer, nodeId, i){
  viewer.model.setNodesOpacity([nodeId], i);
}


export function createImportMap(version) {
        return {
          imports: {
            "my-library": `https://cdn.example.com/my-library@${version}/index.js`
          }
        };
}

var cameraPositions = [
  {
    "position": {
        "x": 77.55606063094437,
        "y": 29.2415316187382,
        "z": -24.412596410685186
    },
    "target": {
        "x": 0.7845520083670319,
        "y": 30.510064125078824,
        "z": 0.936962703171646
    },
    "up": {
        "x": 0.01827439624944371,
        "y": 0.999818899546433,
        "z": 0.005311737143175735
    },
    "width": 80.85835477981051,
    "height": 80.85835477981051,
    "projection": 1,
    "nearLimit": 0.01,
    "className": "Communicator.Camera"
},
{
  "position": {
      "x": 108.00377628266209,
      "y": 41.03596425900575,
      "z": -39.8915499310305
  },
  "target": {
      "x": 0.6048177533574335,
      "y": 29.77338945663782,
      "z": -0.3531503602596058
  },
  "up": {
      "x": -0.08897932333277901,
      "y": 0.9951570089363102,
      "z": 0.04177568173205146
  },
  "width": 114.99854902017495,
  "height": 114.99854902017495,
  "projection": 1,
  "nearLimit": 0.01,
  "className": "Communicator.Camera"
}]