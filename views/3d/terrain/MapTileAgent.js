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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/ObjectPool","./TileAgent"],function(e,t,n,r,o){return function(e){function t(){var t=e.call(this)||this;return t._scaleRangeEnabled=!0,t}return n(t,e),Object.defineProperty(t.prototype,"_desiredMinLevelDelta",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_loadingLevelDelta",{get:function(){return 8},enumerable:!0,configurable:!0}),t.Pool=new r(t),t}(o.TileAgent)});