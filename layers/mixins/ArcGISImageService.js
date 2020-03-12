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

//  copyright

/**
                 * The copyright text as defined by the service.
                 *
                 * @name copyright
                 * @type {string}
                 * @memberof module:esri/layers/mixins/ArcGISImageService
                 *
                 */

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../geometry","../../Graphic","../../rasterRenderers","../../request","../../core/Error","../../core/jsonMap","../../core/lang","../../core/Logger","../../core/maybe","../../core/promiseUtils","../../core/urlUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../support/commonProperties","../support/DimensionalDefinition","../support/ExportImageServiceParameters","../support/Field","../support/FieldsIndex","../support/imageryRendererUtils","../support/MosaicRule","../support/PixelBlock","../support/RasterFunction","../support/RasterInfo","../support/RasterJobHandler","../support/rasterFormats/RasterCodec","../../renderers/support/RasterSymbolizer","../../tasks/ImageServiceIdentifyTask","../../tasks/QueryTask","../../tasks/support/FeatureSet","../../tasks/support/ImageServiceIdentifyParameters","../../tasks/support/Query"],function(e,t,r,n,i,a,o,s,l,u,p,c,d,f,y,h,m,g,v,R,b,x,I,S,w,_,O,P,F,T,N,J,D,C,j,M,V,q){function z(e){return e?JSON.stringify(e).match(/"rasterFunction":"(.*?")/gi).map(function(e){return e.replace('"rasterFunction":"',"").replace('"',"")}).join("/"):null}Object.defineProperty(t,"__esModule",{value:!0});var A=y.getLogger("esri.layers.mixins.ArcGISImageService"),E=d.strict()({RSP_NearestNeighbor:"nearest",RSP_BilinearInterpolation:"bilinear",RSP_CubicConvolution:"cubic",RSP_Majority:"majority"}),U=d.strict()({esriNoDataMatchAny:"any",esriNoDataMatchAll:"all"}),H=d.strict()({U1:"u1",U2:"u2",U4:"u4",U8:"u8",S8:"s8",U16:"u16",S16:"s16",U32:"u32",S32:"s32",F32:"f32",F64:"f64",C64:"c64",C128:"c128",UNKNOWN:"unknown"});t.ArcGISImageService=function(e){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._functionRasterInfos={},t._rasterJobHandler={instance:null,refCount:0,connectionPromise:null},t._symbolizer=null,t._defaultServiceMosaicRule=null,t.rasterAttributeTableFieldPrefix="Raster.",t.adjustAspectRatio=null,t.bandCount=null,t.bandIds=void 0,t.capabilities=null,t.compressionQuality=void 0,t.compressionTolerance=.01,t.copyright=null,t.definitionExpression=null,t.exportImageServiceParameters=null,t.rasterInfo=null,t.fields=null,t.fullExtent=null,t.hasMultidimensions=!1,t.imageMaxHeight=4100,t.imageMaxWidth=4100,t.interpolation=void 0,t.multidimensionalInfo=null,t.noData=null,t.noDataInterpretation=void 0,t.objectIdField=null,t.pixelSizeX=null,t.pixelSizeY=null,t.pixelFilter=null,t.raster=void 0,t.viewId=void 0,t.renderer=null,t.rasterAttributeTable=null,t.rasterFunctionInfos=null,t.serviceDataType=null,t.spatialReference=null,t.pixelType=null,t.serviceRasterInfo=null,t.sourceJSON=null,t.url=null,t.version=null,t}return n(t,e),t.prototype.initialize=function(){this._set("exportImageServiceParameters",new I.ExportImageServiceParameters({layer:this}))},t.prototype.readDefaultServiceMosaicRule=function(e,t){return O.fromJSON(t)},Object.defineProperty(t.prototype,"rasterFunctionNamesIndex",{get:function(){var e=new Map;return!this.rasterFunctionInfos||this.rasterFunctionInfos.length<1?e:(this.rasterFunctionInfos.forEach(function(t){e.set(t.name.toLowerCase().replace(/ /gi,"_"),t.name)}),e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"queryTask",{get:function(){return new j({url:this.url})},enumerable:!0,configurable:!0}),t.prototype.readCapabilities=function(e){return e&&e.split(",").map(function(e){return e.trim()})},t.prototype.writeCompressionQuality=function(e,t,r){null!=e&&"lerc"!==this.format&&(t[r]=e)},t.prototype.writeCompressionTolerance=function(e,t,r){"lerc"===this.format&&null!=e&&(t[r]=e)},Object.defineProperty(t.prototype,"fieldsIndex",{get:function(){return this.fields?new w(this.fields):null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"format",{get:function(){return this._get("format")||(null!=this.pixelFilter?"lerc":"jpgpng")},set:function(e){e&&["png","png8","png24","png32","jpg","bmp","jpgpng","lerc","tiff"].indexOf(e.toLowerCase())>-1&&this._set("format",e.toLowerCase())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mosaicRule",{set:function(e){var t=e;t&&t.mosaicMethod&&(t=O.fromJSON(r({},t.toJSON(),{mosaicMethod:t.mosaicMethod,mosaicOperation:t.mosaicOperation}))),this._set("mosaicRule",t)},enumerable:!0,configurable:!0}),t.prototype.readMosaicRule=function(e,t){return O.fromJSON(e||t.mosaicRule||t)},t.prototype.writeMosaicRule=function(e,t,r){var n=this.mosaicRule,i=this.definitionExpression;n?i&&i!==n.where&&(n=n.clone(),n.where=i):i&&(n=new O({where:i})),this._isValidCustomizedMosaicRule(n)&&(t[r]=n.toJSON())},t.prototype.writeNoData=function(e,t,r){null!=e&&"number"==typeof e&&(t[r]=e)},t.prototype.readObjectIdField=function(e,t){if(!e){var r=t.fields.filter(function(e){return"esriFieldTypeOID"===e.type||"oid"===e.type});e=r&&r[0]&&r[0].name}return e},Object.defineProperty(t.prototype,"parsedUrl",{get:function(){return this.url?g.urlToObject(this.url):null},enumerable:!0,configurable:!0}),t.prototype.readRenderer=function(e,t,r){var n=t&&t.layerDefinition&&t.layerDefinition.drawingInfo&&t.layerDefinition.drawingInfo.renderer,i=u.read(n,r)||void 0;if(null!=i)return _.isSupportedRendererType(i)||A.warn("ArcGISImageService","Imagery layer doesn't support given renderer type."),i},Object.defineProperty(t.prototype,"rasterFields",{get:function(){var e=this.rasterAttributeTableFieldPrefix||"Raster.",t=new S({name:"Raster.ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:"string"}),r=new S({name:"Raster.ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:"string"}),n=new S({name:"Raster.ServicePixelValue.Raw",alias:"Raw Service Pixel Value",domain:null,editable:!1,length:50,type:"string"}),i=this.fields?f.clone(this.fields):[];i.push(r),this.capabilities&&this.capabilities.some(function(e){return"catalog"===e.toLowerCase()})&&this.fields&&this.fields.length>0&&i.push(t),this.version>=10.4&&this.rasterFunctionInfos&&this.rasterFunctionInfos.some(function(e){return"none"===e.name.toLowerCase()})&&i.push(n),this.rasterFunctionInfos&&this.rasterFunctionInfos.filter(function(e){return"none"!==e.name.toLowerCase()}).forEach(function(e){i.push(new S({name:"Raster.ServicePixelValue."+e.name,alias:e.name,domain:null,editable:!1,length:50,type:"string"}))}),null==this.pixelFilter||"esriImageServiceDataTypeVector-UV"!==this.serviceDataType&&"esriImageServiceDataTypeVector-MagDir"!==this.serviceDataType||(i.push(new S({name:"Raster.Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"double"})),i.push(new S({name:"Raster.Direction",alias:"Direction",domain:null,editable:!1,type:"double"})));var a=this.rasterInfo.attributeTable&&this.rasterInfo.attributeTable.fields||null;if(a&&a.length>0){var o=a.filter(function(e){return"esriFieldTypeOID"!==e.type&&"value"!==e.name.toLowerCase()}).map(function(t){var r=f.clone(t);return r.name=e+t.name,r});i=i.concat(o)}return i},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderingRule",{set:function(e){var t=e;t&&t.rasterFunction&&(t=F.fromJSON(r({},t.toJSON(),{rasterFunction:t.rasterFunction,rasterFunctionArguments:t.rasterFunctionArguments}))),this._set("renderingRule",t)},enumerable:!0,configurable:!0}),t.prototype.readRenderingRule=function(e,t){var r=t.rasterFunctionInfos;return t.renderingRule||r&&r.length&&"None"!==r[0].name?F.fromJSON(t.renderingRule||{rasterFunctionInfos:t.rasterFunctionInfos}):null},t.prototype.writeRenderingRule=function(e,t,r){this._isRFTJson(e)||(t[r]=e.toJSON())},t.prototype.readSpatialReference=function(e,t){var r=e||t.extent.spatialReference;return r?s.SpatialReference.fromJSON(r):null},t.prototype.readPixelType=function(e){return H.fromJSON(e)||e},t.prototype.writePixelType=function(e,t,r){(h.isNone(this.serviceRasterInfo)||this.pixelType!==this.serviceRasterInfo.pixelType)&&(t[r]=H.toJSON(e))},t.prototype.readVersion=function(e,t){var r=t.currentVersion;return r||(r=t.hasOwnProperty("fields")||t.hasOwnProperty("timeInfo")?10:9.3),r},t.prototype.applyFilter=function(e){var t=e;return this.pixelFilter&&(t=this._clonePixelData(e),this.pixelFilter(t)),t},t.prototype.applyRenderer=function(e,t){return o(this,void 0,void 0,function(){var r,n,i,o;return a(this,function(a){switch(a.label){case 0:return r=e,this._isPicture()||!this.renderer||!this._symbolizer||this.pixelFilter?[3,5]:(n=JSON.stringify(this._cachedRendererJson)!==JSON.stringify(this.renderer.toJSON()),(i=this._rasterJobHandler.instance)?n?(this._cachedRendererJson=this.renderer.toJSON(),this._symbolizer.bind(),[4,i.updateSymbolizer(this._symbolizer,t)]):[3,2]:[3,4]);case 1:a.sent(),a.label=2;case 2:return[4,i.symbolize(e.pixelBlock,t)];case 3:return o=a.sent(),r={extent:e.extent,pixelBlock:o},[3,5];case 4:r={extent:e.extent,pixelBlock:this._symbolizer.symbolize(e.pixelBlock)},a.label=5;case 5:return[2,r]}})})},t.prototype.destroy=function(){this._shutdownJobHandler()},t.prototype.increaseRasterJobHandlerUsage=function(){this._rasterJobHandler.refCount++},t.prototype.decreaseRasterJobHandlerUsage=function(){--this._rasterJobHandler.refCount<=0&&this._shutdownJobHandler()},t.prototype.fetchImage=function(e,t,r,n){var i=this;if(void 0===n&&(n={}),null==e||null==t||null==r)return m.reject(new c("imagery-layer:fetch-image","Insufficient parameters for requesting an image. A valid extent, width and height values are required."));var a=this.renderer||this._symbolizer?this.generateRasterInfo(this.renderingRule,{signal:n.signal}):null;return m.when(a).then(function(a){a&&(i.rasterInfo=a);var o=i.getExportImageServiceParameters(e,t,r,n.timeExtent),s={imageServiceParameters:o,imageProps:{extent:e,width:t,height:r,format:i.format},requestAsImageElement:n.requestAsImageElement&&!i.pixelFilter||!1,signal:n.signal};return i._requestArrayBuffer(s)})},t.prototype.fetchKeyProperties=function(e){var t=e&&e.renderingRule&&e.renderingRule.toJSON();return p(this.parsedUrl.path+"/keyProperties",{query:this._getQueryParams({renderingRule:this.version>=10.3&&t?JSON.stringify(t):null})}).then(function(e){return e.data})},t.prototype.fetchRasterAttributeTable=function(e){var t=e&&e.renderingRule&&e.renderingRule.toJSON();return this.version<10.1?m.reject(new c("#fetchRasterAttributeTable()","Failed to get rasterAttributeTable")):p(this.parsedUrl.path+"/rasterAttributeTable",{query:this._getQueryParams({renderingRule:this.version>=10.3&&t?JSON.stringify(t):null})}).then(function(e){return M.fromJSON(e.data)})},t.prototype.getCatalogItemRasterInfo=function(e,t){return o(this,void 0,void 0,function(){var n,i,o,l,u;return a(this,function(a){switch(a.label){case 0:return n=p(this.parsedUrl.path+"/"+e+"/info",r({query:this._getQueryParams(),responseType:"json"},t)).then(function(e){return e.data}),i=p(this.parsedUrl.path+"/"+e+"/info/keyProperties",r({query:this._getQueryParams(),responseType:"json"},t)).then(function(e){return e.data}).catch(function(){}),[4,m.all([n,i])];case 1:return o=a.sent(),o[0]?(l=s.Extent.fromJSON(o[0].extent),u=o[0].statistics?o[0].statistics.map(function(e){return{min:e[0],max:e[1],avg:e[2],stddev:e[3]}}):null,[2,new T({bandCount:o[0].bandCount,extent:l,spatialReference:l.sr,pixelSize:new s.Point({x:o[0].pixelSizeX,y:o[0].pixelSizeY,spatialReference:l.sr}),pixelType:o[0].pixelType.toLowerCase(),statistics:u,histograms:o[0].histograms,keyProperties:o[1]})]):[2,void 0]}})})},t.prototype.getCatalogItemICSInfo=function(e,t){return o(this,void 0,void 0,function(){var n,i,o,l,u,c,d,f,y,h,g,v,R,b,x,I,S,w,_,O,P,F,T,N,J,R,D,C,j,M;return a(this,function(a){switch(a.label){case 0:return[4,p(this.parsedUrl.path+"/"+e+"/info/ics",r({query:this._getQueryParams(),responseType:"json"},t))];case 1:if(n=a.sent().data,!(i=n&&n.ics))return[2,void 0];if(o=this.version>=10.7?p(this.parsedUrl.path+"/"+e+"/info/icstopixel",r({query:this._getQueryParams(),responseType:"json"},t)).then(function(e){return e.data}).catch(function(){return{}}):{},!(l=i.extent.spatialReference))for(u in i.geodataXform)i.geodataXform[u].spatialReference&&(l=i.geodataXform[u].spatialReference);for(c={geometries:JSON.stringify({geometryType:"esriGeometryEnvelope",geometries:[i.extent]}),inSR:l.wkid||l,outSR:"0:"+e},d=p(this.parsedUrl.path+"/project",r({query:this._getQueryParams(c),responseType:"json"},t)).then(function(e){return e.data}),f=5,y=(i.extent.xmin+i.extent.xmax)/2,h=(i.extent.ymax-i.extent.ymin)/(f+1),g=i.extent.ymin+h,v=[],R=0;R<f;R++)v.push({x:y,y:g+h*R});return b={geometries:JSON.stringify({geometryType:"esriGeometryPoint",geometries:v}),inSR:l.wkid||l,outSR:"0:"+e},x=p(this.parsedUrl.path+"/project",r({query:this._getQueryParams(b),responseType:"json"},t)).then(function(e){return e.data}),[4,m.all([o,d,x])];case 2:for(I=a.sent(),S=I[0].ipxf,null==S&&(w=i.geodataXform&&i.geodataXform.xf_0)&&"topup"===w.name.toLowerCase()&&(S={affine:{name:"ics [sensor: Frame] to pixel (column, row) transformation",coefficients:w.coefficients,cellsizeRatio:0,type:"GeometricXform"}}),_=s.Extent.fromJSON(I[1]&&I[1].geometries&&I[1].geometries[0]),_&&(_.spatialReference=new s.SpatialReference({wkid:0,imageCoordinateSystem:i})),O=I[2].geometries.filter(function(e){return null!=e}),P=O.length,F=0,T=0,N=0,J=0,R=0;R<P;R++)F+=O[R].x,T+=O[R].y,N+=O[R].x*O[R].x,J+=O[R].x*O[R].y;return D=(P*J-F*T)/(P*N-F*F),C=0,j=O[f-1].x>O[0].x,M=O[f-1].y>O[0].y,D===1/0?C=M?90:270:0===D?C=j?0:180:D>0?C=j?180*Math.atan(D)/Math.PI:180*Math.atan(D)/Math.PI+180:D<0&&(C=M?180+180*Math.atan(D)/Math.PI:360+180*Math.atan(D)/Math.PI),[2,{ics:i,icsToPixelTransform:S,icsExtent:_,northDirection:C}]}})})},t.prototype.generateRasterInfo=function(e,t){return o(this,void 0,void 0,function(){var r,n,i;return a(this,function(a){switch(a.label){case 0:if((!e||"none"===e.functionName.toLowerCase())&&h.isSome(this.serviceRasterInfo))return[2,this.serviceRasterInfo];if(r=z(e),this._functionRasterInfos[r])return[2,this._functionRasterInfos[r]];n=this._generateRasterInfo(e,t),this._functionRasterInfos[r]=n,a.label=1;case 1:return a.trys.push([1,3,,4]),[4,n];case 2:return[2,a.sent()];case 3:return i=a.sent(),this._functionRasterInfos[r]=null,[2,null];case 4:return[2]}})})},t.prototype.getExportImageServiceParameters=function(e,t,n,i){e=e.clone().shiftCentralMeridian();var a,o=e.spatialReference;if(o.imageCoordinateSystem){var s=o.imageCoordinateSystem,l=s.id,u=s.referenceServiceName;a=null!=l?u?this.parsedUrl.path.toLowerCase().indexOf("/"+u.toLowerCase()+"/")>-1?"0:"+l:JSON.stringify({icsid:l,icsns:u}):"0:"+l:JSON.stringify({ics:o.imageCoordinateSystem})}else a=o.wkid||JSON.stringify(o.toJSON());h.isSome(this.serviceRasterInfo)&&this.pixelType!==this.serviceRasterInfo.pixelType&&(this.exportImageServiceParameters.pixelType=this.pixelType);var p=this.exportImageServiceParameters.toJSON(),c=p.bandIds,d=p.noData,f=p.mosaicRule,y=p.renderingRule;c instanceof Array&&c.length>0&&(p.bandIds=c.join(",")),d instanceof Array&&d.length>0&&(p.noData=d.join(","));var m=this.timeInfo;f&&f.multidimensionalDefinition&&i&&m&&m.startField&&(f.multidimensionalDefinition=f.multidimensionalDefinition.filter(function(e){return e.dimensionName!==m.startField})),p.mosaicRule=f&&JSON.stringify(f),p.renderingRule=y&&JSON.stringify(y);var g={};if(i){var v=i.toJSON(),R=v.start,b=v.end;R&&b&&R===b?g.time=""+R:null==R&&null==b||(g.time=(null==R?"null":R)+","+(null==b?"null":b))}return r({bbox:e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:a,imageSR:a,size:t+","+n},p,g)},t.prototype.queryRasters=function(e){return this.queryTask.execute(e)},t.prototype.queryVisibleRasters=function(e,t){var r=this;if(!e)return m.reject(new c("imagery-layer: query-visible-rasters","missing query parameter"));var n=t||{pixelSize:null,returnDomainValues:!1,returnTopmostRaster:!1,showNoDataRecords:!1},i=n.pixelSize,a=n.returnDomainValues,o=n.returnTopmostRaster,l=n.showNoDataRecords,u=!1,p=null,d=null,f=this.rasterFunctionNamesIndex;if(e.outFields&&this.version>=10.4){var y=e.outFields.filter(function(e){return e.toLowerCase().indexOf("raster.servicepixelvalue")>-1&&e.length>"raster.servicepixelvalue".length}).map(function(e){var t=e.slice("raster.servicepixelvalue".length+1);return[r._updateRenderingRulesFunctionName(t,f),t]});p=y.map(function(e){return new F({functionName:e[0]})}),d=y.map(function(e){return e[1]}),u=e.outFields.some(function(e){return-1===e.toLowerCase().indexOf("raster.servicepixelvalue")}),0===p.length&&(p=null)}var h=!e.outSpatialReference||e.outSpatialReference.equals(this.spatialReference),g=this._getQueryParams({geometry:e.geometry,timeExtent:e.timeExtent,mosaicRule:this.exportImageServiceParameters.mosaicRule,renderingRule:this.renderingRule,renderingRules:p,pixelSize:i,returnCatalogItems:u,returnGeometry:h,maxItemCount:o?1:null});delete g.f;var v=new V(g),R=new C({url:this.url}),b=this.generateRasterInfo(this.renderingRule);return m.create(function(t){b.then(function(){R.execute(v).then(function(n){var i=e.outFields;if(u&&!h&&n.catalogItems&&n.catalogItems.features&&n.catalogItems.features.length>0){var o=r.objectIdField||"ObjectId",p=n.catalogItems.features,f=p.map(function(e){return e.attributes&&e.attributes[o]}),y=new q({objectIds:f,returnGeometry:!0,outSpatialReference:e.outSpatialReference,outFields:[o]});return r.queryRasters(y).then(function(u){u&&u.features&&u.features.length>0&&u.features.forEach(function(t){p.forEach(function(r){r.attributes[o]===t.attributes[o]&&(r.geometry=new s.Polygon(t.geometry),r.geometry.spatialReference=e.outSpatialReference)})}),t(r._processVisibleRastersResponse(n,{returnDomainValues:a,templateRRFunctionNames:d,showNoDataRecords:l,templateFields:i}))}).catch(function(){throw new c("imagery-layer:query-visible-rasters","encountered error when querying visible rasters geometry")})}t(r._processVisibleRastersResponse(n,{returnDomainValues:a,templateRRFunctionNames:d,showNoDataRecords:l,templateFields:i}))}).catch(function(){throw new c("imagery-layer:query-visible-rasters","encountered error when querying visible rasters")})})})},t.prototype._fetchService=function(e){return o(this,void 0,void 0,function(){var t,r,n,i,o,s,l=this;return a(this,function(a){switch(a.label){case 0:return t=this.sourceJSON,t?[3,2]:[4,p(this.parsedUrl.path,{query:this._getQueryParams(),responseType:"json",signal:e})];case 1:r=a.sent(),n=r.data,i=r.ssl,t=n,this.sourceJSON=t,i&&(this.url=this.url.replace(/^http:/i,"https:")),a.label=2;case 2:return this.read(t,{origin:"service",url:this.parsedUrl}),h.isSome(this.serviceRasterInfo)&&!this.rasterInfo&&(this.rasterInfo=this.serviceRasterInfo),o=h.isSome(this.serviceRasterInfo)?m.resolve(this.serviceRasterInfo):this._fetchAuxiliaryRasterInfo({serviceInfo:t,signal:e}).then(function(e){return l._set("serviceRasterInfo",e),e}),s=this.renderingRule&&"none"!==this.renderingRule.functionName.toLowerCase()?this.generateRasterInfo(this.renderingRule,{signal:e}):null,[2,m.all([o,s]).then(function(e){e[1]?l._set("rasterInfo",e[1]):l._set("rasterInfo",e[0]),l._configDefaultRenderer(),l.watch("renderer",function(){return l._configDefaultRenderer()}),l.watch("renderingRule",function(e){(l.renderer||l._symbolizer||l.popupEnabled&&l.popupTemplate)&&l.generateRasterInfo(e).then(function(e){e&&(l.rasterInfo=e)})});var t=h.isSome(l.serviceRasterInfo)&&l.serviceRasterInfo.multidimensionalInfo;t&&l._updateMultidimensionalDefinition(t)})]}})})},t.prototype._initJobHandler=function(){return o(this,void 0,void 0,function(){var e,t=this;return a(this,function(r){switch(r.label){case 0:return null!=this._rasterJobHandler.connectionPromise?[2,this._rasterJobHandler.connectionPromise]:(e=new N,this._rasterJobHandler.connectionPromise=e.initialize().then(function(){t._rasterJobHandler.instance=e},function(){return null}),[4,this._rasterJobHandler.connectionPromise]);case 1:return r.sent(),[2]}})})},t.prototype._shutdownJobHandler=function(){this._rasterJobHandler.instance&&this._rasterJobHandler.instance.destroy(),this._rasterJobHandler.instance=null,this._rasterJobHandler.connectionPromise=null,this._rasterJobHandler.refCount=0},t.prototype._isPicture=function(){return!this.format||this.format.indexOf("jpg")>-1||this.format.indexOf("png")>-1},t.prototype._configDefaultRenderer=function(){if(!this._isPicture()&&!this.pixelFilter){if(!this.bandIds&&this.rasterInfo.bandCount>=3){var e=_.getDefaultBandCombination(this.rasterInfo);!e||3===this.rasterInfo.bandCount&&0===e[0]&&1===e[1]&&2===e[2]||(this.bandIds=e)}this.renderer||(this.renderer=_.createDefaultRenderer(this.rasterInfo,this.bandIds)),this._symbolizer?(this._symbolizer.renderer=this.renderer,this._symbolizer.rasterInfo=this.rasterInfo):this._symbolizer=new D({renderer:this.renderer,rasterInfo:this.rasterInfo}),this._symbolizer.bind()||(this._symbolizer=null)}},t.prototype._clonePixelData=function(e){return null==e?e:{extent:e.extent&&e.extent.clone(),pixelBlock:e.pixelBlock&&e.pixelBlock.clone()}},t.prototype._getQueryParams=function(e){var t=this,n=t.raster,i=t.viewId;return r({raster:n,viewId:i,f:"json"},e)},t.prototype._decodePixelBlock=function(e,t,r){return this._rasterJobHandler.instance?this._rasterJobHandler.instance.decode({data:e,options:t}):J.decode(e,t,r)},t.prototype._fetchAuxiliaryRasterInfo=function(e){var t=e&&e.serviceInfo;if(!t)return m.reject(new c("imagery-layer:fetch-metadata","valid serviceInfo is required"));var r=e.renderingRule?JSON.stringify(e.renderingRule.toJSON()):null,n=e.signal,i=!!(t.hasRasterAttributeTable&&this.version>=10.1)&&p(this.parsedUrl.path+"/rasterAttributeTable",{query:this._getQueryParams({renderingRule:this.version>=10.1?r:null}),signal:n}).then(function(e){return M.fromJSON(e.data)}).catch(function(){return null}),a=!!(t.hasColormap&&this.version>=10.1)&&p(this.parsedUrl.path+"/colormap",{query:this._getQueryParams({renderingRule:this.version>=10.6?r:null}),signal:n}).then(function(e){return e.data&&e.data.colormap}),o=!!(t.hasHistograms&&this.version>=10.1)&&p(this.parsedUrl.path+"/histograms",{query:this._getQueryParams({renderingRule:this.version>=10.1?r:null}),signal:n}).then(function(e){return e.data&&e.data.histograms}),l=this.version>=10.3&&p(this.parsedUrl.path+"/keyProperties",{query:this._getQueryParams({renderingRule:r}),signal:n}).then(function(e){return e.data}).catch(function(){}),u=!!(t.hasMultidimensions&&this.version>=10.3)&&p(this.parsedUrl.path+"/multidimensionalInfo",{query:this._getQueryParams(),signal:n}).then(function(e){return e.data&&e.data.multidimensionalInfo});return m.all([i,a,o,l,u]).then(function(e){var r=null;if(t.minValues&&t.minValues.length===t.bandCount){r=[];for(var n=0;n<t.minValues.length;n++)r.push({min:t.minValues[n],max:t.maxValues[n],avg:t.meanValues[n],stddev:t.stdvValues[n]})}var i=s.SpatialReference.fromJSON(t.spatialReference||t.extent.spatialReference);return new T({bandCount:t.bandCount,extent:s.Extent.fromJSON(t.extent),spatialReference:i,pixelSize:new s.Point({x:t.pixelSizeX,y:t.pixelSizeY,spatialReference:i}),pixelType:t.pixelType.toLowerCase(),statistics:r,attributeTable:e[0]||null,colormap:e[1]||null,histograms:e[2]||null,keyProperties:e[3]||null,multidimensionalInfo:e[4]||null})})},t.prototype._requestArrayBuffer=function(e){var t=this,n=e.imageProps,i=e.requestAsImageElement,a=e.signal;if(i&&!this.pixelFilter&&n.format&&n.format.indexOf("png")>-1)return p(this.parsedUrl.path+"/exportImage",{responseType:"image",query:this._getQueryParams(r({f:"image"},e.imageServiceParameters)),signal:a}).then(function(e){return{imageElement:e.data,params:n}});var o=this._initJobHandler(),s=p(this.parsedUrl.path+"/exportImage",{responseType:"array-buffer",query:this._getQueryParams(r({f:"image"},e.imageServiceParameters)),signal:a});return m.all([s,o]).then(function(e){var i=e[0].data,o=n.format||"jpgpng",s=o;if("bsq"!==s&&"bip"!==s&&(s=J.getFormat(i)),!s){throw new c("imagery-layer:fetch-image","unsupported format signature "+String.fromCharCode.apply(null,new Uint8Array(i)))}var l=o.indexOf("png")>-1&&("png"===s||"jpg"===s),u={signal:a};return l?J.decode(i,r({useCanvas:!0},n),u).then(function(e){return{pixelData:{pixelBlock:e,extent:n.extent},params:n}}):t._decodePixelBlock(i,{width:n.width,height:n.height,planes:null,pixelType:null,noDataValue:null,format:o},u).then(function(e){return{pixelData:{pixelBlock:e,extent:n.extent},params:n}})})},t.prototype._generateRasterInfo=function(e,t){return o(this,void 0,void 0,function(){var n,i;return a(this,function(a){switch(a.label){case 0:return[4,p(this.parsedUrl.path,r({query:this._getQueryParams({renderingRule:e}),responseType:"json"},t))];case 1:return n=a.sent().data,[4,this._fetchAuxiliaryRasterInfo(r({serviceInfo:n,renderingRule:e},t))];case 2:return i=a.sent(),[2,i]}})})},t.prototype._isValidCustomizedMosaicRule=function(e){return e&&JSON.stringify(e.toJSON())!==JSON.stringify(this._defaultServiceMosaicRule&&this._defaultServiceMosaicRule.toJSON())},t.prototype._updateMultidimensionalDefinition=function(e){if(!this._isValidCustomizedMosaicRule(this.mosaicRule)){var t=e.variables[0].dimensions,r=[];for(var n in t)if(t.hasOwnProperty(n)){var i=t[n],a=i.extent,o=!0,s=[a[0]];i.hasRanges&&!0===i.hasRanges?(o=!1,s=[i.values[0]]):"stdz"===i.name.toLowerCase()&&Math.abs(a[1])<=Math.abs(a[0])&&(s=[a[1]]),r.push(new x({variableName:"",dimensionName:t[n].name,isSlice:o,values:s}))}if(r.length>0){this.mosaicRule=this.mosaicRule||new O;var l=this.mosaicRule.multidimensionalDefinition;(!l||l&&l.length<=0)&&(this.mosaicRule.multidimensionalDefinition=r)}}},t.prototype._processVisibleRastersResponse=function(e,t){t=t||{};var r=e.value,n=t.templateRRFunctionNames,i=t.showNoDataRecords,a=t.returnDomainValues,o=t.templateFields,s=e.processedValues,u=e.catalogItems&&e.catalogItems.features,p=e.properties&&e.properties.Values&&e.properties.Values.map(function(e){return e.replace(/ /gi,", ")})||[],c=this.objectIdField||"ObjectId",d=r.toLowerCase().indexOf("nodata")>-1,f=[];if(r&&!u&&!d){var y={};y[c]=0;var h=new l(this.fullExtent,null,y);p=[r],u=[h]}if(!u)return[];this._updateResponseFieldNames(u,o);for(var m,g,v=0;v<u.length;v++){if(m=u[v],null!=r&&!d){if(g=p[v],"nodata"===g.toLowerCase()&&!i)continue;m.attributes["Raster.ItemPixelValue"]=g,m.attributes["Raster.ServicePixelValue"]=r,this._updateFeatureWithMagDirValues(m,g),this._updateFeatureWithRasterAttributeTableValues(m,this.renderingRule?r:g)}if(m.sourceLayer=this,a&&this._updateFeatureWithDomainValues(m),n&&s&&n.length===s.length)for(var R=0;R<n.length;R++)m.attributes["Raster.ServicePixelValue."+n[R]]=s[R];f.push(u[v])}return f},t.prototype._updateFeatureWithRasterAttributeTableValues=function(e,t){var r=this,n=this.rasterInfo&&this.rasterInfo.attributeTable,i=n&&n.features;if(i){var a=n.fields,o=a.map(function(e){return e.name}).filter(function(e){return"value"===e.toLowerCase()}),s=o&&o[0];if(s){var l=i.filter(function(e){return e.attributes[s]===(null!=t?parseInt(t,10):null)});l&&l[0]&&a.forEach(function(t){e.attributes[r.rasterAttributeTableFieldPrefix+t.name]=l[0].attributes[t.name]})}}},t.prototype._updateFeatureWithMagDirValues=function(e,t){if(this.pixelFilter&&("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)){var r=t.replace(" ",",").split(",").map(function(e){return parseFloat(e)}),n=r.map(function(e){return[e]}),i=r.map(function(e){return{minValue:e,maxValue:e,noDataValue:null}}),a=new P({height:1,width:1,pixelType:"f32",pixels:n,statistics:i});this.pixelFilter({pixelBlock:a,extent:new s.Extent(0,0,0,0,this.spatialReference)}),e.attributes["Raster.Magnitude"]=a.pixels[0][0],e.attributes["Raster.Direction"]=a.pixels[1][0]}},t.prototype._updateFeatureWithDomainValues=function(e){var t=this.fields&&this.fields.filter(function(e){return e.domain&&"coded-value"===e.domain.type});null!=t&&t.forEach(function(t){var r=e.attributes[t.name];if(null!=r){var n=t.domain.codedValues.filter(function(e){return e.code===r})[0];n&&(e.attributes[t.name]=n.name)}})},t.prototype._updateResponseFieldNames=function(e,t){if(t&&!(t.length<1)){var r=this.fieldsIndex;r&&e.forEach(function(e){if(e&&e.attributes)for(var n=0,i=t;n<i.length;n++){var a=i[n];if(r.has(a)){var o=r.get(a).name;o!==a&&(e.attributes[a]=e.attributes[o],delete e.attributes[o])}}})}},t.prototype._updateRenderingRulesFunctionName=function(e,t){if(e&&!(e.length<1)){if("Raw"===e)return e.replace("Raw","None");var r=e.toLowerCase().replace(/ /gi,"_");return t.has(r)?t.get(r):e}},t.prototype._isRFTJson=function(e){return e.name&&e.arguments&&e.function&&e.hasOwnProperty("functionType")},i([v.property()],t.prototype,"_functionRasterInfos",void 0),i([v.property()],t.prototype,"_rasterJobHandler",void 0),i([v.property()],t.prototype,"_symbolizer",void 0),i([v.property()],t.prototype,"_defaultServiceMosaicRule",void 0),i([v.reader("_defaultServiceMosaicRule",["defaultMosaicMethod"])],t.prototype,"readDefaultServiceMosaicRule",null),i([v.property()],t.prototype,"_cachedRendererJson",void 0),i([v.property()],t.prototype,"rasterAttributeTableFieldPrefix",void 0),i([v.property({readOnly:!0,dependsOn:["rasterFunctionInfos"]})],t.prototype,"rasterFunctionNamesIndex",null),i([v.property({readOnly:!0,dependsOn:["url"]})],t.prototype,"queryTask",null),i([v.property()],t.prototype,"adjustAspectRatio",void 0),i([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.bandCount")],t.prototype,"bandCount",void 0),i([v.property({type:[R.Integer],json:{write:!0}})],t.prototype,"bandIds",void 0),i([v.property({readOnly:!0})],t.prototype,"capabilities",void 0),i([v.reader("capabilities")],t.prototype,"readCapabilities",null),i([v.property({type:Number})],t.prototype,"compressionQuality",void 0),i([v.writer("compressionQuality")],t.prototype,"writeCompressionQuality",null),i([v.property({type:Number})],t.prototype,"compressionTolerance",void 0),i([v.writer("compressionTolerance")],t.prototype,"writeCompressionTolerance",null),i([v.property({json:{read:{source:"copyrightText"}}})],t.prototype,"copyright",void 0),i([v.property({type:String,json:{read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],t.prototype,"definitionExpression",void 0),i([v.property({readOnly:!0,constructOnly:!0})],t.prototype,"exportImageServiceParameters",void 0),i([v.property()],t.prototype,"rasterInfo",void 0),i([v.property({readOnly:!0,type:[S]})],t.prototype,"fields",void 0),i([v.property({readOnly:!0,dependsOn:["fields"]})],t.prototype,"fieldsIndex",null),i([v.property({type:String,json:{write:!0}})],t.prototype,"format",null),i([v.property({type:s.Extent})],t.prototype,"fullExtent",void 0),i([v.property({readOnly:!0})],t.prototype,"hasMultidimensions",void 0),i([v.property({json:{read:{source:"maxImageHeight"}}})],t.prototype,"imageMaxHeight",void 0),i([v.property({json:{read:{source:"maxImageWidth"}}})],t.prototype,"imageMaxWidth",void 0),i([v.property({type:String,json:{read:{reader:E.read},write:{writer:E.write}}})],t.prototype,"interpolation",void 0),i([v.property({type:O})],t.prototype,"mosaicRule",null),i([v.reader("mosaicRule",["mosaicRule","defaultMosaicMethod"])],t.prototype,"readMosaicRule",null),i([v.writer("mosaicRule")],t.prototype,"writeMosaicRule",null),i([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.multidimensionalInfo")],t.prototype,"multidimensionalInfo",void 0),i([v.property()],t.prototype,"noData",void 0),i([v.writer("noData")],t.prototype,"writeNoData",null),i([v.property({type:String,json:{read:{reader:U.read},write:{writer:U.write}}})],t.prototype,"noDataInterpretation",void 0),i([v.property({type:String,readOnly:!0,json:{read:{source:["fields"]}}})],t.prototype,"objectIdField",void 0),i([v.reader("objectIdField")],t.prototype,"readObjectIdField",null),i([v.property({readOnly:!0,dependsOn:["url"]})],t.prototype,"parsedUrl",null),i([v.property({readOnly:!0
}),v.aliasOf("serviceRasterInfo.pixelSize.x")],t.prototype,"pixelSizeX",void 0),i([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.pixelSize.y")],t.prototype,"pixelSizeY",void 0),i([v.property({type:Function})],t.prototype,"pixelFilter",void 0),i([v.property()],t.prototype,"raster",void 0),i([v.property()],t.prototype,"viewId",void 0),i([v.property({types:u.rasterRendererTypes,json:{read:{source:"layerDefinition.drawingInfo.renderer"},write:{target:"layerDefinition.drawingInfo.renderer"}}})],t.prototype,"renderer",void 0),i([v.reader("renderer")],t.prototype,"readRenderer",null),i([v.property(b.opacityDrawingInfo)],t.prototype,"opacity",void 0),i([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.attributeTable")],t.prototype,"rasterAttributeTable",void 0),i([v.property({readOnly:!0,dependsOn:["fields","rasterInfo"]})],t.prototype,"rasterFields",null),i([v.property({readOnly:!0})],t.prototype,"rasterFunctionInfos",void 0),i([v.property({type:F})],t.prototype,"renderingRule",null),i([v.reader("renderingRule",["renderingRule","rasterFunctionInfos"])],t.prototype,"readRenderingRule",null),i([v.writer("renderingRule")],t.prototype,"writeRenderingRule",null),i([v.property()],t.prototype,"serviceDataType",void 0),i([v.property({readOnly:!0,type:s.SpatialReference})],t.prototype,"spatialReference",void 0),i([v.reader("spatialReference",["spatialReference","extent"])],t.prototype,"readSpatialReference",null),i([v.property()],t.prototype,"pixelType",void 0),i([v.reader("pixelType")],t.prototype,"readPixelType",null),i([v.writer("pixelType")],t.prototype,"writePixelType",null),i([v.property({constructOnly:!0,type:T})],t.prototype,"serviceRasterInfo",void 0),i([v.property()],t.prototype,"sourceJSON",void 0),i([v.property(b.url)],t.prototype,"url",void 0),i([v.property({readOnly:!0})],t.prototype,"version",void 0),i([v.reader("version",["currentVersion","fields","timeInfo"])],t.prototype,"readVersion",null),t=i([v.subclass("esri.layers.mixins.ArcGISImageService")],t)}(v.declared(e))}});