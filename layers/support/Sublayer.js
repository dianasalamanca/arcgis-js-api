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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/paramHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../PopupTemplate","../../renderers","../../symbols","../../core/Collection","../../core/Error","../../core/JSONSupport","../../core/lang","../../core/Logger","../../core/promiseUtils","../../core/urlUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../../core/accessorSupport/write","./commonProperties","./LabelClass","./layerSourceUtils","../../renderers/support/jsonUtils","../../tasks/support/Query"],function(e,r,t,i,n,o,a,l,s,p,u,y,c,f,d,h,b,g,m,w,S,O,v,P,_){function x(e){return e&&"esriSMS"===e.type}var E=d.getLogger("esri.layers.support.Sublayer"),I=0;return function(r){function n(e){var t=r.call(this,e)||this;return t._sublayersHandles=null,t}t(n,r),c=n,Object.defineProperty(n.prototype,"definitionExpression",{get:function(){return this._get("definitionExpression")},set:function(e){this._setAndNotifyLayer("definitionExpression",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"id",{get:function(){var e=this._get("id");return null==e?I++:e},set:function(e){if(this._get("id")!==e)return!1===this.get("layer.capabilities.exportMap.supportsDynamicLayers")?void this._logLockedError("id"):void this._set("id",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"labelingInfo",{get:function(){return this._get("labelingInfo")},set:function(e){this._setAndNotifyLayer("labelingInfo",e)},enumerable:!0,configurable:!0}),n.prototype.writeLabelingInfo=function(e,r,t,i){i&&!i.writeAsDynamic||e&&e.length&&(r.layerDefinition={drawingInfo:{labelingInfo:e.map(function(e){return e.write({},i)})}})},Object.defineProperty(n.prototype,"labelsVisible",{get:function(){return this._get("labelsVisible")},set:function(e){this._setAndNotifyLayer("labelsVisible",e)},enumerable:!0,configurable:!0}),n.prototype.writeLabelsVisible=function(e,r,t,i){i&&!i.writeAsDynamic||(r.showLabels=e)},Object.defineProperty(n.prototype,"layer",{set:function(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach(function(r){return r.layer=e})},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"legendEnabled",{get:function(){return this._get("legendEnabled")},set:function(e){this._set("legendEnabled",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"listMode",{get:function(){return this._get("listMode")},set:function(e){this._set("listMode",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"minScale",{get:function(){return this._get("minScale")},set:function(e){this._setAndNotifyLayer("minScale",e)},enumerable:!0,configurable:!0}),n.prototype.readMinScale=function(e,r){return r.minScale||r.layerDefinition&&r.layerDefinition.minScale||0},n.prototype.writeMinScale=function(e,r,t,i){if(i&&i.writeOverridesOnly){var n=i&&i.serviceSublayer;if(n&&n.minScale===e&&n.maxScale===this.maxScale)return}r.minScale=e},Object.defineProperty(n.prototype,"maxScale",{get:function(){return this._get("maxScale")},set:function(e){this._setAndNotifyLayer("maxScale",e)},enumerable:!0,configurable:!0}),n.prototype.readMaxScale=function(e,r){return r.maxScale||r.layerDefinition&&r.layerDefinition.maxScale||0},n.prototype.writeMaxScale=function(e,r,t,i){if(i&&i.writeOverridesOnly){var n=i&&i.serviceSublayer;if(n&&n.maxScale===e&&n.minScale===this.minScale)return}r.maxScale=e},Object.defineProperty(n.prototype,"opacity",{get:function(){return this._get("opacity")},set:function(e){this._setAndNotifyLayer("opacity",e)},enumerable:!0,configurable:!0}),n.prototype.readOpacity=function(e,r){var t=r.layerDefinition;return 1-.01*(null!=t.transparency?t.transparency:t.drawingInfo.transparency)},n.prototype.writeOpacity=function(e,r,t,i){i&&!i.writeAsDynamic||(r.layerDefinition={drawingInfo:{transparency:100-100*e}})},n.prototype.writeParent=function(e,r,t,i){i&&i.writeOverridesOnly||(this.parent&&this.parent!==this.layer?r.parentLayerId=this.parent.id:r.parentLayerId=-1)},Object.defineProperty(n.prototype,"popupEnabled",{get:function(){return this._get("popupEnabled")},set:function(e){this._set("popupEnabled",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"popupTemplate",{get:function(){return this._get("popupTemplate")},set:function(e){this._set("popupTemplate",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"renderer",{get:function(){return this._get("renderer")},set:function(e){if(e)for(var r=0,t=e.getSymbols();r<t.length;r++){var i=t[r];if(p.isSymbol3D(i)){E.warn("Sublayer renderer should use 2D symbols");break}}this._setAndNotifyLayer("renderer",e)},enumerable:!0,configurable:!0}),n.prototype.readRenderer=function(e,r,t){return e=r.layerDefinition.drawingInfo.renderer||void 0,e&&((e=P.read(e,r,t)||void 0)||E.error("Failed to create renderer",{rendererDefinition:r.drawingInfo.renderer,layer:this,context:t})),e},n.prototype.writeRenderer=function(e,r,t,i){i&&!i.writeAsDynamic||(r.layerDefinition={drawingInfo:{renderer:e.toJSON()}})},n.prototype.writeWebSceneRenderer=function(e,r,t,i){i&&!i.writeAsDynamic||(r.layerDefinition={drawingInfo:{renderer:e.toJSON()}})},Object.defineProperty(n.prototype,"source",{get:function(){return this._get("source")||{mapLayerId:this.id,type:v.MAPLAYER}},set:function(e){this._setAndNotifyLayer("source",e)},enumerable:!0,configurable:!0}),n.prototype.writeSource=function(e,r,t,i){i&&!i.writeAsDynamic&&i.writeOverridesOnly||(r.layerDefinition={source:v.sourceToJSON(e)})},Object.defineProperty(n.prototype,"sublayers",{set:function(e){this._handleSublayersChange(e,this._get("sublayers")),this._set("sublayers",e)},enumerable:!0,configurable:!0}),n.prototype.castSublayers=function(e){return m.default(u.ofType(c),e)},n.prototype.writeSublayers=function(e,r,t,i){i&&i.writeOverridesOnly||this.get("sublayers.length")&&(r[t]=this.sublayers.map(function(e){return e.id}).toArray().reverse())},Object.defineProperty(n.prototype,"title",{get:function(){return this._get("title")},set:function(e){this._set("title",e)},enumerable:!0,configurable:!0}),n.prototype.writeTitle=function(e,r,t,i){if(i&&i.writeOverridesOnly){var n=i&&i.serviceSublayer;if(n&&n.title===e)return}r[t]=e},Object.defineProperty(n.prototype,"url",{get:function(){var e=this.layer,r=this.source;if(!e)return null;if(v.isMapLayerSource(r))return e.parsedUrl.path+"/"+r.mapLayerId;var t={layer:JSON.stringify({source:v.sourceToJSON(this.source)})};return e.parsedUrl.path+"/dynamicLayer?"+b.objectToQuery(t)},set:function(e){e?this._override("url",e):this._clearOverride("url")},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"visible",{get:function(){return this._get("visible")},set:function(e){this._setAndNotifyLayer("visible",e)},enumerable:!0,configurable:!0}),n.prototype.writeVisible=function(e,r,t,i){if(i&&i.writeOverridesOnly){var n=i&&i.serviceSublayer;if(n&&n.visible===e)return}r[t]=e},n.prototype.clone=function(){var e=new c;return this.hasOwnProperty("definitionExpression")&&(e.definitionExpression=this.definitionExpression),this.hasOwnProperty("id")&&(e.id=this.id),this.hasOwnProperty("labelingInfo")&&(e.labelingInfo=f.clone(this.labelingInfo)),this.hasOwnProperty("labelsVisible")&&(e.labelsVisible=this.labelsVisible),this.hasOwnProperty("legendEnabled")&&(e.legendEnabled=this.legendEnabled),this.hasOwnProperty("visible")&&(e.visible=this.visible),this.hasOwnProperty("layer")&&(e.layer=this.layer),this.hasOwnProperty("minScale")&&(e.minScale=this.minScale),this.hasOwnProperty("maxScale")&&(e.maxScale=this.maxScale),this.hasOwnProperty("opacity")&&(e.opacity=this.opacity),this.hasOwnProperty("parent")&&(e.parent=this.parent),this.hasOwnProperty("popupEnabled")&&(e.popupEnabled=this.popupEnabled),this.hasOwnProperty("popupTemplate")&&(e.popupTemplate=this.popupTemplate?this.popupTemplate.clone():this.popupTemplate),this.hasOwnProperty("renderer")&&(e.renderer=this.renderer?this.renderer.clone():this.renderer),this.hasOwnProperty("source")&&(e.source=f.clone(this.source)),this.hasOwnProperty("sublayers")&&(e.sublayers=this.sublayers?this.sublayers.clone():this.sublayers),this.hasOwnProperty("title")&&(e.title=this.title),e},n.prototype.createQuery=function(){return new _({returnGeometry:!0,where:this.definitionExpression||"1=1"})},n.prototype.createFeatureLayer=function(){return a(this,void 0,void 0,function(){var r,t,i,n,a;return o(this,function(o){switch(o.label){case 0:return this.hasOwnProperty("sublayers")?[2,null]:(r=this.layer&&this.layer.parsedUrl,t=this.source,i=null,r&&(i=v.isMapLayerSource(t)?r.path+"/"+t.mapLayerId:r.path+"/dynamicLayer"),[4,h.create(function(r){return e(["../FeatureLayer"],r)})]);case 1:return n=o.sent(),a=new n({url:i}),this.hasOwnProperty("definitionExpression")&&(a.definitionExpression=this.definitionExpression),this.hasOwnProperty("labelingInfo")&&(a.labelingInfo=f.clone(this.labelingInfo)),this.hasOwnProperty("labelsVisible")&&(a.labelsVisible=this.labelsVisible),this.hasOwnProperty("legendEnabled")&&(a.legendEnabled=this.legendEnabled),this.hasOwnProperty("visible")&&(a.visible=this.visible),this.hasOwnProperty("minScale")&&(a.minScale=this.minScale),this.hasOwnProperty("maxScale")&&(a.maxScale=this.maxScale),this.hasOwnProperty("opacity")&&(a.opacity=this.opacity),this.hasOwnProperty("popupTemplate")&&(a.popupTemplate=this.popupTemplate?this.popupTemplate.clone():this.popupTemplate),this.hasOwnProperty("renderer")&&(a.renderer=this.renderer?this.renderer.clone():this.renderer),this.hasOwnProperty("source")&&v.isDataLayerSource(this.source)&&(a.dynamicDataSource=f.clone(this.source)),this.hasOwnProperty("title")&&(a.title=this.title),[2,a]}})})},n.prototype.queryFeatures=function(r,t){var i=this;return void 0===r&&(r=this.createQuery()),h.all([h.create(function(r){return e(["../../tasks/operations/query"],r)}),h.create(function(r){return e(["../../tasks/support/FeatureSet"],r)})]).then(function(e){var n=e[0].executeQuery,o=e[1];return n(i.url,_.from(r),t).then(function(e){return o.fromJSON(e.data)})}).then(function(e){return e&&e.features&&e.features.forEach(function(e){e.sourceLayer=i}),e})},n.prototype.toExportImageJSON=function(){var e={id:this.id,source:v.sourceToJSON(this.source)};if(this.definitionExpression&&(e.definitionExpression=this.definitionExpression),this.renderer||this.labelingInfo||null!=this.opacity||null!=this.labelsVisible){var r=e.drawingInfo={};this.renderer&&(r.renderer=this.renderer.toJSON()),null!=this.labelsVisible&&(r.showLabels=this.labelsVisible),!1!==this.labelsVisible&&this.labelingInfo&&(r.labelingInfo=this.labelingInfo.map(function(e){return e.write({},{origin:"service"})}),r.showLabels=!0),null!=this.opacity&&(r.transparency=100-100*this.opacity,this._assignDefaultSymbolColors(r.renderer))}return e},n.prototype._assignDefaultSymbolColors=function(e){this._forEachSimpleMarkerSymbols(e,function(e){e.color||"esriSMSX"!==e.style&&"esriSMSCross"!==e.style||(e.outline&&e.outline.color?e.color=e.outline.color:e.color=[0,0,0,0])})},n.prototype._forEachSimpleMarkerSymbols=function(e,r){if(e){for(var t=("uniqueValueInfos"in e?e.uniqueValueInfos:"classBreakInfos"in e?e.classBreakInfos:[]),i=0,n=t;i<n.length;i++){var o=n[i];x(o.symbol)&&r(o.symbol)}"symbol"in e&&x(e.symbol)&&r(e.symbol),"defaultSymbol"in e&&x(e.defaultSymbol)&&r(e.defaultSymbol)}},n.prototype._setAndNotifyLayer=function(e,r){var t,i=this.layer,n=this._get(e);switch(e){case"definitionExpression":t="supportsSublayerDefinitionExpression";case"minScale":case"maxScale":case"visible":t="supportsSublayerVisibility";break;case"labelingInfo":case"labelsVisible":case"opacity":case"renderer":case"source":t="supportsDynamicLayers"}if(t&&!1===this.get("layer.capabilities.exportMap."+t))return void this._logLockedError(e);this._set(e,r),n!==r&&i&&i.emit&&i.emit("sublayer-update",{propertyName:e})},n.prototype._handleSublayersChange=function(e,r){var t=this;r&&(r.forEach(function(e){e.parent=null,e.layer=null}),this._sublayersHandles.forEach(function(e){return e.remove()}),this._sublayersHandles=null),e&&(e.forEach(function(e){e.parent=t,e.layer=t.layer}),this._sublayersHandles=[e.on("after-add",function(e){var r=e.item;r.parent=t,r.layer=t.layer}),e.on("after-remove",function(e){var r=e.item;r.parent=null,r.layer=null}),e.on("before-changes",function(e){var r=t.get("layer.capabilities.exportMap.supportsSublayersChanges");null==r||r||(E.error(new y("sublayer:sublayers-non-modifiable","Sublayer can't be added, moved, or removed from the layer's sublayers",{layer:t})),e.preventDefault())})])},n.prototype._logLockedError=function(e){E.error(new y("sublayer:locked","Property '"+e+"' can't be changed on Sublayer from the layer '"+this.layer.id+"'",{sublayer:this,layer:this.layer}))};var c;return i([g.property({type:String,value:null,json:{read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],n.prototype,"definitionExpression",null),i([g.property({type:Number,json:{write:{ignoreOrigin:!0}}})],n.prototype,"id",null),i([g.property({value:null,type:[O],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo"},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],n.prototype,"labelingInfo",null),i([g.writer("labelingInfo")],n.prototype,"writeLabelingInfo",null),i([g.property({type:Boolean,json:{read:{source:"showLabels"},write:{target:"showLabels"}}})],n.prototype,"labelsVisible",null),i([g.writer("labelsVisible")],n.prototype,"writeLabelsVisible",null),i([g.property({value:null})],n.prototype,"layer",null),i([g.property(S.legendEnabled)],n.prototype,"legendEnabled",null),i([g.property({type:["show","hide","hide-children"],value:"show",json:{read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],n.prototype,"listMode",null),i([g.property({type:Number,value:0,json:{write:{overridePolicy:function(e,r,t){if(w.willPropertyWrite(this,"maxScale",{},t))return{ignoreOrigin:!0}}}}})],n.prototype,"minScale",null),i([g.reader("portal-item","minScale",["minScale","layerDefinition.minScale"])],n.prototype,"readMinScale",null),i([g.writer("minScale")],n.prototype,"writeMinScale",null),i([g.property({type:Number,value:0,json:{write:{overridePolicy:function(e,r,t){if(w.willPropertyWrite(this,"minScale",{},t))return{ignoreOrigin:!0}}}}})],n.prototype,"maxScale",null),i([g.reader("portal-item","maxScale",["maxScale","layerDefinition.maxScale"])],n.prototype,"readMaxScale",null),i([g.writer("maxScale")],n.prototype,"writeMaxScale",null),i([g.property({type:Number,json:{write:{target:"layerDefinition.drawingInfo.transparency"}}})],n.prototype,"opacity",null),i([g.reader("opacity",["layerDefinition.drawingInfo.transparency","layerDefinition.transparency"])],n.prototype,"readOpacity",null),i([g.writer("opacity")],n.prototype,"writeOpacity",null),i([g.property({json:{type:Number,write:{target:"parentLayerId",allowNull:!0}}})],n.prototype,"parent",void 0),i([g.writer("parent")],n.prototype,"writeParent",null),i([g.property(S.popupEnabled)],n.prototype,"popupEnabled",null),i([g.property({value:null,type:l,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],n.prototype,"popupTemplate",null),i([g.property({types:s.rendererTypes,value:null,json:{write:{target:"layerDefinition.drawingInfo.renderer"}}})],n.prototype,"renderer",null),i([g.reader("renderer",["layerDefinition.drawingInfo.renderer"])],n.prototype,"readRenderer",null),i([g.writer("renderer")],n.prototype,"writeRenderer",null),i([g.writer("web-scene","renderer",{"layerDefinition.drawingInfo.renderer":{types:s.webSceneRendererTypes}})],n.prototype,"writeWebSceneRenderer",null),i([g.property({cast:v.castSource,json:{read:{source:"layerDefinition.source",reader:v.sourceFromJSON},write:{target:"layerDefinition.source"}}})],n.prototype,"source",null),i([g.writer("source")],n.prototype,"writeSource",null),i([g.property({value:null,json:{type:[m.Integer],write:{target:"subLayerIds",allowNull:!0}}})],n.prototype,"sublayers",null),i([g.cast("sublayers")],n.prototype,"castSublayers",null),i([g.writer("sublayers")],n.prototype,"writeSublayers",null),i([g.property({type:String,value:null,json:{read:{source:"name"},write:{target:"name",allowNull:!0,ignoreOrigin:!0}}})],n.prototype,"title",null),i([g.writer("title")],n.prototype,"writeTitle",null),i([g.property({type:String,dependsOn:["layer","source"],json:{read:{source:"layerUrl"},write:{target:"layerUrl",overridePolicy:function(){return{enabled:this._isOverridden("url")}}}}})],n.prototype,"url",null),i([g.property({type:Boolean,value:!0,json:{read:{source:"defaultVisibility"},write:{target:"defaultVisibility"}}})],n.prototype,"visible",null),i([g.writer("visible")],n.prototype,"writeVisible",null),n=c=i([g.subclass("esri.layers.support.Sublayer")],n)}(g.declared(c.JSONSupport))});