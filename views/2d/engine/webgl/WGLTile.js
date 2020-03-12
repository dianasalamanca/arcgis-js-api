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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/libs/gl-matrix-2/mat2d","../../../../core/libs/gl-matrix-2/mat2df32","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f32","./definitions","./DirtyMap","./DisplayRecordStore","./Fader","./TiledDisplayObject","./WGLBuffers"],function(t,e,a,l,s,d,o,p,n,y,h,i,c){Object.defineProperty(e,"__esModule",{value:!0});var F=new Set,r=function(r){function t(t,e,a){void 0===a&&(a=!1);var i=r.call(this,t,e,[p.TILE_SIZE,p.TILE_SIZE])||this;return i._data=null,i._displayList=null,i._wglBuffers=null,i._dirtyMap=new n.default,i._labelIndex=null,i._dirty=!0,i.fader=new h.default,i._ensureCorrectZOrder=a,i.transforms.labelMat2d=s.mat2df32.create(),i}return a(t,r),t.prototype.destroy=function(){this.clear()},Object.defineProperty(t.prototype,"displayObjects",{get:function(){return this._data.tileDisplayData.displayObjects},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canDisplay",{get:function(){return!!this.attached},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isDirty",{get:function(){return this._dirty},set:function(t){(this._dirty=t)||this.isReady||this.ready(),this.requestRender()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasData",{get:function(){return!!this._data},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"labelIndex",{get:function(){return this._labelIndex},enumerable:!0,configurable:!0}),t.prototype.getGeometry=function(t){return this._wglBuffers&&this._wglBuffers.has(t)?this._wglBuffers.get(t):null},t.prototype.getDisplayList=function(){return this._data&&this._displayList},Object.defineProperty(t.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0}),t.prototype.setTransform=function(t,e){r.prototype.setTransform.call(this,t,e);var a=this.transforms.labelMat2d,i=t.getScreenTransform(a,e),s=o.vec2f32.create();d.vec2.transformMat2d(s,this.coords,i),l.mat2d.identity(a),l.mat2d.translate(a,a,s),l.mat2d.multiply(a,t.viewMat2d,a)},t.prototype.setData=function(t,e,a){var i=t.addOrUpdate,s=t.remove;if((t.clear||!this.hasData)&&!t.addOrUpdate)return this.clear(),this.ready(),void this.emit("change");!t.clear&&this.hasData||!t.addOrUpdate?this.hasData&&this._doPatchData({addOrUpdate:i,remove:s},e,a):(i.tileDisplayData.computeDisplayList(this._ensureCorrectZOrder),this._dirtyMap=new n.default,this._dispRecStore=y.default.fromTileData(i,this._dirtyMap),this._data=i,this._readyTileIfNoLabels(e,a),this._dirtyMap.markAllDirty(),this._displayList||(this._displayList=i.tileDisplayData.displayList.clone())),this.emit("change")},t.prototype.commitChanges=function(){this.fader.step()||this.requestRender(),this._wglBuffers||(this._wglBuffers=new c.default(this.stage.context)),this._wglBuffers.upload(this._data.tileBufferData,this._dirtyMap),this._displayList=this._data.tileDisplayData.displayList.clone(),this._dirtyMap.markAllClean()},t.prototype.clear=function(){this._data=null,this._displayList=null,this._dispRecStore=null,this._wglBuffers&&(this._wglBuffers.dispose(),this._wglBuffers=null)},t.prototype.attach=function(){return!0},t.prototype._readyTileIfNoLabels=function(t,e){t&&this._rebuildLabelIndex(),this.isDirty=!(!t||!e)},t.prototype._doPatchData=function(t,e,a){this._patchData(t)||(this._dirtyMap.markAllDirty(),this._data.reshuffle(),this._dispRecStore=y.default.fromTileData(this._data,this._dirtyMap)),this._readyTileIfNoLabels(e,a),this.requestRender()},t.prototype._rebuildLabelIndex=function(){this._labelIndex=this._initLabelIndex();for(var t=0,e=this.displayObjects;t<e.length;t++)for(var a=0,i=e[t].metrics;a<i.length;a++){var s=i[a];this._insertIntoLabelIndex(s)}},t.prototype._insertIntoLabelIndex=function(t){-1!==t.xBucket&&this.labelIndex[t.yBucket][t.xBucket].push(t)},t.prototype._initLabelIndex=function(){for(var t=[],e=0;e<p.TILE_SIZE/p.COLLISION_BUCKET_SIZE;e++){t.push([]);for(var a=0;a<p.TILE_SIZE/p.COLLISION_BUCKET_SIZE;a++)t[e].push([])}return t},t.prototype._patchData=function(t){for(var e=!0,a=t.addOrUpdate&&t.addOrUpdate.tileDisplayData&&t.addOrUpdate.tileDisplayData.displayObjects||[],i=(t.remove||[]).slice(),s=0,r=a;s<r.length;s++){null!=(_=r[s]).insertAfter&&i.push(_.id)}for(var l=0,d=i;l<d.length;l++){var o=d[l];if(u=this._data.tileDisplayData.displayObjectRegistry.get(o)){this._data.tileDisplayData.displayList.removeFromList(u.displayRecords);for(var p=0,n=u.displayRecords;p<n.length;p++){var y=n[p];this._dispRecStore.delete(y)}this._data.tileDisplayData.displayObjectRegistry.delete(o);var h=this._data.tileDisplayData.displayObjects.indexOf(u);this._data.tileDisplayData.displayObjects.splice(h,1)}}for(var c=0,f=a;c<f.length;c++){var u,_=f[c],D=void 0;if(u=this._data.tileDisplayData.displayObjectRegistry.get(_.id)){var g=u.displayRecords;u.set(_),u.displayRecords=g;for(var m=u.displayRecords.length,b=0;b<m;++b){var v=u.displayRecords[b],O=_.displayRecords[b];(b>=_.displayRecords.length||v.geometryType!==O.geometryType||v.symbolLevel!==O.symbolLevel||v.zOrder!==O.zOrder||v.materialKey!==O.materialKey)&&(this._dispRecStore.delete(u.displayRecords[b]),b<_.displayRecords.length&&(u.displayRecords[b]=void 0))}u.displayRecords.length=_.displayRecords.length,u.metrics=_.metrics}else{(u=_.copy()).displayRecords=[],this._data.tileDisplayData.displayObjectRegistry.set(_.id,u);var L=void 0,R=this._data.tileDisplayData.displayObjects;if(null!=u.insertAfter)if(D={},0<=u.insertAfter){var I=this._data.tileDisplayData.displayObjectRegistry.get(u.insertAfter);I&&(L=R.indexOf(I)+1)<R.length?R.splice(L,0,u):(R.push(u),L=R.length)}else R.unshift(u),L=0;else R.push(u),L=R.length;if(D){var x=void 0;if(this._data.tileDisplayData.displayList.unified)x=0<_.displayRecords.length?1:0;else{F.clear();for(var T=0,j=_.displayRecords;T<j.length;T++){var B=j[T],S=this._data.tileDisplayData.displayList.getDPInfoType(B.geometryType);F.add(S)}x=F.size}var w=0;for(b=L-1;0<=b&&w<x;--b)for(var M=R[b].displayRecords.length-1;0<=M&&w<x;--M){var E=R[b].displayRecords[M];D[S=this._data.tileDisplayData.displayList.getDPInfoType(E.geometryType)]||(D[S]=E,++w)}}}var P=_.displayRecords.length;for(b=0;b<P;++b){O=_.displayRecords[b];(v=u.displayRecords[b])?(v.meshData=O.meshData,v.materialKey=O.materialKey):((v=O.copy()).vertexFrom=void 0,v.indexFrom=void 0,u.displayRecords[b]=v);var U=O.geometryType,A=(S=this._data.tileDisplayData.displayList.getDPInfoType(U),t.addOrUpdate.tileBufferData.geometries[U]),C=A.vertexBuffer,Z=A.indexBuffer,k=void 0;D&&(k=D[S]?this._data.tileDisplayData.displayList.splitAfter(D[S]):-1),e=this._dispRecStore.setMeshData(v,O,C,Z,k)&&e,D&&null!=v.indexFrom&&null!=v.indexFrom&&(D[S]=v)}}return e},t}(i.TiledDisplayObject);e.WGLTile=r});