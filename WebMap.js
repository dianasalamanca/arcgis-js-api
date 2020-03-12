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

define(["require","exports","./core/tsSupport/assignHelper","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/tsSupport/generatorHelper","./core/tsSupport/awaiterHelper","./core/tsSupport/paramHelper","./kernel","./Map","./Viewpoint","./core/arrayUtils","./core/Collection","./core/Error","./core/JSONSupport","./core/Loadable","./core/loadAll","./core/Logger","./core/maybe","./core/Promise","./core/promiseUtils","./core/urlUtils","./core/watchUtils","./core/accessorSupport/decorators","./core/accessorSupport/originUtils","./core/accessorSupport/read","./geometry/SpatialReference","./geometry/support/webMercatorUtils","./layers/support/arcgisLayerUrl","./portal/Portal","./portal/PortalItem","./portal/support/portalItemUtils","./tasks/support/ProjectParameters","./webdoc/RangeInfo","./webdoc/Widgets","./webdoc/support/thumbnailUtils","./webdoc/support/writeUtils","./webmap/ApplicationProperties","./webmap/Bookmark","./webmap/InitialViewProperties","./webmap/Version","./webmap/background/ColorBackground","@dojo/framework/shim/Promise"],function(e,t,r,o,i,n,a,s,p,l,u,c,h,d,y,m,f,g,w,b,v,_,S,I,A,O,P,V,U,T,L,F,W,R,C,N,j,E,x,M,J,K){var k=new J.default(2,16),B=h.ofType(x),G=g.getLogger("esri.WebMap"),D=new Map;D.set("image/jpeg","jpeg"),D.set("image/jpg","jpg"),D.set("image/png","png"),D.set("image/gif","gif");var H=["NatGeo_World_Map","Ocean_Basemap","USA_Topo_Maps","World_Imagery","World_Street_Map","World_Terrain_Base","World_Topo_Map","World_Hillshade","Canvas/World_Light_Gray_Base","Canvas/World_Light_Gray_Reference","Canvas/World_Dark_Gray_Base","Canvas/World_Dark_Gray_Reference","Ocean/World_Ocean_Base","Ocean/World_Ocean_Reference","Reference/World_Boundaries_and_Places","Reference/World_Reference_Overlay","Reference/World_Transportation"].map(function(e){return e.toLowerCase()});return function(t){function s(e){var r=t.call(this,e)||this;return r.applicationProperties=null,r.bookmarks=new B,r.initialViewProperties=new M,r.portalItem=null,r.presentation=null,r.sourceVersion=null,r.tables=null,r.widgets=null,r.authoringApp=r.authoringAppVersion=null,r._isAuthoringAppSetByUser=r._isAuthoringAppVersionSetByUser=!1,r}return o(s,t),s.prototype.initialize=function(){if(this.when().catch(function(e){G.error("#load()","Failed to load web map",e)}),this.resourceInfo){var e=void 0;try{e=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(v.reject(e))}this.read(e)}},Object.defineProperty(s.prototype,"authoringApp",{set:function(e){this._isAuthoringAppSetByUser=!0,this._set("authoringApp",e)},enumerable:!0,configurable:!0}),s.prototype.writeAuthoringApp=function(e,t){e&&this._isAuthoringAppSetByUser?t.authoringApp=e:t.authoringApp="ArcGIS API for JavaScript"},Object.defineProperty(s.prototype,"authoringAppVersion",{set:function(e){this._isAuthoringAppVersionSetByUser=!0,this._set("authoringAppVersion",e)},enumerable:!0,configurable:!0}),s.prototype.writeAuthoringAppVersion=function(e,t){e&&this._isAuthoringAppVersionSetByUser?t.authoringAppVersion=e:t.authoringAppVersion=p.version},s.prototype.readInitialViewProperties=function(e,t){var r=new M;return t.background&&(r.background=K.fromJSON(t.background)),t.mapRangeInfo&&(r.rangeInfo=R.fromJSON(t.mapRangeInfo)),t.spatialReference&&(r.spatialReference=P.fromJSON(t.spatialReference)),r},s.prototype.writeInitialViewProperties=function(e,t,r,o){if(e){var i=e.background;i&&i.color&&(t.background=i.write(null,o)),e.rangeInfo&&(t.mapRangeInfo=e.rangeInfo.toJSON(o)),e.spatialReference&&(t.spatialReference=e.spatialReference.write(null,o))}},s.prototype.writeLayers=function(e,t,o,i){var n=this;i=r({},i,{layerContainerType:"operational-layers"});var a=e.map(function(e){return j.getLayerJSON(e,n._getLayerJSONFromResourceInfo(e),i)}).filter(function(e){return!!e});t[o]=a.toArray()},s.prototype.readSourceVersion=function(e,t){var r=t.version.split("."),o=r[0],i=r[1];return new J.default(parseInt(o,10),parseInt(i,10))},s.prototype.writeSourceVersion=function(e,t,r){t[r]=k.major+"."+k.minor},Object.defineProperty(s.prototype,"thumbnailUrl",{get:function(){return this.portalItem&&this.portalItem.thumbnailUrl||null},set:function(e){e?(this._override("thumbnailUrl",e),this._thumbnailFilename=this._generateCustomThumbnailFilename(e)):this._clearThumbnailOverride()},enumerable:!0,configurable:!0}),s.prototype.load=function(e){return this.addResolvingPromise(this._loadFromSource()),this.when()},s.prototype.loadAll=function(){var e=this;return f.loadAll(this,function(t){t(e.ground,e.basemap,e.layers)})},s.prototype.read=function(e,t){var o=this;t=r({},t,{origin:"web-map"});var i=this._getAuthoringPropsState(),n=arguments;O.readLoadable(this,e,function(t){return o.inherited(n,[e,t])},t),this._restoreAuthoringPropsFromState(i)},s.prototype.write=function(e,t){if("loaded"!==this.loadStatus){var o=new d("webmap:not-loaded","Web map must be loaded before it can be serialized");throw G.error("#toJSON()","Web map must be loaded before it can be serialized",this.loadError||this.loadStatus),o}return this._removeDanglingLayerRefs(),t=r({},t,{origin:"web-map",restrictedWebMapWriting:!0}),this.inherited(arguments,[e,t])},s.prototype.save=function(e){return a(this,void 0,void 0,function(){var t,r,o;return n(this,function(i){switch(i.label){case 0:return e=e||{},this._validateItem(),[4,this._updateFromPromise];case 1:return i.sent(),[4,this.load()];case 2:return i.sent(),[4,this._loadLayerContainers()];case 3:return i.sent(),t=this.portalItem,r={origin:"web-map",messages:[],writtenProperties:[],url:t.itemUrl&&_.urlToObject(t.itemUrl),portal:t.portal||T.getDefault()},o=this.write(null,r),this._validateJSONForWriting(r,e),[4,this._updateItemProperties(t)];case 4:return i.sent(),[4,this._updateItem(t,o,r)];case 5:return i.sent(),[4,this._updateItemThumbnail()];case 6:return i.sent(),[2,t]}})})},s.prototype.saveAs=function(e,t){return a(this,void 0,void 0,function(){var r,o,i,a;return n(this,function(n){switch(n.label){case 0:return t=t||{},r=this._getPortalItem(e),[4,this._updateFromPromise];case 1:return n.sent(),[4,this.load()];case 2:return n.sent(),[4,this._loadLayerContainers()];case 3:return n.sent(),o={origin:"web-map",messages:[],writtenProperties:[],url:null,portal:r.portal},i=this.write(null,o),this._validateJSONForWriting(o,t),[4,this._updateItemPropertiesForSaveAs(r)];case 4:return n.sent(),a=this._getThumbnailState(),[4,this._createItem(r,i,o,t)];case 5:return n.sent(),this._restoreThumbnailFromState(a),[4,this._updateItemThumbnail()];case 6:return n.sent(),[2,r]}})})},s.prototype.updateFrom=function(e,t){return a(this,void 0,void 0,function(){var r,o;return n(this,function(i){switch(i.label){case 0:return r=this._updateFromInternal(e,t),this._updateFromPromise=r,[4,r];case 1:return i.sent(),o=r===this._updateFromPromise,o&&(this._updateFromPromise=null),[2]}})})},s.prototype._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-map"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):v.resolve(null)},s.prototype._loadFromItem=function(e){var t=this;return e.load().catch(function(e){throw new d("webmap:load-portal-item","Failed to load portal item",{error:e})}).then(function(){if("Web Map"!==e.type)throw new d("webmap:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Map'",{type:e.type})}).then(function(){return e.fetchData()}).then(function(r){return t.resourceInfo=r,t._readAndLoadFromJSON(r,{origin:"web-map",portal:e.portal||T.getDefault()})}).then(function(){return t._getInitialExtent()}).then(function(e){if(e){var r=t.initialViewProperties?t.initialViewProperties.clone():new M;r.viewpoint=new u,r.viewpoint.targetGeometry=e,t.initialViewProperties=r}})},s.prototype._readAndLoadFromJSON=function(e,t){var r=this._validateJSON(e);return this.read(r,t),this._loadFromJSON(r,t)},s.prototype._validateJSON=function(e){var t=J.default.parse(e.version||"","webmap");return k.validate(t),e.version=t.major+"."+t.minor,e},s.prototype._loadFromJSON=function(t,o){var i=this,n={context:r({},o,{layerContainerType:"operational-layers"})};return this.portalItem&&(n.context.portal=this.portalItem.portal||T.getDefault()),v.create(function(t){return e(["./portal/support/layersCreator"],t)}).then(function(e){var r=[],o=t.operationalLayers;return o&&o.length&&r.push(e.populateOperationalLayers(i.layers,o,n)),v.eachAlways(r).then(function(){})})},s.prototype._getInitialExtent=function(){return a(this,void 0,void 0,function(){var t,r,o;return n(this,function(i){switch(i.label){case 0:return t=this.initialViewProperties&&this.initialViewProperties.spatialReference,r=this.portalItem&&this.portalItem.extent,t&&r?t.isWGS84?[2,r.clone()]:t.isWebMercator?[2,V.geographicToWebMercator(r)]:[4,new Promise(function(t,r){e(["./portal/support/geometryServiceUtils"],t,r)})]:[3,2];case 1:return o=i.sent(),[2,o.create(this.portalItem).then(function(e){var o=new W;return o.geometries=[r],o.outSpatialReference=t,e.project(o)}).then(function(e){return e[0]}).catch(function(e){return G.error("Error projecting item's extent:",e),null})];case 2:return[2,null]}})})},s.prototype._getLayerJSONFromResourceInfo=function(e){var t=this.get("resourceInfo.operationalLayers");return w.isSome(t)?c.find(t,function(t){return t.id===e.id}):null},s.prototype._removeDanglingLayerRefs=function(){var e=this,t=function(t){return!!e.allLayers.find(function(e){return e.id===t})},r=this.applicationProperties,o=r&&r.viewing&&r.viewing.search;o&&o.layers&&(o.layers=o.layers.filter(function(e){return t(e.id)}));var i=r&&r.editing&&r.editing.locationTracking;i&&i.info&&!t(i.info.layerId)&&(r.editing=null);var n=this.presentation&&this.presentation.slides;n&&n.forEach(function(e){e.visibleLayers&&(e.visibleLayers=e.visibleLayers.filter(function(e){return t(e.id)}))})},s.prototype._validateItem=function(){if(!this.portalItem)throw G.error("save: requires the portalItem property to be set"),new d("webmap:portal-item-not-set","Portal item to save to has not been set on the WebMap");this._validateItemType(this.portalItem)},s.prototype._validateItemType=function(e){if("Web Map"!==e.type)throw new d("webmap:portal-item-wrong-type",'Portal item needs to have type "Web Map"')},s.prototype._loadLayerContainers=function(){var e=[];return this.basemap&&e.push(this.basemap.load()),this.ground&&e.push(this.ground.load()),v.eachAlways(e).then(function(){})},s.prototype._loadAllLayers=function(){var e=this.allLayers.map(function(e){return e.load()});return v.eachAlways(e).then(function(){})},s.prototype._validateJSONForWriting=function(e,t){var r=e.messages.filter(function(e){return"error"===e.type}).map(function(e){return new d(e.name,e.message,e.details)});if(t.ignoreUnsupported&&(r=r.filter(function(e){return"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name&&"url:unsupported"!==e.name})),r.length>0)throw new d("webmap:save","Failed to save webmap due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:r})},s.prototype._updateItemProperties=function(e){return a(this,void 0,void 0,function(){var t;return n(this,function(r){switch(r.label){case 0:return t=e,[4,this._getWGS84Extent(this.initialViewProperties.viewpoint.targetGeometry)];case 1:return t.extent=r.sent(),[4,this._updateTypeKeywords(e)];case 2:return r.sent(),[2]}})})},s.prototype._updateItemPropertiesForSaveAs=function(e){return a(this,void 0,void 0,function(){return n(this,function(t){switch(t.label){case 0:return F.removeTypeKeyword(e,"CollectorDisabled"),F.removeTypeKeyword(e,"OfflineDisabled"),F.removeTypeKeyword(e,"Workforce Project"),[4,this._updateItemProperties(e)];case 1:return t.sent(),[2]}})})},s.prototype._getWGS84Extent=function(t){return a(this,void 0,void 0,function(){var r,o,i,a,s;return n(this,function(n){switch(n.label){case 0:return r=t.spatialReference,r.isWGS84?[2,t.clone()]:r.isWebMercator?[2,V.webMercatorToGeographic(t)]:[4,new Promise(function(t,r){e(["./portal/support/geometryServiceUtils"],t,r)})];case 1:return o=n.sent(),[4,o.create(this.portalItem)];case 2:return i=n.sent(),a=new W,a.geometries=[t],a.outSpatialReference=P.WGS84,[4,i.project(a)];case 3:return s=n.sent(),[2,s[0]]}})})},s.prototype._updateTypeKeywords=function(e){return a(this,void 0,void 0,function(){return n(this,function(t){switch(t.label){case 0:return F.addTypeKeyword(e,"ArcGIS API for JavaScript"),[4,this._loadAllLayers()];case 1:return t.sent(),this._evalCollectorKeyword(e),this._evalDataEditingKeyword(e),this._evalOfflineKeyword(e),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e,t,r){return r.indexOf(e)===t})),[2]}})})},s.prototype._evalCollectorKeyword=function(e){F.hasTypeKeyword(e,"CollectorDisabled")||F.hasTypeKeyword(e,"Workforce Project")||!this._hasEditableFeatureLayer()?F.removeTypeKeyword(e,"Collector"):F.addTypeKeyword(e,"Collector")},s.prototype._evalDataEditingKeyword=function(e){this._hasEditableFeatureLayer()?F.addTypeKeyword(e,"Data Editing"):F.removeTypeKeyword(e,"Data Editing")},s.prototype._evalOfflineKeyword=function(e){!F.hasTypeKeyword(e,"OfflineDisabled")&&this._isOfflineCapableMap()?F.addTypeKeyword(e,"Offline"):F.removeTypeKeyword(e,"Offline")},s.prototype._hasEditableFeatureLayer=function(){var e=this;return this.allLayers.some(function(t){return t.loaded&&e._isFeatureServiceLayer(t)&&t.capabilities.operations.supportsEditing&&t.editingEnabled})},s.prototype._isFeatureServiceLayer=function(e){return!("feature"!==e.type||!e.source||"feature-layer"!==e.source.type)},s.prototype._isOfflineCapableMap=function(){var e=this;return this.allLayers.every(function(t){return t.loaded&&e._isOfflineCapableLayer(t)})},s.prototype._isOfflineCapableLayer=function(e){return this._isFeatureServiceLayer(e)&&e.capabilities.operations.supportsSync||("tile"===e.type||"vector-tile"===e.type)&&(e.capabilities.operations.supportsExportTiles||this._isExportableAGOLTileLayer(e))&&e.spatialReference.equals(this.initialViewProperties.spatialReference)},s.prototype._isExportableAGOLTileLayer=function(e){return"tile"===e.type&&(U.isServerOrServicesAGOLUrl(e.url)&&H.some(function(t){return e.url.toLowerCase().indexOf("/"+t+"/")>-1}))},s.prototype._updateItem=function(e,t,r){return a(this,void 0,void 0,function(){return n(this,function(o){switch(o.label){case 0:return[4,e.update({data:t})];case 1:return o.sent(),this._syncUpInstanceWithItem(e,t,r),[2]}})})},s.prototype._createItem=function(e,t,r,o){return a(this,void 0,void 0,function(){var i,a,s;return n(this,function(n){switch(n.label){case 0:return i=this.portalItem,a=!!(i&&i.id&&i.portal.user),s=e.portal,[4,s._signIn()];case 1:return n.sent(),[4,this._canCopyItem(i,a,s)];case 2:if(!n.sent())throw new d("webmap:save-as-copy-not-allowed","Owner of this map does not allow others to save a copy");return[4,s.user.addItem({item:e,folder:o.folder,data:t})];case 3:return n.sent(),this.portalItem=e,this._syncUpInstanceWithItem(e,t,r),[2]}})})},s.prototype._canCopyItem=function(e,t,r){return a(this,void 0,void 0,function(){return n(this,function(o){switch(o.label){case 0:return w.isSome(e)&&e.id&&e.typeKeywords&&e.typeKeywords.indexOf("useOnly")>-1?e.portal.portalHostname!==r.portalHostname?[2,!1]:t?[3,2]:[4,e.reload()]:[3,3];case 1:o.sent(),o.label=2;case 2:return[2,"admin"===e.itemControl||"update"===e.itemControl];case 3:return[2,!0]}})})},s.prototype._syncUpInstanceWithItem=function(e,t,r){y.JSONSupport.prototype.read.call(this,{version:t.version,authoringApp:t.authoringApp,authoringAppVersion:t.authoringAppVersion},{origin:"web-map",ignoreDefaults:!0,url:e.itemUrl&&_.urlToObject(e.itemUrl)}),A.updateOrigins(r),this.resourceInfo=t},s.prototype._updateItemThumbnail=function(){return a(this,void 0,void 0,function(){return n(this,function(e){switch(e.label){case 0:return this.thumbnailUrl&&this._isOverridden("thumbnailUrl")?[4,this.portalItem.updateThumbnail({thumbnail:this.thumbnailUrl,filename:this._thumbnailFilename})]:[3,2];case 1:e.sent(),this._clearThumbnailOverride(),e.label=2;case 2:return[2]}})})},s.prototype._getPortalItem=function(e){var t=L.from(e);return t.id&&(t=t.clone(),t.id=null),t.type||(t.type="Web Map"),t.portal||(t.portal=T.getDefault()),this._validateItemType(t),t},s.prototype._updateFromInternal=function(e,t){return a(this,void 0,void 0,function(){return n(this,function(r){switch(r.label){case 0:return t=t||{},[4,S.whenTrueOnce(e,"ready")];case 1:return r.sent(),this._updateInitialViewProperties(e,t),[4,this._updateThumbnailUrl(e,t)];case 2:return r.sent(),[2]}})})},s.prototype._updateInitialViewProperties=function(e,t){this.initialViewProperties.spatialReference=e.spatialReference.clone(),t.viewpointExcluded||(this.initialViewProperties.viewpoint=new u({targetGeometry:this._getViewExtent(e)}))},s.prototype._getViewExtent=function(e){var t,r=e.extent.clone().normalize();if(r.length>1)for(var o=0,i=r;o<i.length;o++){var n=i[o];t?n.width>t.width&&(t=n):t=n}else t=r[0];return t},s.prototype._updateThumbnailUrl=function(e,t){return a(this,void 0,void 0,function(){var r,o;return n(this,function(i){switch(i.label){case 0:return t.thumbnailExcluded?[2]:(r=N.getOptimalThumbnailSize(e,t.thumbnailSize),[4,e.takeScreenshot({format:"png",width:r.width,height:r.height})]);case 1:return o=i.sent(),this._setAutoGeneratedThumbnail(o.dataUrl),[2]}})})},s.prototype._setAutoGeneratedThumbnail=function(e){this.thumbnailUrl=e,this._thumbnailFilename=null},s.prototype._clearThumbnailOverride=function(){this._clearOverride("thumbnailUrl"),this._thumbnailFilename=null},s.prototype._generateCustomThumbnailFilename=function(e){if(_.isDataProtocol(e)){var t=_.dataComponents(e),r=t&&t.mediaType,o=r&&D.get(r.toLowerCase())||null,i="thumbnail"+Date.now();return o?i+"."+o:i}return null},s.prototype._getThumbnailState=function(){var e=this.thumbnailUrl;return e&&(e=this._isOverridden("thumbnailUrl")?e:_.addQueryParameter(e,"w","8192")),{thumbnailUrl:e,filename:this._thumbnailFilename}},s.prototype._restoreThumbnailFromState=function(e){this.thumbnailUrl=e.thumbnailUrl,this._thumbnailFilename=e.filename},s.prototype._getAuthoringPropsState=function(){return{authoringApp:this.authoringApp,authoringAppVersion:this.authoringAppVersion,isAuthoringAppSetByUser:this._isAuthoringAppSetByUser,isAuthoringAppVersionSetByUser:this._isAuthoringAppVersionSetByUser}},s.prototype._restoreAuthoringPropsFromState=function(e){e.isAuthoringAppSetByUser?this.authoringApp=e.authoringApp:this._isAuthoringAppSetByUser=!1,e.isAuthoringAppVersionSetByUser?this.authoringAppVersion=e.authoringAppVersion:this._isAuthoringAppVersionSetByUser=!1},s.fromJSON=function(e){var t=e;if(!t)throw new d("webmap:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:t})},s.VERSION=k,i([I.property({type:E,json:{write:!0}})],s.prototype,"applicationProperties",void 0),i([I.property({type:String,json:{write:{allowNull:!0}}})],s.prototype,"authoringApp",null),i([I.writer("authoringApp")],s.prototype,"writeAuthoringApp",null),i([I.property({type:String,json:{write:{allowNull:!0}}})],s.prototype,"authoringAppVersion",null),i([I.writer("authoringAppVersion")],s.prototype,"writeAuthoringAppVersion",null),i([I.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],s.prototype,"basemap",void 0),i([I.property({type:B,json:{write:{overridePolicy:function(e){return{enabled:!!(e&&e.length>0)}}}}})],s.prototype,"bookmarks",void 0),i([I.property({type:M,nonNullable:!0,json:{read:{source:["background","mapRangeInfo","spatialReference"]},write:{target:{background:{type:K},mapRangeInfo:{type:R},spatialReference:{type:P}}}}})],s.prototype,"initialViewProperties",void 0),i([I.reader("initialViewProperties")],s.prototype,"readInitialViewProperties",null),i([I.writer("initialViewProperties")],s.prototype,"writeInitialViewProperties",null),i([I.property({json:{write:{target:"operationalLayers"}}})],s.prototype,"layers",void 0),i([I.writer("layers")],s.prototype,"writeLayers",null),i([I.property({type:L})],s.prototype,"portalItem",void 0),i([I.property({json:{write:!0}})],s.prototype,"presentation",void 0),i([I.property()],s.prototype,"resourceInfo",void 0),i([I.property({readOnly:!0,type:J.default,json:{read:{source:"version"},write:{allowNull:!0,target:"version",isRequired:!0}}})],s.prototype,"sourceVersion",void 0),i([I.reader("sourceVersion")],s.prototype,"readSourceVersion",null),i([I.writer("sourceVersion")],s.prototype,"writeSourceVersion",null),i([I.property()],s.prototype,"tables",void 0),i([I.property({dependsOn:["portalItem.thumbnailUrl"]})],s.prototype,"thumbnailUrl",null),i([I.property({type:C,json:{write:!0}})],s.prototype,"widgets",void 0),s=i([I.subclass("esri.WebMap")],s)}(I.declared(y.JSONSupportMixin(m.LoadableMixin(b.EsriPromiseMixin(l)))))});