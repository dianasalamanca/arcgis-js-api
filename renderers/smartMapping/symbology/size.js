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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/extendsHelper","../../../Color","./support/SymbologyBase","./support/utils"],function(o,a,i,t,e,r,n){function c(o,a){var i="mesh"!==o.geometryType&&o.worldScale,t=i?o.view:null;switch(o.geometryType){case"point":case"multipoint":var e=a;return l({color:e.color,noDataColor:e.noDataColor,outline:e.outline,size:e.size,noDataSize:e.noDataSize,minSize:e.minSize,maxSize:e.maxSize,opacity:e.opacity||1},t);case"polyline":var r=a;return p({color:r.color,noDataColor:r.noDataColor,width:r.width,noDataWidth:r.noDataWidth,minWidth:r.minWidth,maxWidth:r.maxWidth},t);case"polygon":var n=a,c=n.marker;return delete c.opacity,d({marker:c,background:n.background,opacity:n.opacity||1},t)}}function l(o,a){return{color:new e(o.color),noDataColor:new e(o.noDataColor),outline:{color:new e(o.outline.color),width:o.outline.width},size:a?n.toWorldScale(o.size,a):o.size,noDataSize:a?n.toWorldScale(o.noDataSize,a):o.noDataSize,minSize:a?n.toWorldScale(o.minSize,a):o.minSize,maxSize:a?n.toWorldScale(o.maxSize,a):o.maxSize,opacity:o.opacity}}function p(o,a){return{color:new e(o.color),noDataColor:new e(o.noDataColor),width:a?n.toWorldScale(o.width,a):o.width,noDataWidth:a?n.toWorldScale(o.noDataWidth,a):o.noDataWidth,minWidth:a?n.toWorldScale(o.minWidth,a):o.minWidth,maxWidth:a?n.toWorldScale(o.maxWidth,a):o.maxWidth,opacity:1}}function d(o,a){var i=l(o.marker,a);return delete i.opacity,{marker:i,background:{color:new e(o.background.color),outline:{color:new e(o.background.outline.color),width:o.background.outline.width}},opacity:o.opacity}}var m=[128,128,128,1],h=[128,128,128,1],x={primary:{color:[227,139,79,1],noDataColor:m,outline:{color:[255,255,255,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[128,128,128,1],noDataColor:m,outline:{color:[255,255,255,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[255,255,255,1],noDataColor:m,outline:{color:[128,128,128,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},y={primary:{color:[227,139,79,1],noDataColor:h,outline:{color:[92,92,92,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[178,178,178,1],noDataColor:h,outline:{color:[92,92,92,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[26,26,26,1],noDataColor:h,outline:{color:[128,128,128,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},u=[0,0,0,0],s={color:u,outline:{color:[166,166,166,.25],width:"1px"}},S={color:u,outline:{color:[153,153,153,.25],width:"1px"}},D={light:x,dark:y},z={light:{primary:{color:[226,119,40,1],noDataColor:m,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[77,77,77,1],noDataColor:m,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:m,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]},dark:{primary:{color:[226,119,40,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[255,255,255,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]}},w={light:{primary:{marker:x.primary,background:S,opacity:x.primary.opacity},secondary:[{marker:x.secondary[0],background:S,opacity:x.secondary[0].opacity},{marker:x.secondary[1],background:S,opacity:x.secondary[1].opacity}]},dark:{primary:{marker:y.primary,background:s,opacity:y.primary.opacity},secondary:[{marker:y.secondary[0],background:s,opacity:y.secondary[0].opacity},{marker:y.secondary[1],background:s,opacity:y.secondary[1].opacity}]}},W={name:"default",label:"Default",description:"Default theme for visualizing features by varying their size to show data.",schemes:{point:D,polyline:z,polygon:w}},k={default:W};return new(function(o){function a(){return o.call(this,{themeDictionary:k})||this}return t(a,o),a.prototype.getSchemes=function(o){if("mesh"===o.geometryType)return null;var a=this.getRawSchemes({theme:"default",basemap:o.basemap,geometryType:o.geometryType,basemapTheme:o.basemapTheme});if(a){var i=a.schemesInfo,t=a.basemapId,e=a.basemapTheme;return{primaryScheme:c(o,i.primary),secondarySchemes:i.secondary.map(function(a){return c(o,a)}).filter(Boolean),basemapId:t,basemapTheme:e}}},a.prototype.cloneScheme=function(o){if(o){var a=i({},o);return"color"in a&&a.color&&(a.color=new e(a.color)),"noDataColor"in a&&a.noDataColor&&(a.noDataColor=new e(a.noDataColor)),"outline"in a&&a.outline&&(a.outline={color:a.outline.color&&new e(a.outline.color),width:a.outline.width}),"marker"in a&&a.marker&&(a.marker=this.cloneScheme(a.marker)),"background"in a&&a.background&&(a.background=this.cloneScheme(a.background)),a}},a}(r))});