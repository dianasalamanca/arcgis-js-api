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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!../nls/common","dojo/i18n!./LayerList/nls/LayerList","../core/Collection","../core/events","../core/Handles","../core/watchUtils","../core/accessorSupport/decorators","../libs/sortablejs/Sortable","./Widget","./LayerList/LayerListViewModel","./LayerList/ListItem","./support/widget"],function(e,t,i,n,o,s,r,l,a,c,d,u,p,g,h,y,_){function b(e,t,i){e.splice(i,0,e.splice(t,1)[0])}function m(e){var t=e.actionsOpen,i=e.children;t&&(e.actionsOpen=!1),i.forEach(function(e){return m(e)})}var v=l.ofType(y),f={base:"esri-layer-list esri-widget esri-widget--panel",noItems:"esri-layer-list__no-items",list:"esri-layer-list__list",listRoot:"esri-layer-list__list--root",listExclusive:"esri-layer-list__list--exclusive",listInherited:"esri-layer-list__list--inherited",listIndependent:"esri-layer-list__list--independent",item:"esri-layer-list__item",itemContent:"esri-layer-list__item-content",itemError:"esri-layer-list__item--error",itemInvisibleAtScale:"esri-layer-list__item--invisible-at-scale",itemUpdating:"esri-layer-list__item--updating",itemChildren:"esri-layer-list__item--has-children",itemSelectable:"esri-layer-list__item--selectable",itemContainer:"esri-layer-list__item-container",actionsMenu:"esri-layer-list__item-actions-menu",actionsMenuItem:"esri-layer-list__item-actions-menu-item",actionsMenuItemActive:"esri-layer-list__item-actions-menu-item--active",actions:"esri-layer-list__item-actions",actionsList:"esri-layer-list__item-actions-list",action:"esri-layer-list__item-action",actionIcon:"esri-layer-list__item-action-icon",actionImage:"esri-layer-list__item-action-image",actionTitle:"esri-layer-list__item-action-title",actionToggle:"esri-layer-list__action-toggle",actionToggleOn:"esri-layer-list__action-toggle--on",label:"esri-layer-list__item-label",errorMessage:"esri-layer-list__item-error-message",title:"esri-layer-list__item-title",toggleVisible:"esri-layer-list__item-toggle",toggleVisibleIcon:"esri-layer-list__item-toggle-icon",childToggle:"esri-layer-list__child-toggle",childToggleOpen:"esri-layer-list__child-toggle--open",childOpened:"esri-layer-list__child-toggle-icon--opened",childClosed:"esri-layer-list__child-toggle-icon--closed",childClosed_RTL:"esri-layer-list__child-toggle-icon--closed-rtl",disabled:"esri-disabled",disabledElement:"esri-disabled-element",hidden:"esri-hidden",rotating:"esri-rotating",iconEllipses:"esri-icon-handle-horizontal",iconVisible:"esri-icon-visible",iconInvisible:"esri-icon-non-visible",iconRadioSelected:"esri-icon-radio-checked",iconRadioUnselected:"esri-icon-radio-unchecked",iconNoticeTriangle:"esri-icon-notice-triangle",iconChildrenOpen:"esri-icon-down-arrow",iconDownArrow:"esri-icon-down-arrow",iconRightArrow:"esri-icon-right-triangle-arrow",iconLeftArrow:"esri-icon-left-triangle-arrow",iconLoading:"esri-icon-loading-indicator",iconDefaultAction:"esri-icon-default-action",widgetIcon:"esri-icon-layers"},I={actions:"actions",actionSection:"action-section",items:"items"},A={exclusive:"exclusive",inherited:"inherited",independent:"independent"};return function(e){function t(t){var i=e.call(this,t)||this;return i._handles=new c,i._sortable=null,i._sortableNode=null,i._focusSortUid=null,i.iconClass=f.widgetIcon,i.label=r.widgetLabel,i.listItemCreatedFunction=null,i.multipleSelectionEnabled=!1,i.operationalItems=null,i.selectionEnabled=!1,i.selectedItems=new v,i.statusIndicatorsVisible=!0,i.view=null,i.viewModel=new h,i}return i(t,e),t.prototype.postInitialize=function(){var e=this,t=this.operationalItems;this.own(d.on(this,"operationalItems","change",function(){return e._itemsChanged(t)}),d.init(this,"selectionEnabled",function(){return e._toggleSorting()}))},t.prototype.destroy=function(){var e=this._sortable;e&&e.destroy(),this._handles.destroy(),this._handles=null},t.prototype.triggerAction=function(e,t){this.viewModel.triggerAction(e,t)},t.prototype.render=function(){var e,t=this,i=this._getItems(),n=this.get("viewModel.state"),o=0===i.length?_.tsx("div",{class:f.noItems},r.noItemsToDisplay):_.tsx("ul",{"aria-label":r.widgetLabel,role:this.selectionEnabled?"listbox":void 0,afterCreate:this._sortNodeCreated,"data-node-ref":"_sortableNode",bind:this,class:this.classes(f.list,f.listRoot,f.listIndependent)},i.map(function(e){return t._renderItem(e,null)})),s=(e={},e[f.hidden]="loading"===n,e[f.disabled]="disabled"===n,e);return _.tsx("div",{class:this.classes(f.base,s)},o)},t.prototype._toggleSorting=function(){var e=this,t=this,i=t._sortable,n=t._sortableNode,o=t.selectionEnabled;if(n)if(i)i.option("disabled",!o);else{var s=p.create(n,{dataIdAttr:"data-layer-uid",group:"root-layers",disabled:!o,onSort:function(){return e._sortLayersToItems(s.toArray())}});this._sortable=s}},t.prototype._sortNodeCreated=function(e){this._sortableNode=e,this._toggleSorting()},t.prototype._sortLayersToItems=function(e){var t=this.get("view.map.layers");t&&t.sort(function(t,i){var n=e.indexOf(t.uid),o=e.indexOf(i.uid);return n>o?-1:n<o?1:0})},t.prototype._getItems=function(){var e=this;return this.operationalItems.toArray().filter(function(t){return e.errorsVisible||!t.error})},t.prototype._getSingleActionButton=function(e){return e.actionsSections.reduce(function(e){return e}).filter(function(e){return e&&"button"===e.type}).getItemAt(0)},t.prototype._renderItem=function(e,t){var i,n,l,a,c,d,u=this,p=this.id,g=p+"_"+e.uid,h=g+"_actions",y=g+"__list",b=g+"__title",m=e.children.length,v=!!e.error,I=!!m&&!v,w=v?r.layerError:"",x=e.visibilityMode,S=e.children&&e.children.toArray(),k=A.exclusive,C=A.inherited,L=(i={},i[f.listExclusive]=x===k,i[f.listInherited]=x===C,i[f.listIndependent]=x!==C&&x!==k,i),O=(n={},n[f.itemChildren]=I,n[f.itemError]=!!v,n[f.itemUpdating]=e.updating&&!t&&this.statusIndicatorsVisible,n[f.itemInvisibleAtScale]=!e.visibleAtCurrentScale,n[f.itemSelectable]=this.selectionEnabled,n),E=this._countActions(e.actionsSections),T=e.panel,M=T&&T.open?T.render():null,R=T&&T.visible?this._renderPanelButton(T):null,U=(l={},l[f.actionsMenuItemActive]=e.actionsOpen,l),V=e.actionsOpen?s.close:s.open,N=1===E&&this._getSingleActionButton(e),P=N?this._renderAction({item:e,action:N,singleAction:!0}):null,H=!N&&E?_.tsx("div",{key:"actions-menu-toggle","data-item":e,bind:this,onclick:this._toggleActionsOpen,onkeydown:this._toggleActionsOpen,class:this.classes(f.actionsMenuItem,U),tabindex:"0",role:"button","aria-controls":h,"aria-label":V,title:V},_.tsx("span",{"aria-hidden":"true",class:f.iconEllipses})):null,D=H||R||P?_.tsx("div",{key:"esri-layer-list__actions-menu",class:f.actionsMenu},R,P,H):null,B=E?this._renderActionsSections(e,e.actionsSections,h):null,K=I?_.tsx("ul",{key:"esri-layer-list__list-items",id:y,class:this.classes(f.list,L),"aria-expanded":e.open?"true":"false",role:x===k?"radiogroup":"group",hidden:!e.open||null},S.map(function(t){return u._renderItem(t,e)})):null,j=(a={},a[f.childToggleOpen]=e.open,a),F=e.open?s.collapse:s.expand,z=I?_.tsx("span",{onclick:this._toggleChildrenClick,onkeydown:this._toggleChildrenClick,"data-item":e,key:"esri-layer-list__toggle-children",class:this.classes(f.childToggle,j),tabindex:"0",role:"button","aria-controls":y,"aria-label":F,title:F},_.tsx("span",{"aria-hidden":"true",class:this.classes(f.childClosed,f.iconRightArrow)}),_.tsx("span",{"aria-hidden":"true",class:this.classes(f.childOpened,f.iconDownArrow)}),_.tsx("span",{"aria-hidden":"true",class:this.classes(f.childClosed_RTL,f.iconLeftArrow)})):null,q=this._createLabelNode(e,t,b),W=v?_.tsx("div",{key:"esri-layer-list__error",class:f.errorMessage,role:"alert"},_.tsx("span",null,w)):null,G=this.selectedItems.indexOf(e)>-1,J=t?null:e.get("layer.uid"),Q=this.selectionEnabled?(c={bind:this,onclick:this._toggleSelection,onkeydown:this._selectionKeydown,"data-item":e,tabIndex:0,"aria-selected":G?"true":"false",role:"option","aria-labelledby":b},c["data-layer-uid"]=J,c):(d={bind:void 0,onclick:void 0,onkeydown:void 0,"data-item":void 0,tabIndex:void 0,"aria-selected":void 0,role:void 0,"aria-labelledby":void 0},d["data-layer-uid"]=void 0,d);return _.tsx("li",o({key:e,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(f.item,O),"aria-labelledby":b},Q),_.tsx("div",{key:"esri-layer-list__list-item-container",class:f.itemContainer},z,q,D),W,B,M,K)},t.prototype._focusListItem=function(e){var t=this._focusSortUid;if(e&&t){e.dataset.layerUid===t&&(e.focus(),this._focusSortUid=null)}},t.prototype._createLabelNode=function(e,t,i){var n,s=this.selectionEnabled,l=A.exclusive,a=A.inherited,c=t&&t.visibilityMode,d=(n={},n[f.iconRadioSelected]=c===l&&e.visible,n[f.iconRadioUnselected]=c===l&&!e.visible,n[f.iconVisible]=c!==l&&e.visible,n[f.iconInvisible]=c!==l&&!e.visible,n),u=c===l?"radio":"switch",p=e.title||r.untitledLayer,g=e.visibleAtCurrentScale?p:p+" ("+r.layerInvisibleAtScale+")",h=_.tsx("span",{key:"layer-title-container",id:i,title:g,"aria-label":g,class:f.title},p),y=_.tsx("span",{class:this.classes(f.toggleVisibleIcon,d),"aria-hidden":"true"}),b={bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":c,tabIndex:0,"aria-checked":e.visible?"true":"false",role:u,"aria-labelledby":i},m={bind:void 0,onclick:void 0,onkeydown:void 0,"data-item":void 0,"data-parent-visibility":void 0,tabIndex:void 0,"aria-checked":void 0,role:void 0,"aria-labelledby":void 0},v=s?b:m,I=s?m:b,w=_.tsx("div",o({key:e,class:f.label},I),_.tsx("span",o({class:f.toggleVisible},v),y),h),x=!!e.error,S=x?_.tsx("span",{key:"notice-triangle","aria-hidden":"true",class:f.iconNoticeTriangle}):null;return c===a||x?_.tsx("div",{key:e,class:f.label},S,h):w},t.prototype._renderPanelButton=function(e){var t,i,n=e.className,o=e.open,s=e.title,r=e.image,l=r||n?n:f.iconDefaultAction,a=this._getIconImageStyles(e),c=(t={},t[f.actionsMenuItemActive]=o,t),d=(i={},i[f.actionImage]=!!a["background-image"],i);return l&&(d[l]=!!l),_.tsx("div",{key:e,bind:this,"data-panel":e,onclick:this._triggerPanel,onkeydown:this._triggerPanel,class:this.classes(f.actionsMenuItem,c),role:"button",tabindex:"0",title:s,"aria-label":s},_.tsx("span",{class:this.classes(d),styles:a}))},t.prototype._watchActionSectionChanges=function(e,t){var i=this,n=I.actionSection+t;this._handles.add(e.on("change",this.scheduleRender.bind(this)),n),e.forEach(function(e){return i._renderOnActionChanges(e,t)})},t.prototype._renderOnActionChanges=function(e,t){var i=this,n=I.actions+t;return"toggle"===e.type?void this._handles.add([d.init(e,["className","image","id","title","visible","value"],function(){return i.scheduleRender()})],n):"slider"===e.type?void this._handles.add([d.init(e,["className","id","title","visible","value","displayValueEnabled","max","min","step"],function(){return i.scheduleRender()})],n):void this._handles.add([d.init(e,["className","image","id","title","visible"],function(){return i.scheduleRender()})],n)},t.prototype._renderOnItemChanges=function(e){var t=this,i=e.uid,n=I.items+i;this._handles.add([d.init(e,["actionsOpen","visible","open","updating","title","visibleAtCurrentScale","error","visibilityMode","panel","panel.title","panel.content","panel.className"],function(){return t.scheduleRender()}),e.actionsSections.on("change",function(){return t.scheduleRender()}),e.children.on("change",function(){return t.scheduleRender()})],n),e.children.forEach(function(e){return t._renderOnItemChanges(e)}),e.actionsSections.forEach(function(e){return t._watchActionSectionChanges(e,i)})},t.prototype._itemsChanged=function(e){var t=this;this._handles.removeAll(),e.forEach(function(e){return t._renderOnItemChanges(e)}),this.scheduleRender()},t.prototype._renderActionsSections=function(e,t,i){var n=this,o=t.toArray(),s=o.map(function(t){return _.tsx("ul",{key:t,class:f.actionsList},n._renderActionSection(e,t))});return _.tsx("div",{role:"group","aria-expanded":e.actionsOpen?"true":"false",key:"esri-layer-list__actions-section",id:i,class:f.actions,hidden:!e.actionsOpen||null},s)},t.prototype._renderActionSection=function(e,t){var i=this;return(t&&t.toArray()).map(function(t){return i._renderAction({item:e,action:t})})},t.prototype._renderAction=function(e){var t,i,n=e.item,o=e.action,s=e.singleAction,r=this._getIconImageStyles(o),l=o.active,a=o.className,c=o.disabled,d=o.title,u="button"!==o.type||o.image||a?a:f.iconDefaultAction,p=(t={},t[f.actionsMenuItem]=s&&"button"===o.type,t[f.action]=!s&&"toggle"!==o.type,t[f.actionToggle]="toggle"===o.type,t[f.actionToggleOn]="toggle"===o.type&&o.value,t[f.disabledElement]=c,t),g=(i={},i[f.actionImage]=!l&&!!r["background-image"],i[f.iconLoading]=l,i[f.rotating]=l,i);u&&(g[u]=!0);var h=_.tsx("span",{key:"action-icon","aria-hidden":"true",class:this.classes(f.actionIcon,g),styles:r}),y=s?null:_.tsx("span",{key:"action-title",class:f.actionTitle},d),b=[h,y];return s?_.tsx("div",{bind:this,"data-item":n,"data-action":o,role:"button",key:o,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:p,tabindex:"0",title:d,"aria-label":d},b):_.tsx("li",{bind:this,"data-item":n,"data-action":o,key:o,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:p,tabindex:"0",role:"button",title:d,"aria-label":d},b)},t.prototype._countActions=function(e){return e.reduce(function(e,t){return e+t.length},0)},t.prototype._getIconImageStyles=function(e){var t="esri.widgets.LayerList.ListItemPanel"===e.declaredClass||"esri.support.Action.ActionButton"===e.declaredClass||"esri.support.Action.ActionToggle"===e.declaredClass?e.image:null;return{"background-image":t?'url("'+t+'")':null}},t.prototype._selectionKeydown=function(e){var t=["ArrowDown","ArrowUp"],i=a.eventKey(e);if(-1===t.indexOf(i))return void this._toggleSelection(e);e.stopPropagation();var n=e.currentTarget,o=n["data-item"],s=this,r=s._sortable,l=s.selectedItems,c=l.indexOf(o)>-1,d=r.toArray(),u=e.target,p=d.indexOf(u.dataset.layerUid);if(-1!==p){if("ArrowDown"===i){var g=p+1;if(g>=d.length)return;c?(b(d,p,g),r.sort(d),this._sortLayersToItems(r.toArray()),this._focusSortUid=d[g]):(this._focusSortUid=d[g],this.scheduleRender())}if("ArrowUp"===i){var g=p-1;if(g<=-1)return;c?(b(d,p,g),r.sort(d),this._sortLayersToItems(r.toArray()),this._focusSortUid=d[g]):(this._focusSortUid=d[g],this.scheduleRender())}}},t.prototype._toggleActionsOpen=function(e){var t=e.currentTarget,i=t["data-item"],n=i.actionsOpen,o=!n;o&&this.operationalItems.forEach(function(e){return m(e)}),i.actionsOpen=o,e.stopPropagation()},t.prototype._triggerPanel=function(e){var t=e.currentTarget,i=t["data-panel"];i&&(i.open=!i.open),e.stopPropagation()},t.prototype._triggerAction=function(e){var t=e.currentTarget,i=t["data-action"],n=t["data-item"];"toggle"===i.type&&(i.value=!i.value),this.triggerAction(i,n),e.stopPropagation()},t.prototype._toggleVisibility=function(e){var t=e.currentTarget,i=t.getAttribute("data-parent-visibility"),n=t["data-item"];i===A.exclusive&&n.visible||(n.visible=!n.visible),e.stopPropagation()},t.prototype._toggleChildrenClick=function(e){var t=e.currentTarget,i=t["data-item"];i.open=!i.open,e.stopPropagation()},t.prototype._toggleSelection=function(e){e.stopPropagation();var t=this,i=t.multipleSelectionEnabled,n=t.selectedItems,o=i&&(e.metaKey||e.ctrlKey),s=e.currentTarget,r=s["data-item"],l=n.indexOf(r)>-1,a=n.length,c=l&&1===a;return o?void(l?n.remove(r):n.add(r)):a&&!c?(n.removeAll(),void n.add(r)):void(l?n.remove(r):n.add(r))},n([u.property()],t.prototype,"iconClass",void 0),n([u.property(),_.renderable()],t.prototype,"errorsVisible",void 0),n([u.property()],t.prototype,"label",void 0),n([u.aliasOf("viewModel.listItemCreatedFunction"),_.renderable()],t.prototype,"listItemCreatedFunction",void 0),n([u.property()],t.prototype,"multipleSelectionEnabled",void 0),n([u.aliasOf("viewModel.operationalItems"),_.renderable()],t.prototype,"operationalItems",void 0),n([u.property(),_.renderable()],t.prototype,"selectionEnabled",void 0),n([u.property(),_.renderable()],t.prototype,"selectedItems",void 0),n([u.property(),_.renderable()],t.prototype,"statusIndicatorsVisible",void 0),n([u.aliasOf("viewModel.view"),_.renderable()],t.prototype,"view",void 0),n([_.vmEvent("trigger-action"),u.property({type:h}),_.renderable("viewModel.state")],t.prototype,"viewModel",void 0),n([u.aliasOf("viewModel.triggerAction")],t.prototype,"triggerAction",null),n([_.accessibleHandler()],t.prototype,"_toggleActionsOpen",null),n([_.accessibleHandler()],t.prototype,"_triggerPanel",null),n([_.accessibleHandler()],t.prototype,"_triggerAction",null),n([_.accessibleHandler()],t.prototype,"_toggleVisibility",null),n([_.accessibleHandler()],t.prototype,"_toggleChildrenClick",null),n([_.accessibleHandler()],t.prototype,"_toggleSelection",null),t=n([u.subclass("esri.widgets.LayerList")],t)}(u.declared(g))});