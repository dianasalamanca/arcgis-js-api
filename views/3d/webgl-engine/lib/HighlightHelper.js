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

define(["require","exports","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f32","../../../../core/libs/gl-matrix-2/vec4f64","../../support/debugFlags","./DefaultVertexAttributeLocations","./DefaultVertexBufferLayouts","./glUtil3D","./Util","../shaders/HighlightPrograms","../../../webgl/BufferObject","../../../webgl/FramebufferObject","../../../webgl/renderState","../../../webgl/Util","../../../webgl/VertexArrayObject"],function(e,t,i,r,o,a,l,s,p,n,u,h,g,c,d,m){var b=5;return function(){function e(e,t){this._grid={coverageMipmap:null,vao:null,verticalCellCount:0,horizontalCellCount:0,cellPixelSize:0,mipmapLevels:0,viewportWidth:0,viewportHeight:0},this.quadVAO=null,this.blur0Fbo=null,this.blur1Fbo=null,this._rctx=t,this.viewportToRestore=o.vec4f64.create(),this.defaultOptions={color:r.vec4f32.fromValues(1,0,1,1),haloColor:r.vec4f32.fromValues(1,0,1,1),haloOpacity:1,fillOpacity:.2,haloOpacityOccluded:.25,fillOpacityOccluded:.05},this.blurProgram=e.getProgram(u.blurPass,{gaussianSamples:b}),this.blurGridProgram=e.getProgram(u.blurPass,{gaussianSamples:b,gridOptimization:!0}),this.applyProgram=e.getProgram(u.applyPass),this.applyGridProgram=e.getProgram(u.applyPass,{gridOptimization:!0}),this.applyGridDebugProgram=e.getProgram(u.applyPass,{gridOptimization:!0,gridDebug:!0}),this.downsampleProgram=e.getProgram(u.downsamplePass),this.preprocessPipelineState=c.makePipelineState({colorWrite:c.defaultColorWriteParams}),this.applyPipelineState=c.makePipelineState({blending:c.separateBlendingParams(770,1,771,771),colorWrite:c.defaultColorWriteParams})}return Object.defineProperty(e.prototype,"enabled",{get:function(){return null!==this.blur0Fbo},set:function(e){e?this.enable():this.disable()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"profilingCallback",{get:function(){return a.HIGHLIGHTS_PROFILE_TO_CONSOLE?function(e){return console.log(e)}:null},enumerable:!0,configurable:!0}),e.prototype.setDefaultOptions=function(e){this.defaultOptions=e},e.prototype.render=function(e,t,r){var o=e.pixelRatio,l=!a.HIGHLIGHTS_GRID_OPTIMIZATION_DISABLED,s=a.HIGHLIGHTS_VISUALIZE_BLOCKS,p=this._rctx;n.assert(this.enabled),i.vec4.copy(this.viewportToRestore,e.fullViewport);var u=e.fullWidth,h=e.fullHeight,g=Math.ceil(u/o),c=Math.ceil(h/o);this.blur0Fbo.resize(g,c),this.blur1Fbo.resize(g,c),p.bindVAO(this.quadVAO),p.setPipelineState(this.preprocessPipelineState);var m=null,b=null,f=null,v=null;if(l){var P=this._grid;this._gridUpdateResources(t,32),this._gridComputeMipmap(),f=P.vao,v=4,m=this.blurGridProgram,p.bindProgram(m),p.bindTexture(P.coverageMipmap[P.mipmapLevels].colorTexture,1),m.setUniform1i("coverageTex",1)}else f=this.quadVAO,v=5,m=this.blurProgram,p.bindProgram(m);if(p.bindVAO(f),p.bindFramebuffer(this.blur0Fbo),p.setViewport(0,0,g,c),p.setClearColor(0,0,0,0),p.clear(16384),m.setUniform1i("tex",0),p.bindTexture(t.colorTexture,0),m.setUniform2f("blurSize",1/g,0),p.drawArrays(v,0,d.vertexCount(f,"geometry")),p.bindFramebuffer(this.blur1Fbo),p.clear(16384),p.bindTexture(this.blur0Fbo.colorTexture,0),m.setUniform2f("blurSize",0,1/c),p.drawArrays(v,0,d.vertexCount(f,"geometry")),p.bindFramebuffer(r),p.setPipelineState(this.applyPipelineState),p.setViewport(this.viewportToRestore[0],this.viewportToRestore[1],this.viewportToRestore[2],this.viewportToRestore[3]),l){b=s?this.applyGridDebugProgram:this.applyGridProgram,p.bindProgram(b),b.setUniform1i("coverageTex",2);var y=this._grid.coverageMipmap[this._grid.mipmapLevels].colorTexture;p.bindTexture(y,2)}else b=this.applyProgram,p.bindProgram(b);b.setUniform1i("tex",0),p.bindTexture(this.blur1Fbo.colorTexture,0),b.setUniform1i("origin",1),p.bindTexture(t.colorTexture,1),b.setUniform4fv("color",this.defaultOptions.color),b.setUniform4fv("haloColor",this.defaultOptions.haloColor),b.setUniform1f("outlineSize",8.6),b.setUniform1f("blurSize",.4),b.setUniform4f("opacities",this.defaultOptions.haloOpacity,this.defaultOptions.haloOpacityOccluded,this.defaultOptions.fillOpacity,this.defaultOptions.fillOpacityOccluded),p.drawArrays(v,0,d.vertexCount(f,"geometry")),p.bindVAO(null)},e.prototype.enable=function(){if(!this.enabled){this.quadVAO=p.createQuadVAO(this._rctx);var e={colorTarget:0,depthStencilTarget:0,width:0,height:0},t={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:0,height:0};this.blur0Fbo=new g(this._rctx,e,t),this.blur1Fbo=new g(this._rctx,e,t)}},e.prototype.disable=function(){this.enabled&&(this.quadVAO.dispose(!0),this.blur1Fbo.dispose(),this.blur0Fbo.dispose(),this.quadVAO=null,this.blur0Fbo=null,this.blur1Fbo=null)},e.prototype._gridUpdateResources=function(e,t){var i=this._rctx,r=this._grid,o=!1;if(null===r.coverageMipmap&&(r.coverageMipmap=[e],o=!0),r.viewportWidth===e.width&&r.viewportHeight===e.height||(o=!0,r.viewportWidth=e.width,r.viewportHeight=e.height),r.coverageMipmap[0]=e,r.cellPixelSize!==t&&(r.cellPixelSize=t,o=!0),o){for(var a=1;a<r.coverageMipmap.length;a++)r.coverageMipmap[a].dispose();r.mipmapLevels=Math.ceil(Math.log(r.cellPixelSize)*Math.LOG2E),r.coverageMipmap.length=r.mipmapLevels+1;for(var a=0;a<r.mipmapLevels;a++){var p=r.coverageMipmap[a],n={target:3553,pixelFormat:6407,dataType:33635,samplingMode:9729,wrapMode:33071,width:Math.ceil(p.width/2),height:Math.ceil(p.height/2)},u={colorTarget:0,depthStencilTarget:0,width:Math.ceil(p.width/2),height:Math.ceil(p.height/2)},c=new g(i,u,n);r.coverageMipmap[a+1]=c}}var d=Math.ceil(e.height/r.cellPixelSize),b=Math.ceil(e.width/r.cellPixelSize);if(!r.vao||r.verticalCellCount!==d||r.horizontalCellCount!==b){r.verticalCellCount=d,r.horizontalCellCount=b;for(var f=d+1,v=b+1,P=1/d,y=1/b,O=new Float32Array(24*f*v),x=0,w=0;w<f;w++)for(var M=0;M<v;M++)O[x+0]=(M-.5)*y*2-1,O[x+1]=(w-.5)*P*2-1,O[x+2]=M*y,O[x+3]=w*P,O[x+4]=(M+.5)*y*2-1,O[x+5]=(w-.5)*P*2-1,O[x+6]=M*y,O[x+7]=w*P,O[x+8]=(M-.5)*y*2-1,O[x+9]=(w+.5)*P*2-1,O[x+10]=M*y,O[x+11]=w*P,O[x+12]=(M-.5)*y*2-1,O[x+13]=(w+.5)*P*2-1,O[x+14]=M*y,O[x+15]=w*P,O[x+16]=(M+.5)*y*2-1,O[x+17]=(w-.5)*P*2-1,O[x+18]=M*y,O[x+19]=w*P,O[x+20]=(M+.5)*y*2-1,O[x+21]=(w+.5)*P*2-1,O[x+22]=M*y,O[x+23]=w*P,x+=24;r.vao&&r.vao.dispose(!0),r.vao=new m(i,l.Default3D,{geometry:s.Pos2Tex},{geometry:h.createVertex(i,35044,O)})}},e.prototype._gridComputeMipmap=function(){var e=this._rctx,t=this._grid,i=this.downsampleProgram;e.bindVAO(this.quadVAO);for(var r=0;r<t.mipmapLevels;r++){e.bindFramebuffer(t.coverageMipmap[r+1]),e.bindTexture(t.coverageMipmap[r].colorTexture,0);var o=t.coverageMipmap[r+1].width,a=t.coverageMipmap[r+1].height;e.bindProgram(i),i.setUniform1i("tex",0),i.setUniform2f("invFramebufferDim",1/o,1/a),e.setViewport(0,0,o,a),e.drawArrays(5,0,d.vertexCount(this.quadVAO,"geometry"))}},e.prototype.getGpuMemoryUsage=function(){var e=d.getGpuMemoryUsage(this.blur0Fbo)+d.getGpuMemoryUsage(this.blur1Fbo);if(this._grid&&this._grid.coverageMipmap)for(var t=0,i=this._grid.coverageMipmap;t<i.length;t++){var r=i[t];e+=d.getGpuMemoryUsage(r)}return e},e}()});