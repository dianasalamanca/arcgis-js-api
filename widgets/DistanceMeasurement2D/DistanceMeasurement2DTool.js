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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../Graphic","../../symbols","../../core/Handles","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/geometryEngine","../../geometry/Point","../../geometry/Polyline","../../geometry/projection","../../geometry/SpatialReference","../../geometry/support/geodesicUtils","../../layers/GraphicsLayer","../../views/2d/draw/Draw","../../views/2d/interactive/dragUtils/dragHandlers","../../views/interactive/GraphicManipulator","../../views/interactive/InteractiveToolBase"],function(e,t,i,r,o,n,a,s,l,p,c,d,h,u,y,v,m,_,f,w,g){function L(e,t,i,r){var a=new n.SimpleMarkerSymbol({style:"circle",color:r.handleColor,size:r.handleWidth,outline:{type:"simple-line",width:0}}),s=new n.SimpleMarkerSymbol({style:"circle",color:r.handleColor,size:1.5*r.handleWidth,outline:{type:"simple-line",width:0}}),l=new o({geometry:e,symbol:a});return new w.GraphicManipulator({view:t,layer:i,graphic:l,focusedSymbol:s})}return function(e){function t(t){var i=e.call(this,t)||this;return i._drawActive=!1,i._handles=new a,i._polylineLayer=new m({listMode:"hide"}),i._manipulatorLayer=new m({listMode:"hide"}),i._vertices=[],i.deferCreation=!0,i}i(t,e),n=t,t.prototype.initialize=function(){var e=this,t=this.view;this._draw=new _({view:t}),t.map.addMany([this._polylineLayer,this._manipulatorLayer]),t.focus(),this._handles.add([this.watch("viewModel.unit",function(){e._vertices.length>0&&e._updatePolylines()})]),l.init(this,"view.spatialReference",function(t){n.isProjectionEngineRequired({spatialReference:t})&&e._loadProjectionEngine()})},t.prototype.destroy=function(){this.detach(),this._handles.removeAll(),this._polylineLayer.removeAll();var e=this.viewModel,t=e.view.map;t.remove(this._polylineLayer),t.remove(this._manipulatorLayer),e.measurement=null,this._draw&&(this._draw.destroy(),this._draw=null),this._handles&&(this._handles.destroy(),this._handles=null),this._polylineLayer&&(this._polylineLayer.destroy(),this._polylineLayer=null),this._manipulatorLayer&&(this._manipulatorLayer.destroy(),this._manipulatorLayer=null)},Object.defineProperty(t.prototype,"editable",{set:function(e){this._set("editable",e),e||this._draw.reset()},enumerable:!0,configurable:!0}),t.prototype.activate=function(){this._drawActive||0!==this._vertices.length||this._startSketch()},t.prototype.onShow=function(){this._polylineLayer.visible=!0},t.prototype.onHide=function(){this._polylineLayer.visible=!1},t.prototype.reset=function(){this._vertices=[],this._polylineLayer.removeAll(),this.viewModel.measurement=null,this._draw.reset(),this._drawActive=!1,this._updateSketch([])},t.updateViewModelAndCreateGraphics=function(e,t){var i,r,n=t.geodesicDistanceThreshold,a=t.palette,s=t.view,l=s.spatialReference,p=new h({paths:[e],spatialReference:l});if(l.isGeographic)if(v.isSupported(l))i=v.geodesicLengths([p],"meters")[0],r=v.geodesicDensify(p,1e5);else{var d=u.project(p,y.WGS84),m=v.geodesicDensify(d,1e5);i=v.geodesicLengths([d],"meters")[0],r=u.project(m,l)}else if(l.isWebMercator)i=c.geodesicLength(p,"meters"),r=c.geodesicDensify(p,1e5,"meters");else{var _=c.planarLength(p,"meters");if(_>=n){var d=u.project(p,y.WGS84),m=v.geodesicDensify(d,1e5);i=v.geodesicLengths([d],"meters")[0],r=u.project(m,l)}else i=_,r=p}t.measurement={geometry:r,length:i};var f=a.pathPrimaryColor,w=a.pathSecondaryColor,g=a.pathWidth;return[new o({geometry:r,symbol:{type:"simple-line",cap:"butt",join:"round",color:f,width:g}}),new o({geometry:r,symbol:{type:"simple-line",style:"dash",cap:"butt",join:"round",color:w,width:g-2}}),new o({geometry:p.extent.center,symbol:{type:"text",color:[255,255,255,1],haloColor:[0,0,0,.5],haloSize:2,text:t.measurementLabel,font:{size:14,family:"sans-serif"}}})]},t.isProjectionEngineRequired=function(e){if(!e)return!1;var t=e.spatialReference;if(!t)return!1;var i=t.isGeographic,r=t.isWebMercator,o=t.isWGS84;return i&&!o&&!v.isSupported(t)||!i&&!r},t.isProjectionEngineSupported=function(){return u.isSupported()},t.prototype.onInputEvent=function(e){"pointer-move"===e.type&&this._updateCursor()},t.prototype._loadProjectionEngine=function(){return n.isProjectionEngineSupported()&&!u.isLoaded()?u.load():s.resolve()},t.prototype._startSketch=function(){var e=this;this._drawActive=!0;var t=this._draw.create("polyline",{mode:"click"});t.on(["vertex-add","vertex-update","vertex-remove","cursor-update","undo","redo"],function(t){return e._updateSketch(t.vertices)}),t.on("draw-complete",function(){e._stopSketch()})},t.prototype._stopSketch=function(){this.manipulators.forEach(function(e){e.manipulator.interactive=!0}),this._drawActive=!1,this.complete()},t.prototype._updateSketch=function(e){var t=this;if(!n.isProjectionEngineRequired(this.view)||u.isLoaded()){if(e.length<2)return this._vertices=[],this.manipulators.removeAll(),void this._polylineLayer.removeAll();this.create();for(var i=this.view.spatialReference;this._vertices.length>e.length;){var r=this._vertices.pop().manipulatorId;this.manipulators.remove(r)}for(var o=this,a=this._vertices.length;a<e.length;a++)!function(r){var n=e[r],a=n[0],s=n[1],l=new d({x:a,y:s,spatialReference:i}),p=L(l,o.view,o._manipulatorLayer,o.viewModel.palette),c=o.manipulators.add(p);f.createGraphicManipulatorDragHandler2D(o.view,p,function(){var e=p.graphic.geometry;t._vertices[r].coord=[e.x,e.y],t._updatePolylines()}),o._vertices.push({manipulatorId:c,coord:[a,s]})}(a);var s=this._vertices.length-1,l=this._vertices[s],p=e[s],c=p[0],h=p[1];if(l.coord[0]!==c||l.coord[1]!==h){l.coord=[c,h];var y=new d({x:c,y:h,spatialReference:i});this.manipulators.findById(l.manipulatorId).graphic.geometry=y}var v=this._drawActive?this._vertices[s].manipulatorId:null;this.manipulators.forEach(function(e){e.manipulator.interactive=null==v||e.id!==v}),this._updatePolylines()}},t.prototype._updateCursor=function(){this.cursor=this._drawActive?"crosshair":null},t.prototype._updatePolylines=function(){this._polylineLayer.removeAll();var e=this.viewModel,t=this._vertices.map(function(e){return e.coord}),i=n.updateViewModelAndCreateGraphics(t,e);i&&this._polylineLayer.addMany(i)};var n;return r([p.property({constructOnly:!0})],t.prototype,"view",void 0),r([p.property({constructOnly:!0})],t.prototype,"viewModel",void 0),r([p.property()],t.prototype,"cursor",void 0),r([p.property({value:!0})],t.prototype,"editable",null),t=n=r([p.subclass("esri.widgets.DistanceMeasurement2D.DistanceMeasurement2DTool")],t)}(p.declared(g.InteractiveToolBase))});