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

define(["dojo/_base/lang","../../ThemeCalculator","../../ChartSorting","../../../../supportClasses/conditionalStyling/ConditionalStyleUtil","../utils/ChartDataUtil","../utils/TooltipInfoBuilder","./_ComparisonUtil","./_AxisBuilder","./_PointLabelUtil"],function(e,a,i,t,s,n,r,o,l){return{calcSeriesColumnBar:function(s){var u=s.chart,c=s.visualProperties,m=s.seriesItems,S=1===m.length,p=s.seriesItemsWithComparison||m,d=s.chartType,h=s.comparisonInfo,g=s.themeSettings,I=s.viewModel,V=1===p.length&&s.sorting,v=p.length>1&&c.renderColumnBarsInOppositeDirections,f=[],x={minYValue:1/0,maxYValue:-1/0,stackedValues:c.isStacked?[]:null};l.createPointToLabelMap(u);var C={};return p.forEach(function(e,o){if(e.points.length){var m={name:e.label,data:[],isComparisonSeries:e.isComparisonSeries,params:{plot:e.isComparisonSeries&&r.getComparisonPlotName(d,h)||void 0}},y=this._collectStatisticsForSeries(s,e,o,x);a.provideMissingIconsForPoints(e.points,d);var b=[];e.points.forEach(function(i,r){var u,V=y.values[r],f=V||0,x=r+1;if(c.conditionalStyling){var M=t.getConditionalStyle(f,c.conditionalStyling);u=M&&M.backgroundColor}u=u||a.calcColorForPoint({point:i,seriesItem:e,pointIndex:r,seriesIndex:o,numSeries:S?1:p.length,chartType:d,themeSettings:g,isComparisonSeries:e.isComparisonSeries,comparisonInfo:h,isMultiFeature:s.isMultiFeatureChart});var A=n.getTooltipInfo({yValue:V,pointLabel:l.getPointLabel(i,I),seriesLabel:e.label,minInSeriesValue:y.minInSeries,maxInSeriesValue:y.maxInSeries,sumInSeriesValue:y.valuesSum,absSumInSeriesValue:y.absValuesSum,avgInSeriesValue:y.avgInSeries,minInAreasValue:y.minInSeries,maxInAreasValue:y.maxInSeries,sumInAreasValue:y.valuesSum,absSumInAreasValue:y.absValuesSum,avgInAreasValue:y.avgInSeries,visualProperties:c,chartType:d,isMultiFeature:s.isMultiFeatureChart,color:u,conditionalStyling:c.conditionalStyling,fieldInfo:i.fieldInfo,isThisAreaSpecific:h&&!s.isMultiFeatureChart?!e.isComparisonSeries:void 0,isThisAreaSingleSeries:S,decimals:i.value&&i.value.decimals}),F=C[x]=C[x]||[];F.push(A),b.push(A),A.getGroup=function(){return s.isMultiFeatureChart?b:F};var P={x:x,y:f*function(){return v&&o>=p.length/2?-1:1}(),originalValue:V,isUnavailableData:isNaN(V),valueProp:"y",unsortedIndex:r,seriesIndex:o,name:l.getPointLabel(i,I),_valuesSumsInSeries:y.absValuesSum,point:i,fill:u,tooltip:A,icon:a.calcIconForPoint(i,u,d),bgIcon:a.calcBackgroundIconForPoint(i,d,g,c),stroke:{width:0}};c.yAxis.showValuesAsWeightsInSeries&&(P.y/=y.absValuesSum/100),m.data.push(P)}),V&&V!==i.NONE&&(m.data.sort(function(e,a){return(e.y-a.y)*(V===i.DESC?-1:1)}),m.data.forEach(function(e,a){var i=a+1;e.x=i})),m.data.forEach(function(e){l.updatePointIndexToLabelMap(u,e.x,e.point,I)}),f.push(m)}},this),x.stackedValues&&(x.stackedValues.sort(function(e,a){return a-e}),x.minYValue=x.stackedValues[x.stackedValues.length-1],x.maxYValue=x.stackedValues[0]),o.prettifyYAxis(x.minYValue,x.maxYValue,c.yAxis.baseLineValue,u,c,d,g,I,f.length),s.plotStat&&(e.mixin(s.plotStat,x),s.plotStat.pointIndexToTooltipsHash=C),f},_collectStatisticsForSeries:function(e,a,i,n){var r=e.visualProperties,o=e.viewModel,l=e.seriesItems,u=e.currentFeatureIndex,c=e.isMultiFeatureChart,m=e.excludedSeriesHash&&e.excludedSeriesHash[a.label],S=e.comparisonFeatureIds,p=e.ge,d=e.chartType,h=l.length>1&&r.renderColumnBarsInOppositeDirections,g=2===l.length&&h?s.CHART_DATA_SMOOTH:null;if(r.conditionalStyling){var I=t.getStatistics(r.conditionalStyling);I&&l.length&&(g=s.getChartData(I,l[0].points.length,g,!1))}var V=[],v=0,f=0,x=1e6,C=-1e6;return a.points.forEach(function(e,t){var n=s.getPointValue({point:e,index:t,seriesIndex:i,maxValue:!1,chartType:d,visualProperties:r,viewModel:o,currentFeatureIndex:c?t:u,chartData:g,isComparisonSeries:a.isComparisonSeries,comparisonFeatureId:S&&S[0],ge:p,allowNegativeValuesInPreview:!1});V[t]=n,n=n||0,m||(v+=n,f+=Math.abs(n),x=Math.min(x,n),C=Math.max(C,n))}),m||a.points.forEach(function(e,a){var i=V[a],i=r.yAxis.showValuesAsWeightsInSeries?i/f*100:i;n.stackedValues?(n.stackedValues[a]=n.stackedValues[a]||0,n.stackedValues[a]+=i):(n.minYValue=Math.min(i,n.minYValue),n.maxYValue=Math.max(i,n.maxYValue))}),{values:V,valuesSum:v,absValuesSum:f,minInSeries:x,maxInSeries:C,avgInSeries:v/a.points.length}}}});