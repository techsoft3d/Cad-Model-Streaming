async function loadModels(){
    console.log("loading")
    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/00_continuous_results.scs").then(() => {
        console.log('loaded');
    });
    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/20_continuous_results.scs").then(() => {
      console.log('loaded');
    });
    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/45_continuous_results_v2.scs").then(() => {
      console.log('loaded');
    });
    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/57_continuous_results.scs").then(() => {
      console.log('loaded');
    });
    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/00_no_results.scs").then(() => {
      console.log('loaded');
    });
    await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/57_no_results.scs").then(() => {
      console.log('loaded');
    });

    setCamera();
    setNodeMatrixes();

}

function setNodeMatrixes(){
  
  var nodeMatrixes = {};
  //model 0
  nodeMatrixes[17179869190] = [
    0.9974194809704917,
    0.06949732056725218,
    0.01801392279675816,
    0,
    -0.06605295627911864,
    0.7899879793736675,
    0.6095539347850183,
    0,
    0.028131582737980117,
    -0.6091708421117035,
    0.7925399038367557,
    0,
    37.28350743347893,
    -531.5734716031119,
    -13.795450545455573,
    1
];

  nodeMatrixes[6] = nodeMatrixes[17179869190]; //model 0 continuous results 

  //model 20
  nodeMatrixes[4294967296] = [
    0.9993443816499162,
    -0.008816529212861059,
    -0.035115177308191,
    0,
    0.025821312554036448,
    0.8534243806002353,
    0.5205766863922082,
    0,
    0.025378468880799015,
    -0.5211421067326489,
    0.8530925142723519,
    0,
    7.9509840582627405,
    -403.25695957123617,
    -28.792199503702335,
    1
];

//model 45
nodeMatrixes[8589934592] = [
  0.981782834112941,
  -0.17455263119275957,
  -0.07505894740033311,
  0,
  0.18944845996833076,
  0.8690288348691999,
  0.4570537880616552,
  0,
  -0.014551551696959764,
  -0.4629473653770642,
  0.8862663195866387,
  0,
  30.05675895692567,
  -277.60557696136084,
  -19.65555687882479,
  1
];


nodeMatrixes[12884901894] = [
  0.9959540060856514,
  -0.0842413981387572,
  -0.031289049227638185,
  0,
  0.0897572233910092,
  0.9155176103319067,
  0.39213664202837695,
  0,
  -0.004388463407463106,
  -0.3933584777423545,
  0.9193747056435363,
  0,
  51.38240636205842,
  -143.1191107548686,
  -17.61708724751614,
  1
];

nodeMatrixes[21474836480] = nodeMatrixes[12884901894]
for (let key in nodeMatrixes) {
  var myArray = Communicator.Matrix.createFromArray(nodeMatrixes[key]);
  hwv.model.setNodeMatrix(Number(key), myArray)
  console.log("done")
}
  // nodeMatrixes[4294967296] = "value2"; //model 20 continuous results 
  // nodeMatrixes[8589934592] = "value2"; //model 45 continuous results 
  // nodeMatrixes[12884901888] = "value2"; //model 57 continuous results 
  //  = "value2"; //model 57 no results 


  // hwv.model.getNodeNetMatrix(2)
}

function setCamera(){
  
  newcamera = Communicator.Camera.fromJson(camera);
  hwv.view.setCamera(newcamera);
  console.log("finito")
}

var camera = {
    "position": {
        "x": 104.80285206486118,
        "y": -132.2209562465829,
        "z": 161.0592385166358
    },
    "target": {
        "x": -58.44854568466238,
        "y": -324.6347833768906,
        "z": 5.266703862557733
    },
    "up": {
        "x": -0.3684959433898754,
        "y": -0.37580577474817245,
        "z": 0.8502827526012343
    },
    "width": 296.55591257172676,
    "height": 296.55591257172676,
    "projection": 0,
    "nearLimit": 0.01,
    "className": "Communicator.Camera"
}