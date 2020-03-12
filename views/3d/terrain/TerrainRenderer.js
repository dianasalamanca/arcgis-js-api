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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/assignHelper","../../../core/tsSupport/decorateHelper","../../../Color","../../../core/Accessor","../../../core/maybe","../../../core/ObjectPool","../../../core/PooledArray","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec2f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/vec4","../../../core/libs/gl-matrix-2/vec4f64","../../../geometry/support/aaBoundingBox","../support/imageUtils","../support/buffer/BufferView","./PatchGeometryFactory","./PatchRenderData","./TileRenderer","./tileUtils","../webgl-engine/core/shaderLibrary/ShaderOutputOptions","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/intersectorUtils","../webgl-engine/lib/screenSizePerspectiveUtils","../webgl-engine/lib/tracer","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/shaders/TerrainTechnique"],function(e,t,r,i,n,s,a,o,l,c,d,h,u,p,f,g,v,b,T,y,m,x,R,P,S,O,_,q,E,w,D,k){function A(e,t,r){return 0===e.patches.length?-r:0===t.patches.length?r:S.compareTiles(e.patches.data[0],t.patches.data[0],r)}function C(e,t,r){var i=e[0]*t[2]+t[0],n=e[1]*t[3]+t[1],s=e[2]*t[2],a=e[3]*t[3];v.vec4.set(r,i,n,s,a)}var I=p.vec2f64.create(),U=T.create(),B=b.vec4f64.create(),N=b.vec4f64.create(),M=b.vec4f64.create(),L=function(){function e(){this.extent=b.vec4f64.create(),this.minLevel=0,this.maxLevel=0,this.callback=null}return e}(),G=function(e){function t(t){var r=e.call(this,t)||this;return r.type="Terrain",r.tileSize=256,r.rctx=null,r.renderDataPool=new l(R.PatchRenderData),r.patchGroups=new c({allocator:function(e){return e||{root:null,origin:null,patches:new c}},deallocator:function(e){return e.root=null,e.origin=null,e.patches.clear(),e}}),r.patchGroupsDirty=!0,r.patchGroupsMap=new Map,r.tileIterator=new S.IteratorPreorder,r.highestVisibleLODTile=null,r.visible=!0,r._opaque=!0,r._skirtScale=1,r._renderingDisabled=!1,r._renderOrder=1,r._velvetOvergroundEnabled=!0,r._wireframeEnabled=!1,r.castShadows=!0,r.emptyTex=null,r.tileRenderer=null,r.tileBackgroundInitialized=!1,r.tileBackgroundUpdating=!1,r.stencilEnabledLayerExtents=[],r.numTrianglesRendered=0,r.numTilesRendered=0,r.numTilesCulled=0,r.numOriginsRendered=0,r.clippingExtent=null,r.needsHighlight=!1,r.visibleScaleRangeQueries=new c({initialSize:10}),r.visibleScaleRangeQueriesInvPtr=0,r.visibleScaleRangeQueryQueue=new c({initialSize:30}),r.visibleScaleRangeQueryPool=new l(L,!1),r}return r(t,e),t.prototype.destroy=function(){x.clearCaches()},t.prototype.install=function(e){e.addRenderPlugin([3,8],this),this.drapedRenderer=e.renderView.getDrapedRenderer()},t.prototype.uninstall=function(e){e.removeRenderPlugin(this)},Object.defineProperty(t.prototype,"updating",{get:function(){return!this.tileBackgroundInitialized||this.tileBackgroundUpdating},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canRender",{get:function(){return this.visible&&!!this.rootTiles&&this.tileBackgroundInitialized&&!this._renderingDisabled},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasOverlays",{get:function(){return this.shaderTechniqueConfig.hasOverlays},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderingDisabled",{set:function(e){this._renderingDisabled=!!e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"opaque",{get:function(){return this._opaque&&!this.shaderTechniqueConfig.slice},set:function(e){this._opaque!==e&&(this._opaque=e,this.setNeedsRender())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"skirtScale",{set:function(e){this._skirtScale=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderPatchBorders",{set:function(e){this.shaderTechniqueConfig.tileBorders!==e&&(this.shaderTechniqueConfig.tileBorders=e,this._updateAllProgramsAndPipelines())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cullBackFaces",{set:function(e){this.shaderTechniqueConfig.backfaceCullingEnabled!==e&&(this.shaderTechniqueConfig.backfaceCullingEnabled=e,this._updateAllProgramsAndPipelines(),this.setNeedsRender())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderOrder",{get:function(){return this._renderOrder},set:function(e){this._renderOrder=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"velvetOvergroundEnabled",{set:function(e){this._velvetOvergroundEnabled!==e&&(this._velvetOvergroundEnabled=e,this._updateAllProgramsAndPipelines())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"intersectionHandlerId",{get:function(){return q.TERRAIN_ID},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"slicePlaneEnabled",{get:function(){return this.shaderTechniqueConfig.slice},set:function(e){this.shaderTechniqueConfig.slice!==e&&(this.shaderTechniqueConfig.slice=e,this._updateAllProgramsAndPipelines())},enumerable:!0,configurable:!0}),t.prototype.setDebugScreenSizePerspective=function(e){this.shaderTechniqueConfig.screenSizePerspective!==e&&(this.shaderTechniqueConfig.screenSizePerspective=e,this._updateAllProgramsAndPipelines())},t.prototype.setRootTiles=function(e){this.rootTiles=e,this.setNeedsRender()},t.prototype.setNeedsHighlight=function(e){this.needsHighlight=e,this.setNeedsRender()},t.prototype.setStencilEnabledLayerExtents=function(e){this.stencilEnabledLayerExtents=e,this.setNeedsRender()},t.prototype.setTileSize=function(e){this.tileSize=e,this.tileRenderer&&(this.tileRenderer.tileSize=e),this.setNeedsRender()},t.prototype.loadTile=function(e){e.renderData||(e.renderData=this.renderDataPool.acquire(),e.renderData.init(e),e.renderData.localOrigin=this._getLocalOriginOfTile(e)),this.updateTileGeometry(e),this.updateTileTexture(e)},t.prototype.queryVisibleLevelRange=function(e,t,r,i){var n=this.visibleScaleRangeQueryPool.acquire();v.vec4.copy(n.extent,e),n.minLevel=t||-Number.MAX_VALUE,n.maxLevel=null!=r?r:Number.MAX_VALUE,n.callback=i,this.visibleScaleRangeQueryQueue.push(n),this.setNeedsRender()},t.prototype.updateTileTexture=function(e){this.tileRenderer&&this.tileBackgroundInitialized&&(this.tileRenderer.updateTileTexture(e),e.resetPendingUpdate(32))},t.prototype.updateTileGeometry=function(e){for(var t=0,r=e.layerInfo[0];t<r.length;t++){r[t].pendingUpdates&=-17}e.resetPendingUpdate(16),e.renderData.updateGeometry(this.rctx,this._wireframeEnabled)&&this.setNeedsRender()},t.prototype.unloadTile=function(e){e.renderData&&(e.renderData.releaseTexture(),this.releaseTileGeometry(e.renderData),e.renderData=null,e.setMemoryDirty(),this.setNeedsRender())},t.prototype._getLocalOriginOfTile=function(e){var t=Math.max(0,7*Math.floor((e.lij[0]-3)/7));if("spherical"===this.manifold&&0===t)return g.vec3f64.ZEROS;for(;e.parent&&e.lij[0]>t;)e=e.parent;return e.centerAtSeaLevel},t.prototype.setVisibility=function(e){this.visible=e,this.setNeedsRender()},t.prototype.getStats=function(){return{numTilesRendered:this.numTilesRendered,numTilesCulled:this.numTilesCulled,numTrianglesRendered:this.numTrianglesRendered,numOriginsRendered:this.numOriginsRendered}},t.prototype.setWireframe=function(e){var t=this;this._wireframeEnabled!==e&&(this._wireframeEnabled=e,this.rootTiles&&(S.traverseTilesPreorder(this.rootTiles,function(r){r.renderData&&r.renderData.updateGeometry(t.rctx,e)}),this.setNeedsRender()))},t.prototype.setNeedsRender=function(e){void 0===e&&(e=1),this.patchGroupsDirty=!0,this.initContext.requestRender(e)},t.prototype.setTileBackground=function(e){this.tileBackground=e,this._updateTileBackground()},t.prototype.initializeRenderContext=function(e){var t=this;this.initContext=e,this.rctx=e.rctx,this.shaderTechniqueRep=e.shaderTechniqueRep,this.shaderTechniqueConfig=new k.TerrainTechniqueConfiguration,this._updateAllProgramsAndPipelines(),this.shaderTechniqueRep=e.shaderTechniqueRep,this.tileRenderer=new P(this.rctx,this.tileSize,this.shaderTechniqueRep,function(){return t.setNeedsRender()}),this.tileBackground&&this._updateTileBackground(),this.emptyTex=_.createEmptyTexture(this.rctx)},t.prototype.uninitializeRenderContext=function(){null!=this.emptyTex&&(this.emptyTex.dispose(),this.emptyTex=null),this.tileRenderer&&(this.tileRenderer.dispose(),this.tileRenderer=null)},t.prototype.intersect=function(e,t,r,i){if(this.rootTiles&&(!e.options.selectOpaqueTerrainOnly||!e.options.selectionMode||this._opaque)){var n=V,s=H;f.vec3.subtract(n,i,r),f.vec3.set(s,1/n[0],1/n[1],1/n[2]);var a=e.results.min,l=e.results.max,c=e.results.terrain,d=0===e.options.store,h=null,p=this.clippingExtent,g=this.tileIterator;g.reset(this.rootTiles);for(var v=o.isSome(e.options.verticalOffset)?e.options.verticalOffset.terrain:null,b=this;!g.done;)!function(){var y=g.next();if(null===y.renderData)return"continue";if(e.options.invisibleTerrain){if(!y.visible&&p&&!y.intersectsExtent(p))return"continue"}else if(!y.visible)return"continue";var R=y.renderData.geometryInfo,P=y.renderData.localOrigin,O=-b._skirtScale*R.skirtLength;if(T.set(U,R.boundingBox),o.isSome(v)&&(v.localOrigin=P,v.applyToAABB(U)),0!==O){var _=y.up;T.expandWithOffset(U,O*_[0],O*_[1],O*_[2])}var E=U;f.vec3.subtract(F,r,P);var w=d&&null!=a.dist?a.dist:1/0;if(!D.intersectAabbInvDirBefore(E,F,s,e.tolerance,w))return"continue";var k=function(e,t,r,i){e.set(void 0,S.tile2str(t),r,i,u.mat4f64.IDENTITY,void 0),e.intersector=Y,e.target={type:"external",metadata:{tile:t}}},A=function(s,d){if(s>=0&&(e.options.backfacesTerrain||f.vec3.dot(d,n)<0)&&(e.options.invisibleTerrain||!e.options.selectionMode||null==t||t(r,i,s))){if((null==c.dist||s<c.dist)&&k(c,y,s,d),!e.options.storeTerrainResults)return;2===e.options.store&&(o.isNone(h)?(h=new q.IntersectorResult(e.ray),k(h,y,s,d),e.results.all.push(h)):s<h.dist&&k(h,y,s,d)),(null==a.dist||s<a.dist)&&k(a,y,s,d),0!==e.options.store&&(null==l.dist||s>l.dist)&&k(l,y,s,d)}},C=W;f.vec3.subtract(C,i,P);var I=R.indices,B=R.vertexAttributes,N=B.getField("position",m.BufferViewVec3f),M={data:N.typedBuffer,size:3,offsetIdx:0,strideIdx:B.stride/4},L=R.numWithoutSkirtIndices/3;if(D.intersectTriangles(F,C,0,L,I,M,null,v,A),0!==O){var G="spherical"===b.manifold?function(e){return f.vec3.scale(e,e,O/f.vec3.length(e))}:function(e){return f.vec3.set(e,0,0,O)},Q=I.length/3;x.intersectSkirts(F,C,L,Q,I,B,G,v,A)}}()}},t.prototype.render=function(e){var t=this.opaque?3:8;if(e.slot!==t)return!1;w.trace("# BEGIN RENDER TERRAIN");var r=e.pass,i=1===e.scenelightingData.globalFactor,n=this._updatePatchGroups();switch(Q.overlayEnabled=!1,Q.used=!0,r){case 0:Q.overlayEnabled=!0,Q.used=!1;var s=e.shadowMap&&e.shadowMap.enabled;this.shaderTechniqueConfig.receiveShadows!==s&&(this.shaderTechniqueConfig.receiveShadows=s,this._updateAllProgramsAndPipelines());var a=!this.drapedRenderer.isEmpty();this.shaderTechniqueConfig.hasOverlays!==a&&(this.shaderTechniqueConfig.hasOverlays=a,this._updateAllProgramsAndPipelines()),this._renderMaterialPass(e,0,n,Q);break;case 3:this.castShadows&&i&&this._renderAuxiliaryPass(e,3,n,Q);break;case 1:this._renderAuxiliaryPass(e,1,n,Q);break;case 2:this._renderAuxiliaryPass(e,2,n,Q);break;case 4:this.needsHighlight&&(Q.overlayEnabled=!0,this._renderAuxiliaryPass(e,4,n,Q),e.rctx.clearSafe(256))}return w.trace("# END RENDER TERRAIN"),0!==this.visibleScaleRangeQueryQueue.length&&this.setNeedsRender(),!0},t.prototype._renderMaterialPass=function(e,t,r,i){var n=this,s=e.rctx,a=e.camera;this._setTerrainTechnique(t);var o=this.shaderTechnique.program;e.rctx.bindProgram(o),s.bindProgram(o),e.shadowMap&&e.shadowMap.bind(o),e.ssaoHelper&&e.ssaoHelper.setUniforms(o),o.setUniform1i("tex",0),this._bindOverlayUniforms(o),o.setUniformMatrix4fv("viewNormal",a.viewInverseTransposeMatrix),o.setUniformMatrix4fv("proj",a.projectionMatrix),e.scenelightingData.setUniforms(o,!0);var l=a.viewMatrix;f.vec3.set(j,l[12],l[13],l[14]),f.vec3.normalize(j,j),o.setUniform3fv("viewDirection",j),this.numTilesRendered=0,this.numTilesCulled=0,this.numTrianglesRendered=0,this.numOriginsRendered=0,this._prepareScaleRangeQueries(),this.opaque?this._renderPatchGroups(e,o,r,i):e.offscreenRenderingHelper.renderToTargets(function(){return n._renderPatchGroups(e,o,r,i)},e.offscreenRenderingHelper.tmpColor,e.offscreenRenderingHelper.mainDepth,[0,0,0,0]),this._processScaleRangeQueries()},t.prototype._renderAuxiliaryPass=function(e,t,r,i){this._setTerrainTechnique(t);var n=this.shaderTechnique.program;if(e.rctx.bindProgram(n),4===e.pass){var s=e.offscreenRenderingHelper;e.rctx.bindTexture(s.depthTexture,5),n.setUniform1i("depthTex",5),n.setUniform4f("highlightViewportPixelSz",0,0,1/s.width,1/s.height)}else n.setUniformMatrix4fv("viewNormal",e.camera.viewInverseTransposeMatrix),1!==e.pass&&3!==e.pass||(I[0]=e.camera.near,I[1]=e.camera.far,n.setUniform2fv("nearFar",I));this._renderPatchGroupsAuxiliary(e,n,r,i)},t.prototype._updateTileBackground=function(){var e=this;if(this.tileRenderer){this.tileBackgroundUpdating=!0;var t=function(){e.tileBackgroundInitialized=!0,e.tileBackgroundUpdating=!1,e.rootTiles&&S.traverseTilesPreorder(e.rootTiles,function(t){return e.tileRenderer.updateTileTexture(t)}),e.setNeedsRender()};if("string"==typeof this.tileBackground){var r=this.tileBackground;y.requestImage(r).then(function(i){r===e.tileBackground&&e.tileRenderer&&(e.tileRenderer.setBackground(i),t())})}else{var i=this.tileBackground?s.toUnitRGBA(this.tileBackground):[0,0,0,0];this.tileRenderer.setBackground(i),t()}}},t.prototype._updatePatchGroups=function(){var e=this,t=this.patchGroups;if(!this.patchGroupsDirty)return t;if(this.highestVisibleLODTile=null,this._renderCollectOrigins(t),0!==this.renderOrder){for(var r=0;r<t.length;r++)S.sortTiles(this.renderOrder,t.data[r].patches);t.sort(function(t,r){return A(t,r,e.renderOrder)})}return this.patchGroupsDirty=!1,t},t.prototype._renderCollectOrigins=function(e){var t=this.rootTiles,r="spherical"===this.manifold;e.clear();for(var i=0,n=t;i<n.length;i++){var s=n[i],a=e.pushNew();a.root=s,a.origin=r?g.vec3f64.ZEROS:s.centerAtSeaLevel,a.patches.clear(),this._renderCollectOriginsForRoot(e,a)}e.filterInPlace(function(e){return e.patches.length>0})},t.prototype._renderCollectOriginsForRoot=function(e,t){var r=this.tileIterator;r.resetOne(t.root);var i=this.patchGroupsMap;for(i.clear(),i.set(t.origin,t);!r.done;){var n=r.next(),s=n.renderData;if(!s||n.visible){if(n.lij[0]%7==0){var a=e.pushNew();a.root=n,a.origin=n.centerAtSeaLevel,i.set(n.centerAtSeaLevel,a),a.patches.clear()}if(n.rendered){if(s){var a=i.get(s.localOrigin);a&&a.patches.push(n),(!this.highestVisibleLODTile||n.vlevel>this.highestVisibleLODTile.vlevel)&&(this.highestVisibleLODTile=n),r.skipSubtree()}}else this.numTilesCulled++}else this.numTilesCulled++,r.skipSubtree()}},t.prototype._scaleQueriesForTile=function(e){for(var t=e.extent,r=e.lij[0],i=0;i<this.visibleScaleRangeQueriesInvPtr;){var n=this.visibleScaleRangeQueries.data[i],s=n.extent;r>=n.minLevel&&r<=n.maxLevel&&s[0]<=t[2]&&s[2]>=t[0]&&s[1]<=t[3]&&s[3]>=t[1]?(this.visibleScaleRangeQueries.swapElements(i,this.visibleScaleRangeQueriesInvPtr-1),this.visibleScaleRangeQueriesInvPtr--):i++}},t.prototype._tileIntersectsStencilEnabledLayer=function(e){for(var t=this.stencilEnabledLayerExtents,r=0;r<t.length;r++)if(e.intersectsExtent(t[r]))return!0;return!1},t.prototype._renderPatchGroupsAuxiliary=function(e,t,r,i){this.shaderTechnique.bindPipelineState(e.rctx);var n=this.stencilEnabledLayerExtents.length>0;t.setUniformMatrix4fv("proj",e.camera.projectionMatrix),t.setUniform1f("skirtScale",this._skirtScale),i.overlayEnabled&&this._bindOverlayUniforms(t);for(var s=0;s<r.length;s++){var a=r.data[s];this._bindViewForPatchGroup(t,a,e.camera.eye,e.camera.viewMatrix);for(var o=0;o<a.patches.length;o++)this._renderPatch(e.rctx,t,a.patches.data[o],4,n,i)}e.rctx.bindVAO(null)},t.prototype._renderPatchGroups=function(e,t,r,i){var n=e.rctx,s=e.camera,a=s.viewMatrix;if(this.shaderTechnique.bindPipelineState(n),this.shaderTechniqueConfig.screenSizePerspective&&this.pointsOfInterest){var o=E.getSettings("spherical"===this.manifold?"global":"local"),l=this.pointsOfInterest.centerOnSurfaceFrequent.distance;o.update({distance:l,fovY:s.fovY}),D.bindScreenSizePerspective(o,t,"screenSizePerspective")}var c=this.stencilEnabledLayerExtents.length>0;t.setUniform1f("skirtScale",this._skirtScale);for(var d=this._wireframeEnabled?1:4,h=0;h<r.length;h++){var u=r.data[h],p=u.patches;if(0!==p.length){this._bindViewForPatchGroup(t,u,s.eye,a);var f=e.sliceHelper&&e.sliceHelper.plane;f&&D.bindSlicePlane(u.origin,f,t),e.shadowMap&&e.shadowMap.bindView(t,u.origin),this.numOriginsRendered++;for(var g=0;g<p.length;g++){var v=p.data[g];w.trace("# RENDER TILE "+S.tile2str(v)+", screenDepth:"+v.screenDepth),C(v.renderData.geometryInfo.uvOffsetAndScale,v.renderData.texOffsetAndScale,M),t.setUniform4fv("texOffsetAndScale",M),n.bindTexture(v.renderData.textureReference,0),t.setUniform1f("opacity",v.renderData.opacity);var b=this._renderPatch(n,t,v,d,c,i);v.renderOrder=this.numTilesRendered,this.numTilesRendered++,this.numTrianglesRendered+=b/3,this._scaleQueriesForTile(v)}}}n.bindVAO(null)},t.prototype._renderPatch=function(e,t,r,i,n,s){s.overlayEnabled&&(this._bindOverlayTextures(t,r.renderData.overlays,s.used),t.setUniform1f("overlayOpacity",r.renderData.overlayOpacity)),n&&(this._tileIntersectsStencilEnabledLayer(r)?this.stencilShaderTechnique.bindPipelineState(e):this.shaderTechnique.bindPipelineState(e));var a=0===this._skirtScale?r.renderData.geometryInfo.numWithoutSkirtIndices:r.renderData.vao.indexBuffer.size;return e.bindVAO(r.renderData.vao),t.assertCompatibleVertexAttributeLocations(r.renderData.vao),e.drawElements(i,a,r.renderData.vao.indexBuffer.indexType,0),a},t.prototype._bindViewForPatchGroup=function(e,t,r,i){e.setUniform3fv("origin",t.origin),h.mat4.translate(z,i,t.origin),e.setUniformMatrix4fv("view",z),e.setUniform3f("camPos",r[0]-t.origin[0],r[1]-t.origin[1],r[2]-t.origin[2])},t.prototype._bindOverlayUniforms=function(e){e.setUniform1i("ovInnerColorTex",1),e.setUniform1i("ovOuterColorTex",2),e.setUniform1i("ovInnerWaterTex",3),e.setUniform1i("ovOuterWaterTex",4)},t.prototype._bindOverlayTextures=function(e,t,r){for(var i=0;i<2;i++){var n=2*i,s=t[i],a=r?s.highlightRenderTargetId:s.renderTargetId;if(a){B[n]=s.texOffset[0],B[n+1]=s.texOffset[1],N[n]=s.texScale[0],N[n+1]=s.texScale[1];var o=this.drapedRenderer.getRenderTargetTexture(a);this.rctx.bindTexture(o,1+i);var l=s.waterMaskRenderTargetId;if(l){var c=this.drapedRenderer.getRenderTargetTexture(l);this.rctx.bindTexture(c,3+i)}else this.rctx.bindTexture(this.emptyTex,3+i)}else B[n]=0,B[n+1]=0,N[n]=0,N[n+1]=0,this.rctx.bindTexture(this.emptyTex,1+i),this.rctx.bindTexture(this.emptyTex,3+i)}e.setUniform4fv("overlayTexOffset",B),e.setUniform4fv("overlayTexScale",N)},t.prototype._setTerrainTechnique=function(e){switch(this.shaderTechniqueConfig.output=e,e){case 0:var t="spherical"===this.manifold;this.shaderTechniqueConfig.hasOverlays=this.hasOverlays,this.shaderTechniqueConfig.atmosphere=t&&this._velvetOvergroundEnabled;break;case 2:this.shaderTechniqueConfig.alphaZero=!0;break;case 1:this.shaderTechniqueConfig.shadowMap=!1;break;case 3:this.shaderTechniqueConfig.shadowMap=!0}this.shaderTechniqueConfig.stencilEnabled=!1,this.shaderTechnique=this.shaderTechniqueRep.acquireAndReleaseExisting(k.TerrainTechnique,this.shaderTechniqueConfig,this.shaderTechnique),this.shaderTechniqueConfig.stencilEnabled=!0,this.stencilShaderTechnique=this.shaderTechniqueRep.acquireAndReleaseExisting(k.TerrainTechnique,this.shaderTechniqueConfig,this.stencilShaderTechnique)},t.prototype._updateAllProgramsAndPipelines=function(){var e=this;O.ShaderOutputTypes.forEach(function(t){0!==t&&1!==t&&3!==t&&2!==t&&4!==t||e._setTerrainTechnique(t)}),this.setNeedsRender()},t.prototype.releaseTileGeometry=function(e){e.releaseGeometry()&&this.setNeedsRender(),this.renderDataPool.release(e)},t.prototype._prepareScaleRangeQueries=function(){for(var e=this.visibleScaleRangeQueries,t=this.visibleScaleRangeQueryQueue;e.length<e.data.length&&t.length>0;){var r=t.pop();e.push(r)}this.visibleScaleRangeQueriesInvPtr=e.length},t.prototype._processScaleRangeQueries=function(){for(var e=this.visibleScaleRangeQueries,t=this.visibleScaleRangeQueryPool,r=0;r<e.length;r++){var i=e.data[r];t.release(i),i.callback(r>=this.visibleScaleRangeQueriesInvPtr),i.callback=null}e.clear()},Object.defineProperty(t.prototype,"test",{get:function(){return{tileRenderer:this.tileRenderer}},enumerable:!0,configurable:!0}),n([d.property()],t.prototype,"tileBackgroundInitialized",void 0),n([d.property()],t.prototype,"tileBackgroundUpdating",void 0),n([d.property({constructOnly:!0})],t.prototype,"manifold",void 0),n([d.property({readOnly:!0,dependsOn:["tileBackgroundInitialized","tileBackgroundUpdating"]})],t.prototype,"updating",null),t=n([d.subclass("esri.views.3d.terrain.TerrainRenderer")],t)}(d.declared(a)),Q={overlayEnabled:!1,used:!0},z=u.mat4f64.create(),j=g.vec3f64.create(),V=g.vec3f64.create(),H=g.vec3f64.create(),F=g.vec3f64.create(),W=g.vec3f64.create(),Y="TerrainRenderer";return G});