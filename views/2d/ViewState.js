// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../Viewpoint","../../core/JSONSupport","../../core/accessorSupport/decorators","../../geometry/Extent","./viewpointUtils","./libs/gl-matrix/mat2d","./libs/gl-matrix/vec2"],function(e,t,r,n,o,i,p,a,s,l,y){var u=[0,0];return function(e){function t(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=e.apply(this,t)||this;return n.pixelRatio=1,n.size=[0,0],n}r(t,e),i=t,Object.defineProperty(t.prototype,"center",{get:function(){var e=this.viewpoint.targetGeometry;return y.set(y.create(),e.x,e.y)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"extent",{get:function(){return s.getExtent(new a,this.viewpoint,this.size)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.size?this.size[1]:0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"id",{get:function(){return this._get("id")+1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseTransform",{get:function(){return l.invert(l.create(),this.transform)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"latitude",{get:function(){return this.viewpoint.targetGeometry.latitude},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"longitude",{get:function(){return this.viewpoint.targetGeometry.longitude},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"resolution",{get:function(){return s.getResolution(this.viewpoint)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rotation",{get:function(){return this.viewpoint.rotation},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scale",{get:function(){return this.viewpoint.scale},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"screenCenter",{get:function(){return y.scale(y.create(),this.size,.5)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"spatialReference",{get:function(){return this.viewpoint.targetGeometry.spatialReference},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transform",{get:function(){return s.getTransform(l.create(),this.viewpoint,this.size,this.pixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transformNoRotation",{get:function(){return s.getTransformNoRotation(l.create(),this.viewpoint,this.size,this.pixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"clippedExtent",{get:function(){return s.getClippedExtent(new a,this.viewpoint,this.size)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this.size?this.size[0]:0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"worldScreenWidth",{get:function(){return s.getWorldScreenWidth(this.spatialReference,this.resolution)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"worldWidth",{get:function(){return s.getWorldWidth(this.spatialReference)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"wrappable",{get:function(){return!!this.spatialReference&&this.spatialReference.isWrappable},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this.center[0]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.center[1]},enumerable:!0,configurable:!0}),t.prototype.copy=function(e){var t=this.size,r=this.viewpoint;return this.viewpoint=null,this._set("size",null),r&&t?(this.viewpoint=s.copy(r,e.viewpoint),this._set("size",y.copy(t,e.size))):(this.viewpoint=e.viewpoint.clone(),this._set("size",[e.size[0],e.size[1]])),this._set("pixelRatio",e.pixelRatio),this},t.prototype.clone=function(){return new i({viewpoint:this.viewpoint.clone(),size:y.clone(this.size)})},t.prototype.toMap=function(e,t,r){return Array.isArray(t)?y.transformMat2d(e,t,this.inverseTransform):(u[0]=t,u[1]=r,y.transformMat2d(e,u,this.inverseTransform))},t.prototype.toScreen=function(e,t,r){return Array.isArray(t)?y.transformMat2d(e,t,this.transform):(u[0]=t,u[1]=r,y.transformMat2d(e,u,this.transform))},t.prototype.toScreenNoRotation=function(e,t,r){return Array.isArray(t)?y.transformMat2d(e,t,this.transformNoRotation):(u[0]=t,u[1]=r,y.transformMat2d(e,u,this.transformNoRotation))},t.prototype.pixelSizeAt=function(e){var t=this.viewpoint;return s.pixelSizeAt(e,t,this.size)};var i;return n([p.property({dependsOn:["viewpoint.targetGeometry.x","viewpoint.targetGeometry.y"]})],t.prototype,"center",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.scale","viewpoint.targetGeometry.x","viewpoint.targetGeometry.y","viewpoint.targetGeometry.spatialReference","size"]})],t.prototype,"extent",null),n([p.property({readOnly:!0,dependsOn:["size"]})],t.prototype,"height",null),n([p.property({value:0,readOnly:!0,dependsOn:["transform"]})],t.prototype,"id",null),n([p.property({readOnly:!0,dependsOn:["transform"]})],t.prototype,"inverseTransform",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.targetGeometry.latitude"]})],t.prototype,"latitude",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.targetGeometry.longitude"]})],t.prototype,"longitude",null),n([p.property({type:Number,json:{write:!0}})],t.prototype,"pixelRatio",void 0),n([p.property({readOnly:!0,dependsOn:["viewpoint.scale","viewpoint.targetGeometry.spatialReference"]})],t.prototype,"resolution",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.rotation"]})],t.prototype,"rotation",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.scale"]})],t.prototype,"scale",null),n([p.property({readOnly:!0,dependsOn:["size"]})],t.prototype,"screenCenter",null),n([p.property({json:{write:!0}})],t.prototype,"size",void 0),n([p.property({readOnly:!0,dependsOn:["viewpoint.targetGeometry.spatialReference"]})],t.prototype,"spatialReference",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.rotation","viewpoint.scale","viewpoint.targetGeometry.x","viewpoint.targetGeometry.y","viewpoint.targetGeometry.spatialReference","size","pixelRatio"]})],t.prototype,"transform",null),n([p.property({readOnly:!0,dependsOn:["viewpoint.scale","viewpoint.targetGeometry.x","viewpoint.targetGeometry.y","viewpoint.targetGeometry.spatialReference","size","pixelRatio"]})],t.prototype,"transformNoRotation",null),n([p.property({type:o,json:{write:!0}})],t.prototype,"viewpoint",void 0),n([p.property({readOnly:!0,dependsOn:["viewpoint.rotation","viewpoint.scale","viewpoint.targetGeometry.x","viewpoint.targetGeometry.y","viewpoint.targetGeometry.spatialReference","size"]})],t.prototype,"clippedExtent",null),n([p.property({readOnly:!0,dependsOn:["size"]})],t.prototype,"width",null),n([p.property({readOnly:!0,dependsOn:["worldWidth","resolution"]})],t.prototype,"worldScreenWidth",null),n([p.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"worldWidth",null),n([p.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"wrappable",null),n([p.property({readOnly:!0,dependsOn:["center"]})],t.prototype,"x",null),n([p.property({readOnly:!0,dependsOn:["center"]})],t.prototype,"y",null),t=i=n([p.subclass("esri.views.2d.ViewState")],t)}(p.declared(i))});