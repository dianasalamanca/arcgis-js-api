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

define(["dojo/_base/declare","dojo/on","dojo/when","dojo/promise/all","dojo/dom-class","dojo/dom-construct","dijit/Destroyable","esri/dijit/geoenrichment/ReportPlayer/PlayerSelect","esri/dijit/geoenrichment/ReportPlayer/PlayerThemes","esri/dijit/geoenrichment/ReportPlayer/ReportPlayerState","./chart/_ChartSettingsBuilder","./locator/_LocatorSettingsBuilder","./areaDetails/_AreaDetailsSettingsBuilder","./comparison/_ComparisonSettingsBuilder","./dynamicInfographic/_DynamicInfographicSettingsBuilder","./map/_MapSettingsBuilder","./multiFeature/_MultiFeatureSettingsBuilder","./SectionDynamicSettings","esri/dijit/geoenrichment/utils/DeviceUtil","esri/dijit/geoenrichment/utils/DnDUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/MouseUtil","esri/dijit/geoenrichment/utils/PopupUtil","esri/dijit/geoenrichment/utils/TooltipUtil","dojo/i18n!esri/nls/jsapi"],function(t,e,i,n,s,o,a,r,c,l,g,u,h,d,_,S,p,f,m,y,b,v,D,T,B){return B=B.geoenrichment.dijit.ReportPlayer.SectionDynamicSettingsBuilder,t(a,{_section:null,_settingsWidget:null,_settingsToolbar:null,_settingsButton:null,_filtersOnIndicator:null,_featureSelectDiv:null,_buttonBar:null,_onButtonBarShowCallbacks:null,_needRequerySettingsSet:!1,constructor:function(t){this._section=t,this._createSettings()},_createSettings:function(){var t=this;this._getSettingsSet().then(function(e){(e.chartSettings||e.locatorSettings||e.areaDetailsSettings||e.comparisonSettings||e.dynamicInfographicSettings||e.mapSettings||e.multiFeatureSettings)&&(t._tryAddFeatureSelect(e.multiFeatureSettings,e),t._tryAddLocatorExportButton(e.locatorSettings),t._tryAddSettingsButton(e),(e.locatorSettings&&!e.locatorSettings.hasTitle||e.areaDetailsSettings&&!e.areaDetailsSettings.hasTitle||e.comparisonSettings)&&s.add(t._settingsToolbar,"needsTopOffset"),t._buttonBar&&t._buttonBar.children.length>1&&s.add(t._buttonBar,"hasMultipleButtons"))})},_getSettingsSet:function(){return n({chartSettings:g.provideChartSettings(this._section),locatorSettings:u.provideLocatorSettings(this._section),areaDetailsSettings:h.provideAreaDetailsSettings(this._section),comparisonSettings:d.provideComparisonSettings(this._section),dynamicInfographicSettings:_.provideDynamicInfogarphicSettings(this._section),mapSettings:S.provideMapSettings(this._section),multiFeatureSettings:p.provideMultiFeatureSettings(this._section)})},_tryAddFeatureSelect:function(t,e){var n=this;if(t&&t.canSelectFeatures){var s=this._section.viewModel.dynamicReportInfo.analysisAreas.map(function(t,e){return{value:e,label:t.shortName||t.name}}),o=new r({options:s,value:0,allowRepetitiveSelection:!1,onChange:function(t){n._needRequerySettingsSet=!0,n._setFiltersOnIndicatorVisible(!1);var s=n._section.toJson();s.currentFeatureIndex=t.value,n._section.fromJson(s),o.closePopup(),n._settingsWidget&&(e.dynamicInfographicSettings?i(_.provideDynamicInfogarphicSettings(n._section),function(t){n._settingsWidget.updateDynamicInfographicSettings(t)}):n._settingsWidget.setVisualState(n._section.getVisualState()))}}).placeAt(this._createSettingsToolbar().featureSelectDiv);o.setTheme(c.DARK)}},_tryAddLocatorExportButton:function(t){if(t&&t.canExportToExcel){var i=this._createButton("dijitInline sectionDynamicSettings_exportButton");e(i,"click",function(){t.exportToExcel()}),T.setTooltipToNode(i,B.exportInfographicPanel)}},_tryAddSettingsButton:function(t){function e(){s||(s=!0,D.makePopup(function(){return i(n._needRequerySettingsSet?n._getSettingsSet():t,function(t){return n._needRequerySettingsSet=!1,n._createPopup(t)})},this._section,n._settingsButton,{orient:["before","below"]}))}var n=this,s=!1;if(t.chartSettings||t.locatorSettings||t.areaDetailsSettings||t.comparisonSettings||t.dynamicInfographicSettings||t.mapSettings){var o=t.locatorSettings||t.areaDetailsSettings||t.comparisonSettings&&t.comparisonSettings.filterRanges||t.dynamicInfographicSettings;this._settingsButton=this._createButton("dijitInline "+(o?"sectionDynamicSettings_filterButton":"sectionDynamicSettings_settingsButton"),e)}},_createButton:function(t,e){return o.create("div",{class:t},this._createSettingsToolbar(e).buttonBar)},_createSettingsToolbar:function(t){function i(t){n._section.isDataDrillingView&&(t=!0),n._buttonBar.style.display=!t||!n._section.isDataDrillingView&&l.isViewingDataDrillingZoom?"none":"",t&&n._onButtonBarShowCallbacks.forEach(function(t){return t()}),t?n._syncWithPanelScale():n._closeSettingsPopup(),s[t?"add":"remove"](n._section.domNode,"hasDynamicSettingsToolbar")}var n=this;return this._settingsToolbar||(this._settingsToolbar=o.create("div",{class:"sectionDynamicSettings_toolbar"},this._section.domNode),this._adjustToolbarPosition(),this._featureSelectDiv=o.create("div",{class:"dijitInline"},this._settingsToolbar),this._buttonBar=o.create("div",{class:"dijitInline sectionDynamicSettings_buttonBar"},this._section.dynamicSettingsToolbarRoot||this._settingsToolbar),this._onButtonBarShowCallbacks=[],i(!1),m.isMobileDevice()?(y.addNoDragClickHandler(this._section.domNode,function(){i(!0)}),this.own(e(document.body,"touchstart",function(t){n.isMouseOver(t)||i(!1)}))):this.own(e(document.body,"mousemove",function(){i(n.isMouseOver())}))),t&&this._onButtonBarShowCallbacks.push(t),{buttonBar:this._buttonBar,featureSelectDiv:this._featureSelectDiv}},_adjustToolbarPosition:function(){if(this._settingsToolbar){var t=this._section.getMapImages()[0];if(t){var e=b.position(t.domNode),i=b.position(this._section.domNode);this._settingsToolbar.style.top=e.y-i.y+"px",this._settingsToolbar.style.right=i.x+i.w-e.x-e.w+"px"}}},_createPopup:function(t){function e(){n._closeSettingsPopup()}function i(){return n._section.getInfographic().getInnerInfographic()}var n=this;return this._settingsWidget||(this._settingsWidget=new f({chartSettings:t.chartSettings,locatorSettings:t.locatorSettings,areaDetailsSettings:t.areaDetailsSettings,comparisonSettings:t.comparisonSettings,dynamicInfographicSettings:t.dynamicInfographicSettings,mapSettings:t.mapSettings,onSortChart:function(t){e(),n._section.getChart().sortChart(t)},onChartToTable:function(){e(),n._section.getChart().chartToTable()},onTableToChart:function(){e(),n._section.getChart().tableToChart()},onCalcStateChanged:function(t){e(),n._section.setChartCalculationState(t)},onChartFilterChanged:function(t){n._section.getChart().setFilterRanges(t.filterRanges),n._setFiltersOnIndicatorVisible(t.hasFiltersOn)},onLocatorFilterChanged:function(t){i().setSearchText(t.searchText),i().setFilterRanges(t.filterRanges),n._setFiltersOnIndicatorVisible(t.hasFiltersOn)},onAreaDetailsFilterChanged:function(t){i().setSearchText(t.searchText),n._setFiltersOnIndicatorVisible(t.hasFiltersOn)},onShowChart:function(t){e(),i().setChartView(t)},onComparisonFilterChanged:function(t){i().setFilterRanges(t.filterRanges),n._setFiltersOnIndicatorVisible(t.hasFiltersOn)},onDynamicInfographicFilterChanged:function(t){i().setFilterRanges(t.filterRanges),n._setFiltersOnIndicatorVisible(t.hasFiltersOn)},onLegendVisibilityChanged:function(t){n._section.getMapImages()[0].setLegendVisible(t)},onClosePopup:function(){e()}}),this.own(this._settingsWidget),this._settingsWidget.setVisualState(this._section.getVisualState())),this._settingsWidget},_closeSettingsPopup:function(){D.close(this._settingsWidget)},_setFiltersOnIndicatorVisible:function(t){this._filtersOnIndicator&&o.destroy(this._filtersOnIndicator),this._filtersOnIndicator=t&&o.create("div",{class:"sectionDynamicSettings_filtersOnIndicator",innerHTML:B.on},this._settingsButton)},setVisualState:function(t){this._settingsWidget&&this._settingsWidget.setVisualState(t)},notifyShown:function(){this._adjustToolbarPosition()},_panelScale:null,setPanelScale:function(t){this._panelScale=t,this._syncWithPanelScale()},_syncWithPanelScale:function(){this._panelScale&&this._settingsToolbar&&(this._settingsToolbar.style.transformOrigin=this._section.isDataDrillingView?"100% 100%":"100% 0%",this._settingsToolbar.style.transform="scale("+1/this._panelScale+")",this._settingsToolbar.style["webkit-transform"]="scale("+1/this._panelScale+")")},isMouseOver:function(t){return v.isMouseOver(this._section.domNode,{event:t})||v.isMouseOver(this._settingsToolbar,{event:t})||this._settingsWidget&&(v.isMouseOver(this._settingsWidget.domNode,{event:t})||v.isMouseOver(this._settingsWidget.domNode.parentNode,{event:t}))},destroy:function(){o.destroy(this._settingsToolbar)}})});