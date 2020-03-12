// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../core/Error"],function(e,r,t){function o(e,r,t){return{identifier:String.fromCharCode.apply(null,new Uint8Array(e,t+h.identifierOffset,h.identifierLength)),version:r.getUint16(t+h.versionOffset,l),checksum:r.getUint32(t+h.checksumOffset,l)}}function n(e,r){return{sizeLo:e.getUint32(r+w.sizeLo,l),sizeHi:e.getUint32(r+w.sizeHi,l),minX:e.getFloat64(r+w.minX,l),minY:e.getFloat64(r+w.minY,l),minZ:e.getFloat64(r+w.minZ,l),maxX:e.getFloat64(r+w.maxX,l),maxY:e.getFloat64(r+w.maxY,l),maxZ:e.getFloat64(r+w.maxZ,l),errorX:e.getFloat64(r+w.errorX,l),errorY:e.getFloat64(r+w.errorY,l),errorZ:e.getFloat64(r+w.errorZ,l),count:e.getUint32(r+w.count,l),reserved:e.getUint32(r+w.reserved,l)}}function i(e){var r=new DataView(e,0),i=0,a=o(e,r,i),d=a.identifier,s=a.version;if(i+=h.byteCount,"LEPCC     "!==d)throw new t("lepcc-decode-error","Bad identifier");if(s>1)throw new t("lepcc-decode-error","Unknown version");var u=n(r,i);if(i+=w.byteCount,u.sizeHi*Math.pow(2,32)+u.sizeLo!==e.byteLength)throw new t("lepcc-decode-error","Bad size");var f=new Float64Array(3*u.count),l=[],p=[],g=[],v=[];if(i=c(e,i,l),i=c(e,i,p),i=c(e,i,g),(i=c(e,i,v))!==e.byteLength)throw new t("lepcc-decode-error","Bad length");for(var m=0,U=0,y=0;y<l.length;y++){U+=l[y];for(var M=0,z=0;z<p[y];z++){M+=g[m];var b=v[m];f[3*m]=Math.min(u.maxX,u.minX+2*u.errorX*M),f[3*m+1]=Math.min(u.maxY,u.minY+2*u.errorY*U),f[3*m+2]=Math.min(u.maxZ,u.minZ+2*u.errorZ*b),m++}}return{errorX:u.errorX,errorY:u.errorY,errorZ:u.errorZ,result:f}}function c(e,r,t){var o=[];r=a(e,r,o);for(var n=[],i=0;i<o.length;i++){n.length=0,r=a(e,r,n);for(var c=0;c<n.length;c++)t.push(n[c]+o[i])}return r}function a(e,r,o){var n=new DataView(e,r),i=n.getUint8(0),c=31&i,a=!!(32&i),d=(192&i)>>6,s=0;if(0===d)s=n.getUint32(1,l),r+=5;else if(1===d)s=n.getUint16(1,l),r+=3;else{if(2!==d)throw new t("lepcc-decode-error","Bad count type");s=n.getUint8(1),r+=2}if(a)throw new t("lepcc-decode-error","LUT not implemented");for(var u=Math.ceil(s*c/8),f=new Uint8Array(e,r,u),h=0,w=0,p=0,g=-1>>>32-c,v=0;v<s;v++){for(;w<c;)h|=f[p]<<w,w+=8,p+=1;o[v]=h&g,h>>>=c,w-=c,w+c>32&&(h|=f[p-1]>>8-w)}return r+p}function d(e,r){return{sizeLo:e.getUint32(r+p.sizeLo,l),sizeHi:e.getUint32(r+p.sizeHi,l),count:e.getUint32(r+p.count,l),colorMapCount:e.getUint16(r+p.colorMapCount,l),lookupMethod:e.getUint8(r+p.lookupMethod),compressionMethod:e.getUint8(r+p.compressionMethod)}}function s(e){var r=new DataView(e,0),n=0,i=o(e,r,n),c=i.identifier,a=i.version;if(n+=h.byteCount,"ClusterRGB"!==c)throw new t("lepcc-decode-error","Bad identifier");if(a>1)throw new t("lepcc-decode-error","Unknown version");var s=d(r,n);if(n+=p.byteCount,s.sizeHi*Math.pow(2,32)+s.sizeLo!==e.byteLength)throw new t("lepcc-decode-error","Bad size");if((2===s.lookupMethod||1===s.lookupMethod)&&0===s.compressionMethod){if(3*s.colorMapCount+s.count+n!==e.byteLength||s.colorMapCount>256)throw new t("lepcc-decode-error","Bad count");for(var u=new Uint8Array(e,n,3*s.colorMapCount),f=new Uint8Array(e,n+3*s.colorMapCount,s.count),l=new Uint8Array(3*s.count),w=0;w<s.count;w++){var g=f[w];l[3*w]=u[3*g],l[3*w+1]=u[3*g+1],l[3*w+2]=u[3*g+2]}return l}if(0===s.lookupMethod&&0===s.compressionMethod){if(3*s.count+n!==e.byteLength||0!==s.colorMapCount)throw new t("lepcc-decode-error","Bad count");return new Uint8Array(e,n).slice()}if(s.lookupMethod<=2&&1===s.compressionMethod){if(n+3!==e.byteLength||1!==s.colorMapCount)throw new t("lepcc-decode-error","Bad count");for(var v=r.getUint8(n),m=r.getUint8(n+1),U=r.getUint8(n+2),l=new Uint8Array(3*s.count),w=0;w<s.count;w++)l[3*w]=v,l[3*w+1]=m,l[3*w+2]=U;return l}throw new t("lepcc-decode-error","Bad method "+s.lookupMethod+","+s.compressionMethod)}function u(e,r){return{sizeLo:e.getUint32(r+g.sizeLo,l),sizeHi:e.getUint32(r+g.sizeHi,l),count:e.getUint32(r+g.count,l),scaleFactor:e.getUint16(r+g.scaleFactor,l),bitsPerPoint:e.getUint8(r+g.bitsPerPoint),reserved:e.getUint8(r+g.reserved)}}function f(e){var r=new DataView(e,0),n=0,i=o(e,r,n),c=i.identifier,d=i.version;if(n+=h.byteCount,"Intensity "!==c)throw new t("lepcc-decode-error","Bad identifier");if(d>1)throw new t("lepcc-decode-error","Unknown version");var s=u(r,n);if(n+=g.byteCount,s.sizeHi*Math.pow(2,32)+s.sizeLo!==e.byteLength)throw new t("lepcc-decode-error","Bad size");var f=new Uint16Array(s.count);if(8===s.bitsPerPoint){if(s.count+n!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var l=new Uint8Array(e,n,s.count),w=0;w<s.count;w++)f[w]=l[w]*s.scaleFactor}else if(16===s.bitsPerPoint){if(2*s.count+n!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var l=new Uint16Array(e,n,s.count),w=0;w<s.count;w++)f[w]=l[w]*s.scaleFactor}else{var l=[],p=a(e,n,l);if(p!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var w=0;w<s.count;w++)f[w]=l[w]*s.scaleFactor}return f}Object.defineProperty(r,"__esModule",{value:!0});var l=!0,h={identifierOffset:0,identifierLength:10,versionOffset:10,checksumOffset:12,byteCount:16},w={sizeLo:0,sizeHi:4,minX:8,minY:16,minZ:24,maxX:32,maxY:40,maxZ:48,errorX:56,errorY:64,errorZ:72,count:80,reserved:84,byteCount:88};r.decodeXYZ=i;var p={sizeLo:0,sizeHi:4,count:8,colorMapCount:12,lookupMethod:14,compressionMethod:15,byteCount:16};r.decodeRGB=s;var g={sizeLo:0,sizeHi:4,count:8,scaleFactor:12,bitsPerPoint:14,reserved:15,byteCount:16};r.decodeIntensity=f});