function getUserAgentAbbr(): string {
  var sBrowser, sUsrAg = window.navigator.userAgent;
  // console.log(sUsrAg);
  if (sUsrAg.indexOf("Firefox") > -1) {
     sBrowser = "MF";
  } else if (sUsrAg.indexOf("OPR") > -1) {
       sBrowser = "OP";
  } else if (sUsrAg.indexOf("Trident") > -1) {
       sBrowser = "IE";
  } else if (sUsrAg.indexOf("Edge") > -1) {
       sBrowser = "ME";
  } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "GC";
  } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "AS";
  } else {
      sBrowser = "UK";
  }
  return sBrowser;
}

export function getUserGuid(): string {
   const nav = window.navigator;
   const screen = window.screen;
   // console.log(nav);
   // console.log(screen);
   let guid: string = nav.mimeTypes.length.toString();
   guid += getUserAgentAbbr() + '-' + nav.userAgent.replace(/\D+/g, '');
   guid += '-' + nav.plugins.length;
   guid += screen.width || '0000';
   guid += screen.height || '0000';
   guid += screen.pixelDepth || '00';
   return guid;
};
