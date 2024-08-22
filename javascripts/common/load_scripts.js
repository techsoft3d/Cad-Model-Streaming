var versionNumer 
async function loadDynamicScript() {
  var result = await fetchVersionNumber();
  versionNumer = result['hcVersion']
  // var url = `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@20${versionNumer}/hoops_web_viewer.js`
<<<<<<< HEAD
  var url = `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@20${versionNumer}/hoops-web-viewer.iife.js`
=======
  var url = `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@20${versionNumer}/hoops-web-viewer.mjs`
>>>>>>> 709a14fabd79af2b8c82f5a9009113dea2d3a24b

  return new Promise((resolve, reject) => {
      $.getScript(url, async function () {
          console.log('done')
          resolve();
      });
  });
}

async function loadIndividualScript(url) {
  return new Promise((resolve, reject) => {
      $.getScript(url, async function () {
          console.log('done')
          resolve();
      });
  });
}

