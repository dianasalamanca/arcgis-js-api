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

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","../../webgl/VertexArrayObject"],function(e,t,i,r,o,a,n,s){return function(){function e(e){this._spritesTextureSize=new Float32Array(2),this._initialized=!1,this._programOptions={id:!1,dd:!1,sdf:!1},this._programCache=e,this._viewProjMat=i.create(),this._offsetVector=r.create(),this._color=o.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,r,o,s,f,c,l,m,u,d,_){var h=this;this._initialized||this._initialize(e);var v=l.hasDataDrivenIconSize?1:l.getLayoutValue("icon-size",r),p=l.hasDataDrivenIconColor?[1,1,1,1]:l.getPaintValue("icon-color",r),g=l.hasDataDrivenIconOpacity?1:l.getPaintValue("icon-opacity",r),y=p[3]*g*_;this._color[0]=y*p[0],this._color[1]=y*p[1],this._color[2]=y*p[2],this._color[3]=y;var x=l.getLayoutValue("icon-rotation-alignment",r);2===x&&(x=1===l.getLayoutValue("symbol-placement",r)?0:1);var V=0===x,z=t.isSDF,D=l.hasDataDrivenIcon,b=3===o,A=a.degToByte(s),U=c.tileTransform.transform,O=l.getPaintValue("icon-translate",r);if(0!==O[0]||0!==O[1]){i.copy(this._viewProjMat,c.tileTransform.transform);var P=O[0],j=O[1],M=0,w=0,I=c.coordRange/512,C=(1<<c.key.level)/Math.pow(2,r)*I;if(1===l.getPaintValue("icon-translate-anchor",r)){var S=-a.C_DEG_TO_RAD*s,T=Math.sin(S),L=Math.cos(S);M=C*(P*L-j*T),w=C*(P*T+j*L)}else M=C*P,w=C*j;this._offsetVector[0]=M,this._offsetVector[1]=w,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),U=this._viewProjMat}var B=V?u:d,E=this._getIconVAO(e,c,D);if(E){e.bindVAO(E);var k=(b?1:0)<<2|(D?1:0)<<1|(z?1:0),R=this._programOptions;R.id=b,R.dd=D,R.sdf=z;var F=this._programCache.getProgram(4,k,R);if(e.bindProgram(F),z){var G=l.getPaintValue("icon-halo-color",r),q=l.getPaintValue("icon-halo-width",r);F.setUniform4f("u_outlineColor",G[0],G[1],G[2],G[3]),F.setUniform1f("u_outlineSize",q)}if(F.setUniformMatrix4fv("u_transformMatrix",U),F.setUniformMatrix4fv("u_extrudeMatrix",B),F.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord),F.setUniform1f("u_depth",l.z),F.setUniform1f("u_mapRotation",A),F.setUniform1f("u_keepUpright",0),F.setUniform1f("u_level",10*r),F.setUniform1f("u_fadeSpeed",10*f.fadeSpeed),F.setUniform1f("u_minfadeLevel",10*f.minfadeLevel),F.setUniform1f("u_maxfadeLevel",10*f.maxfadeLevel),F.setUniform1f("u_fadeChange",10*(r+f.fadeChange)),F.setUniform1i("u_texture",1),F.setUniform1f("u_size",v),F.setUniform4fv("u_color",this._color),b){var H=n.int32To4Bytes(t.layerID);F.setUniform4f("u_id",H[0],H[1],H[2],H[3])}t.markerPerPageElementsMap.forEach(function(t,i){h._spritesTextureSize[0]=m.getWidth(i)/4,h._spritesTextureSize[1]=m.getHeight(i)/4,F.setUniform2fv("u_mosaicSize",h._spritesTextureSize),m.bind(e,9729,i,1),e.drawElements(4,t[1],5125,12*t[0])}),e.bindVAO()}},e.prototype._initialize=function(e){return!!this._initialized||(this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0)},e.prototype._getIconVAO=function(e,t,i){if(i){if(t.iconDDVertexArrayObject)return t.iconDDVertexArrayObject;var r=t.iconDDVertexBuffer,o=t.iconIndexBuffer;return r&&o?(t.iconDDVertexArrayObject=new s(e,this._programCache.getProgramAttributes(4),this._vertexAttributesDD,{geometry:r},o),t.iconDDVertexArrayObject):null}if(t.iconVertexArrayObject)return t.iconVertexArrayObject;var r=t.iconVertexBuffer,o=t.iconIndexBuffer;return r&&o?(t.iconVertexArrayObject=new s(e,this._programCache.getProgramAttributes(4),this._vertexAttributes,{geometry:r},o),t.iconVertexArrayObject):null},e}()});