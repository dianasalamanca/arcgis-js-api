// esri
import Graphic = require("esri/../Graphic");
import { PopupTemplateContentCreator } from "esri/../interfaces";

// esri.core
import { from } from "esri/../core/arrayUtils";

// esri.core.accessorSupport
import { aliasOf, property, subclass } from "esri/../core/accessorSupport/decorators";

// esri.widgets
import Widget = require("esri/Widget");

// esri.widgets.Feature.FeatureContent
import FeatureContentViewModel = require("esri/widgets/FeatureContent/FeatureContentViewModel");

// esri.widgets.Feature.support
import { shouldOpenInNewTab } from "esri/widgets/support/featureUtils";

// esri.widgets.support
import { VNode } from "esri/support/interfaces";
import { renderable, isWidget, tsx } from "esri/support/widget";

const CSS = {
  base: "esri-feature-content",
  loaderContainer: "esri-feature-content__loader-container",
  loader: "esri-feature-content__loader"
};

@subclass("esri.widgets.Feature.FeatureContent")
class FeatureContent extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(params?: any, parentNode?: string | Element) {
    super(params, parentNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  creator
  //----------------------------------

  @aliasOf("viewModel.creator")
  creator: PopupTemplateContentCreator = null;

  //----------------------------------
  // graphic
  //----------------------------------

  @aliasOf("viewModel.graphic")
  graphic: Graphic = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  @renderable(["viewModel.created", "viewModel.state"])
  @property({ type: FeatureContentViewModel })
  viewModel: FeatureContentViewModel = null;

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderLoading(): VNode {
    return (
      <div class={CSS.loaderContainer} key="loader">
        <div class={CSS.loader} />
      </div>
    );
  }

  protected renderCreated(): VNode {
    const created = this.viewModel?.created;

    if (!created) {
      return null;
    }

    if (created instanceof HTMLElement) {
      return <div key={created} bind={created} afterCreate={this._attachToNode} />;
    }

    if (isWidget(created)) {
      return <div key={created}>{!created.destroyed && created.render()}</div>;
    }

    return <div key={created} innerHTML={created} afterCreate={this._addTargetToAnchors} />;
  }

  render(): VNode {
    const state = this.viewModel?.state;

    return (
      <div class={CSS.base}>
        {state === "loading" ? this.renderLoading() : this.renderCreated()}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _attachToNode(this: HTMLElement, node: HTMLElement): void {
    const content = this;
    node.appendChild(content);
  }

  private _addTargetToAnchors = (element: HTMLDivElement): void => {
    from(element.querySelectorAll("a")).forEach((anchorEl) => {
      if (shouldOpenInNewTab(anchorEl.href) && !anchorEl.hasAttribute("target")) {
        anchorEl.setAttribute("target", "_blank");
      }
    });
  };
}

export = FeatureContent;