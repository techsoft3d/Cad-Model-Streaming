function loadModels(){
    console.log("loading")
    hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/00.scs").then(() => {
        console.log('loaded');
      });
    hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/20.scs").then(() => {
    console.log('loaded');
    });
    hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/45.scs").then(() => {
      console.log('loaded');
      });
      hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(), "data/57.scs").then(() => {
        console.log('loaded');
        });
}