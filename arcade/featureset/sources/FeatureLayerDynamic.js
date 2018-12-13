// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}();define(["require","exports","dojo/Deferred","../../../graphic","../../../request","../../../SpatialReference","../../../urlUtils","../support/FeatureSet","../support/IdSet","../support/shared","../support/stats","../support/sha","../../../geometry/Extent","../../../layers/FeatureType","../../../layers/Field","../../../tasks/query","../../../tasks/QueryTask","../../../tasks/StatisticDefinition","../support/cache","../../../sniff"],function(e,t,r,a,i,n,s,l,o,u,d,c,p,f,y,h,_,v,g,m){"use strict";var b=!!m("esri-pbf"),F=!!m("esri-featurelayer-pbf"),R=function(){function e(e,t,r,a){void 0===r&&(r=null),this.url=e,this.outFields=t,this.spatialReference=r,this.token=a,this._url=null,this.supportsFormatPBF=!1,this._loadPromise=null,this._queryTask=null,this.currentVersion=0,this.useStandardizedQueries=!1,this.fields=[],this._url=s.urlToObject(e)}return e.prototype._canFetchPBFForQuery=function(e){return b&&F&&this.supportsFormatPBF&&!e.outStatistics},e.prototype._loadMetaData=function(e){var t=new r;if(null!==g.applicationCache){var a=g.applicationCache.getLayerInfo(e);if(null!==a)return a}return null!==g.applicationCache&&g.applicationCache.setLayerInfo(e,t.promise),i({url:e,content:{f:"json"},callbackParamName:"callback",load:function(e){t.resolve(e)},error:function(r){null!==g.applicationCache&&g.applicationCache.clearLayerInfo(e),t.reject(r)}}),t.promise},e.prototype.load=function(){var e=this;if(null===this._loadPromise){var t=new r;this._loadPromise=t;var a=this._url.path;this._loadMetaData(a).then(function(r){try{if(e._queryTask=new _(a),e.objectIdField=r.objectIdField,!e.objectIdField)for(var i=r.fields,s=0;s<i.length;s++){var l=i[s];if("esriFieldTypeOID"===l.type){e.objectIdField=l.name;break}}if(e.globalIdField=r.globalIdField,e.geometryType=r.geometryType,e.typeIdField=r.typeIdField,e.fullExtent=new p(r.fullExtent),e.advancedQueryCapabilities=r.advancedQueryCapabilities||{supportsStatistics:r.supportsStatistics,supportsOrderBy:r.supportsAdvancedQueries,supportsDistinct:r.supportsAdvancedQueries},r.supportedQueryFormats)for(var o=0,u=r.supportedQueryFormats.split(",");o<u.length;o++){var d=u[o];if("pbf"===d.replace(/^\s+|\s+$/gm,"").toLowerCase()){e.supportsFormatPBF=!0;break}}if(!0===r.useStandardizedQueries&&(e.useStandardizedQueries=!0),void 0!==r.currentVersion&&(e.currentVersion=r.currentVersion),r.types){e.types=[];for(var c=0,h=r.types;c<h.length;c++){var v=h[c],g=new f(v);e.types.push(g)}}if(r.spatialReference&&!e.spatialReference&&(e.spatialReference=new n(r.spatialReference)),1===e.outFields.length&&"*"===e.outFields[0])for(var m=0,b=r.fields;m<b.length;m++){var v=b[m],F=new y(v);e.fields.push(F)}else for(var R=0,k=r.fields;R<k.length;R++){var v=k[R];if("esriFieldTypeOID"===v.type){var F=new y(v);e.fields.push(F)}else{for(var S=!1,C=0,w=e.outFields;C<w.length;C++){var x=w[C];if(v.name.toUpperCase()===x.toUpperCase()){S=!0;break}}if(S){var F=new y(v);e.fields.push(F)}}}e.definitionExpression="",t.resolve(e)}catch(e){t.reject(e)}},function(e){t.reject(e)})}return this._loadPromise.promise},e.prototype.queryIds=function(e){var t=new r;return this._queryTask.executeForIds(e,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},e}();return function(e){function t(t){var r=e.call(this,t)||this;return r._layer=null,r._removeGeometry=!1,r.formulaCredential=null,r._pageJustIds=!1,r._requestStandardised=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._layer=new R(t.url,t.outFields,r.spatialReference,t.token),r._transparent=!0,r._maxProcessing=1e3,r._wset=null,void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return __extends(t,e),t.prototype.optimisePagingFeatureQueries=function(e){this._pageJustIds=e},t.prototype._maxQueryRate=function(){return u.defaultMaxRecords},t.prototype.convertQueryToLruCacheKey=function(e){var t=u.stableStringify(e.toJson());return new c(t,"TEXT").getHash("SHA-1","B64")},t.prototype.load=function(){var e=this;if(null===this._loadPromise){var t=new r;this._loadPromise=t,this._layer.load().then(function(){e._initialiseFeatureSet(),t.resolve(e)},function(e){t.reject(e)})}return this._loadPromise.promise},t.prototype._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this._layer.geometryType,void 0===this.geometryType&&(this.geometryType=""),this.fields=this._layer.fields.slice(0),!0===this._layer.useStandardizedQueries)this._databaseType=u.FeatureServiceDatabaseType.Standardised;else{var e=this._layer.currentVersion;void 0!==e&&null!==e&&e>=10.5&&(this._databaseType=u.FeatureServiceDatabaseType.Standardised,this._requestStandardised=!0)}this.objectIdField=this._layer.objectIdField,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype._isInFeatureSet=function(e){return u.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e,t){var a=new r;return a.resolve(e),a.promise},t.prototype._candidateIdTransform=function(e){return e},t.prototype._transformSetWithIdChanges=function(e){},t.prototype._getSet=function(e){var t=this,a=new r;return null===this._wset?this._ensureLoaded().then(u.callback(function(){t._getFilteredSet("",null,null,null,e).then(u.callback(function(e){t._wset=e,a.resolve(e)},a),u.errback(a))},a),u.errback(a)):a.resolve(this._wset),a.promise},t.prototype._runDatabaseProbe=function(e){var t=this,a=new r;return this._ensureLoaded().then(u.callback(function(){var r=new h;r.where=e.replace("OBJECTID",t._layer.objectIdField),t._layer.queryIds(r).then(u.callback(function(e){a.resolve(!0)},a),function(e){try{a.resolve(!1)}catch(e){a.reject(e)}})},a),u.errback(a)),a.promise},t.prototype._canUsePagination=function(){return void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsPagination},t.prototype._cacheableFeatureSetSourceKey=function(){return this._layer.url},t.prototype._getFilteredSet=function(e,t,a,i,n){var s=this,l=new r;return this.databaseType().then(u.callback(function(r){if(s.isTable()&&t&&null!==e&&""!==e){var d=new o([],[],!0,null);return void l.resolve(d)}if(s._canUsePagination())return void s._getFilteredSetUsingPaging(e,t,a,i,n).then(u.callback(function(e){l.resolve(e)},l),u.errback(l));var c="",p=!1;null!==i&&void 0!==s._layer.advancedQueryCapabilities&&null!==s._layer.advancedQueryCapabilities&&!0===s._layer.advancedQueryCapabilities.supportsOrderBy&&(c=i.constructClause(),p=!0);var f=new h;s._requestStandardised&&(f.sqlFormat="standard"),f.where=null===a?null===t?"1=1":"":a.toWhereClause(r),f.spatialRelationship=s._makeRelationshipEnum(e),f.outSpatialReference=s.spatialReference,f.orderByFields=""!==c?c.split(","):null,f.geometry=null===t?null:t,f.relationParam=s._makeRelationshipParam(e),s.executeQuery(f,"executeForIds").then(u.callback(function(e){null===e&&(e=[]),s._checkCancelled(n);var t=new o([],e,p,null);l.resolve(t)},l),u.errback(l))},l),u.errback(l)),l.promise},t.prototype._expandPagedSet=function(e,t,r,a,i){return this._expandPagedSetFeatureSet(e,t,r,a,i)},t.prototype._getFilteredSetUsingPaging=function(e,t,a,i,n){var s=this,l=new r;try{var d="",c=!1;null!==i&&void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsOrderBy&&(d=i.constructClause(),c=!0),this.databaseType().then(u.callback(function(r){var i=null===a?null===t?"1=1":"":a.toWhereClause(r);s._layer.definitionExpression&&(i=""!==i?"(("+s._layer.definitionExpression+") AND ("+i+"))":s._layer.definitionExpression);var p=s._maxQueryRate();void 0!==s._layer.maxRecordCount&&s._layer.maxRecordCount<p&&(p=s._layer.maxRecordCount);var f=null;if(!0===s._pageJustIds)f=new o([],["GETPAGES"],c,{spatialRel:s._makeRelationshipEnum(e),relationParam:s._makeRelationshipParam(e),outFields:s._layer.objectIdField,resultRecordCount:p,resultOffset:0,geometry:null===t?"":t,where:i,orderByFields:d,returnGeometry:!1,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}});else{var y=!0;!0===s._removeGeometry&&(y=!1);var h=s._fieldsIncludingObjectId(s._layer.outFields);f=new o([],["GETPAGES"],c,{spatialRel:s._makeRelationshipEnum(e),relationParam:s._makeRelationshipParam(e),outFields:h.join(","),resultRecordCount:p,resultOffset:0,geometry:null===t?"":t,where:i,orderByFields:d,returnGeometry:y,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}})}s._expandPagedSet(f,p,0,1,n).then(u.callback(function(e){l.resolve(f)},l),u.errback(l))},l),u.errback(l))}catch(e){l.reject(e)}return l.promise},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,a){var i=this,n=new r;try{var s=e.pagesDefinition.internal.lastRetrieved,l=s,o=new h;this._requestStandardised&&(o.sqlFormat="standard"),o.spatialRelationship=e.pagesDefinition.spatialRel,o.relationParam=e.pagesDefinition.relationParam,o.outFields=e.pagesDefinition.outFields.split(","),o.num=e.pagesDefinition.resultRecordCount,o.start=e.pagesDefinition.internal.lastRetrieved,o.geometry=e.pagesDefinition.geometry,o.where=e.pagesDefinition.where,o.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,o.returnGeometry=e.pagesDefinition.returnGeometry,o.outSpatialReference=this.spatialReference,this.executeQuery(o,"execute").then(u.callback(function(t){i._checkCancelled(a),e.pagesDefinition.internal.lastRetrieved!==s&&n.resolve("done");for(var r=0;r<t.features.length;r++)void 0===t.features[r].geometry&&(t.features[r].geometry=null),e.pagesDefinition.internal.set[l+r]=t.features[r].attributes[i._layer.objectIdField];if(!1===i._pageJustIds)for(var r=0;r<t.features.length;r++)i._featureCache[t.features[r].attributes[i._layer.objectIdField]]=t.features[r];t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=s+e.pagesDefinition.resultRecordCount,n.resolve("done")},n),u.errback(n))}catch(e){n.reject(e)}return n.promise},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,a=0,i=t;a<i.length;a++){if(i[a].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFeatures=function(e,t,a,i){var n=this,s=new r,l=[];try{if(-1!==t&&void 0===this._featureCache[t]&&l.push(t),!0===this._checkIfNeedToExpandKnownPage(e,this._maxProcessingRate(),i))return this._expandPagedSet(e,this._maxProcessingRate(),0,0,i).then(u.callback(function(r){n._getFeatures(e,t,a,i).then(u.callback(function(e){s.resolve(e)},s),u.errback(s))},s),u.errback(s)),s.promise;for(var o=0,d=e._lastFetchedIndex;d<e._known.length;d++){if(e._lastFetchedIndex+=1,o++,void 0===this._featureCache[e._known[d]]){var c=!1;if(null!==this._layer._mode&&void 0!==this._layer._mode){var p=this._layer._mode;if(void 0!==p._featureMap[e._known[d]]){var f=p._featureMap[e._known[d]];null!==f&&(c=!0,this._featureCache[e._known[d]]=f)}}if(!1===c&&(e._known[d]!==t&&l.push(e._known[d]),l.length>=this._maxProcessingRate()-1))break}if(o>=a&&0===l.length)break}if(0===l.length)s.resolve("success");else try{var y=new h;this._requestStandardised&&(y.sqlFormat="standard"),y.objectIds=l,y.outFields=this._fieldsIncludingObjectId(this._layer.outFields),y.returnGeometry=!0,!0===this._removeGeometry&&(y.returnGeometry=!1),y.outSpatialReference=this.spatialReference,this.executeQuery(y,"execute").then(u.callback(function(e){if(n._checkCancelled(i),void 0!==e.error)return void s.reject(new Error(e.error));for(var t=0;t<e.features.length;t++)void 0===e.features[t].geometry&&(e.features[t].geometry=null),n._featureCache[e.features[t].attributes[n._layer.objectIdField]]=e.features[t];s.resolve("success")},s),u.errback(s))}catch(e){s.reject(e)}}catch(e){s.reject(e)}return s.promise},t.prototype._layerUrl=function(){return this._layer.url},t.prototype.pbfSupportedForQuery=function(e){return this._layer._canFetchPBFForQuery(e)},t.prototype.executeQuery=function(e,t){var r=new _(this._layerUrl()),a="execute"===t&&this.pbfSupportedForQuery(e);a&&(e.quantizationParameters={mode:"edit"});var i=null;if(this.recentlyUsedQueries){var n=this.convertQueryToLruCacheKey(e);i=this.recentlyUsedQueries.getFromCache(n),i&&i.isRejected()&&(i=null,this.recentlyUsedQueries.removeFromCache(n)),null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"}),this.recentlyUsedQueries.addToCache(n,i))}return null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"})),i},t.prototype._getDistinctPages=function(e,t,a,i,n,s,l,o,d){var c=this,p=new r;return this._ensureLoaded().then(u.callback(function(){for(var r=a.parseTree.column,f=0;f<c._layer.fields.length;f++)if(c._layer.fields[f].name.toLowerCase()===r.toLowerCase()){r=c._layer.fields[f].name;break}c.databaseType().then(u.callback(function(f){var y=new h;c._requestStandardised&&(y.sqlFormat="standard");var _=null===s?null===n?"1=1":"":s.toWhereClause(f);c._layer.definitionExpression&&(_=""!==_?"(("+c._layer.definitionExpression+") AND ("+_+"))":c._layer.definitionExpression),y.where=_,y.spatialRelationship=c._makeRelationshipEnum(i),y.relationParam=c._makeRelationshipParam(i),y.geometry=null===n?null:n,y.returnDistinctValues=!0,y.returnGeometry=!1,y.outFields=[r],c.executeQuery(y,"execute").then(u.callback(function(f){if(c._checkCancelled(d),!f.hasOwnProperty("features"))return void p.reject(new Error("Unnexected Result querying statistics from layer"));for(var y=!1,h=0;h<c._layer.fields.length;h++)if(c._layer.fields[h].name===r){"esriFieldTypeDate"===c._layer.fields[h].type&&(y=!0);break}for(var h=0;h<f.features.length;h++){if(y){var _=f.features[h].attributes[r];null!==_?o.push(new Date(_)):o.push(_)}else o.push(f.features[h].attributes[r]);if(o.length>=l)break}0===f.features.length?p.resolve(o):f.features.length===c._layer.maxRecordCount&&o.length<l?c._getDistinctPages(e+f.features.length,t,a,i,n,s,l,o,d).then(u.callback(function(e){p.resolve({calculated:!0,result:e})},p),u.errback(p)):p.resolve(o)},p),u.errback(p))},p),u.errback(p))},p),u.errback(p)),p.promise},t.prototype._distinctStat=function(e,t,r,a,i,n,s,l){this._getDistinctPages(0,t,r,a,i,n,s,[],l).then(u.callback(function(t){e.resolve({calculated:!0,result:t})},e),u.errback(e))},t.prototype.isTable=function(){return null===this._layer.geometryType||""===this._layer.geometryType||void 0===this._layer.geometryType},t.prototype._countstat=function(e,t,r,a,i,n){var s=this;this.databaseType().then(u.callback(function(t){var n=new h;if(s._requestStandardised&&(n.sqlFormat="standard"),s.isTable()&&a&&null!==r&&""!==r)return void e.resolve({calculated:!0,result:0});var l=null===i?null===a?"1=1":"":i.toWhereClause(t);s._layer.definitionExpression&&(l=""!==l?"(("+s._layer.definitionExpression+") AND ("+l+"))":s._layer.definitionExpression),n.where=l,n.where=l,n.spatialRelationship=s._makeRelationshipEnum(r),n.relationParam=s._makeRelationshipParam(r),n.geometry=null===a?null:a,n.returnGeometry=!1,s.executeQuery(n,"executeForCount").then(u.callback(function(t){e.resolve({calculated:!0,result:t})},e),u.errback(e))},e),u.errback(e))},t.prototype._stats=function(e,t,r,a,i,n,s,l){var o=this;this._ensureLoaded().then(u.callback(function(){var c=o._layer.advancedQueryCapabilities&&!0===o._layer.advancedQueryCapabilities.supportsSqlExpression,p=o._layer.advancedQueryCapabilities&&!0===o._layer.advancedQueryCapabilities.supportsStatistics,f=o._layer.advancedQueryCapabilities&&!0===o._layer.advancedQueryCapabilities.supportsDistinct;"count"===t?f?o._countstat(e,t,a,i,n,l):e.resolve({calculated:!1}):!1===p||!1===r.isSingleField()&&!1===c||!1===r.isStandardized()?""!==a||null!==n?e.resolve({calculated:!1}):o._manualStat(t,r,s,l).then(u.callback(function(t){e.resolve(t)},e),u.errback(e)):"distinct"===t?!1===f?""!==a||null!==n?e.resolve({calculated:!1}):o._manualStat(t,r,s,l).then(u.callback(function(t){e.resolve(t)},e),u.errback(e)):o._distinctStat(e,t,r,a,i,n,s,l):o.databaseType().then(u.callback(function(s){if(o.isTable()&&i&&null!==a&&""!==a)return void e.resolve({calculated:!0,result:null});var l=new h;o._requestStandardised&&(l.sqlFormat="standard");var c=null===n?null===i?"1=1":"":n.toWhereClause(s);o._layer.definitionExpression&&(c=""!==c?"(("+o._layer.definitionExpression+") AND ("+c+"))":o._layer.definitionExpression),l.where=c,l.spatialRelationship=o._makeRelationshipEnum(a),l.relationParam=o._makeRelationshipParam(a),l.geometry=null===i?null:i;var p=new v;p.statisticType=d.decodeStatType(t),p.onStatisticField=r.toWhereClause(s),p.outStatisticFieldName="FORMULA_STAT_RESULT",l.returnGeometry=!1,l.outStatistics=[p],o.executeQuery(l,"execute").then(u.callback(function(t){if(!t.hasOwnProperty("features")||0===t.features.length)return void e.reject(new Error("Unnexected Result querying statistics from layer"));for(var r=!1,a=0;a<t.fields.length;a++)if("FORMULA_STAT_RESULT"===t.fields[a].name.toUpperCase()){"esriFieldTypeDate"===t.fields[a].type&&(r=!0);break}if(r){var i=t.features[0].attributes.FORMULA_STAT_RESULT;null!==i&&(i=new Date(t.features[0].attributes.FORMULA_STAT_RESULT)),e.resolve({calculated:!0,result:i})}else e.resolve({calculated:!0,result:t.features[0].attributes.FORMULA_STAT_RESULT})},e),u.errback(e))},e),u.errback(e))},e),u.errback(e))},t.prototype._stat=function(e,t,a,i,n,s,l){var o=new r;try{this._stats(o,e,t,a,i,n,s,l)}catch(e){o.reject(e)}return o.promise},t.prototype._canDoAggregates=function(e,t,a,i,n){var s=this,l=new r;return this._ensureLoaded().then(u.callback(function(e){var r=!1,a=s._layer.advancedQueryCapabilities&&!0===s._layer.advancedQueryCapabilities.supportsSqlExpression;if(void 0!==s._layer.advancedQueryCapabilities&&null!==s._layer.advancedQueryCapabilities&&!0===s._layer.advancedQueryCapabilities.supportsStatistics&&!0===s._layer.advancedQueryCapabilities.supportsOrderBy&&(r=!0),r)for(var i=0;i<t.length-1;i++)null!==t[i].workingexpr&&(!1===t[i].workingexpr.isStandardized()?r=!1:!1===t[i].workingexpr.isSingleField()&&!1===a&&(r=!1));!1===r?l.resolve(!1):l.resolve(!0)},l),u.errback(l)),l.promise},t.prototype._makeRelationshipEnum=function(e){return e.indexOf("esriSpatialRelRelation")>=0?"esriSpatialRelRelation":e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,a,i,n,s,l){var d=this,c=new r;return this._ensureLoaded().then(u.callback(function(r){d.databaseType().then(u.callback(function(r){var u="",p=!1,f=!1;null!==s&&void 0!==d._layer.advancedQueryCapabilities&&null!==d._layer.advancedQueryCapabilities&&!0===d._layer.advancedQueryCapabilities.supportsOrderBy&&(u=s.constructClause(),f=!0),void 0!==d._layer.advancedQueryCapabilities&&null!==d._layer.advancedQueryCapabilities&&!1===d._layer.advancedQueryCapabilities.supportsPagination&&(f=!1,p=!0,u=d._layer.objectIdField);for(var y=[],h=0;h<t.length;h++){var _=new v;_.onStatisticField=null!==t[h].workingexpr?t[h].workingexpr.toWhereClause(r):"",_.outStatisticFieldName=t[h].field,_.statisticType=t[h].toStatisticsName(),y.push(_)}""===u&&(u=e.join(","));var g=d._maxQueryRate();void 0!==d._layer.maxRecordCount&&d._layer.maxRecordCount<g&&(g=d._layer.maxRecordCount);var m=null===n?null===i?"1=1":"":n.toWhereClause(r);d._layer.definitionExpression&&(m=""!==m?"(("+d._layer.definitionExpression+") AND ("+m+"))":d._layer.definitionExpression);var b=new o([],["GETPAGES"],f,{groupbypage:!0,spatialRel:d._makeRelationshipEnum(a),relationParam:d._makeRelationshipParam(a),outFields:["*"],useOIDpagination:p,generatedOid:l,resultRecordCount:g,resultOffset:0,groupByFieldsForStatistics:e,outStatistics:y,geometry:null===i?null:i,where:m,orderByFields:u,returnGeometry:!1,returnIdsOnly:!1,internal:{lastMaxId:-1,set:[],lastRetrieved:0,fullyResolved:!1}});c.resolve(b)},c),u.errback(c))},c),u.errback(c)),c.promise},t.prototype._getAgregagtePhysicalPage=function(e,t,i){var n=this,s=new r;try{var l=e.pagesDefinition.where;!0===e.pagesDefinition.useOIDpagination&&(l=""!==l?"("+l+") AND ("+e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString()+")":e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString());var o=e.pagesDefinition.internal.lastRetrieved,d=o,c=new h;if(this._requestStandardised&&(c.sqlFormat="standard"),c.where=l,c.spatialRelationship=e.pagesDefinition.spatialRel,c.relationParam=e.pagesDefinition.relationParam,c.outFields=e.pagesDefinition.outFields,c.outStatistics=e.pagesDefinition.outStatistics,c.geometry=e.pagesDefinition.geometry,c.groupByFieldsForStatistics=e.pagesDefinition.groupByFieldsForStatistics,c.num=e.pagesDefinition.resultRecordCount,c.start=e.pagesDefinition.internal.lastRetrieved,c.returnGeometry=e.pagesDefinition.returnGeometry,c.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,this.isTable()&&c.geometry&&c.spatialRelationship)return s.resolve([]),s.promise;this.executeQuery(c,"execute").then(u.callback(function(t){if(n._checkCancelled(i),!t.hasOwnProperty("features"))return void s.reject(new Error("Unnexected Result querying aggregates from layer"));var r=[];if(e.pagesDefinition.internal.lastRetrieved!==o)return void s.resolve([]);for(var l=0;l<t.features.length;l++)void 0===t.features[l].geometry&&(t.features[l].geometry=null),e.pagesDefinition.internal.set[d+l]=t.features[l].attributes[e.pagesDefinition.generatedOid];for(var l=0;l<t.features.length;l++)r.push(new a({attributes:t.features[l].attributes,geometry:null}));!0===e.pagesDefinition.useOIDpagination?0===t.features.length?e.pagesDefinition.internal.fullyResolved=!0:e.pagesDefinition.internal.lastMaxId=t.features[t.features.length-1].attributes[e.pagesDefinition.generatedOid]:t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=o+e.pagesDefinition.resultRecordCount,s.resolve(r)},s),u.errback(s))}catch(e){s.reject(e)}return s.promise},t.create=function(e,r,a,i){return new t({url:e,outFields:null===r?["*"]:r,token:null!==a&&""!==a?a:null,spatialReference:i})},t.prototype.canBeBigDataFeatureSet=function(){return!0},t.prototype.shouldBeResolvedAsBigData=function(){return!1},t.prototype.expressAsArcadeScriptImpl=function(e,t,r){var a=(this.arcadeAssignNextScriptStepIdentifiers(r),this.arcadeAssignNextGlobalIdentifier(r));return t[a]={name:a,type:"FeatureLayer",params:{url:this._layer.url,token:this._layer.token,definitionExpression:this._layer.definitionExpression,fields:this._layer.outFields}},r.featuresetsyms.push(a),""},t}(l)});