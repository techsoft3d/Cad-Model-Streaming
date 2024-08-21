function loadModels(){
    console.log("loading")
    hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/smoothed_bracket00.scs").then(() => {
        console.log('loaded');
      });
    hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/smoothed_bracket57.scs").then(() => {
    console.log('loaded');
    });
}