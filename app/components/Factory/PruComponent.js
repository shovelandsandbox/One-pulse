import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { find } from "ramda";

import { events } from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../actions";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "PruComponent";

const findActionByEvent = event => find(a => a.on == event);

/**
 * HOC which Reads the components config and dispatches actions when events are triggered
 */
const WithPruComponent = WrappedComponent => {
  class PruComponent extends PureComponent {
    constructor(props) {
      super(props);
    }

    captureCmsEvent = componentConfig => {
      if (!componentConfig.cmsId) {
        return;
      }
      const cmsEvent = events.CmsClickAction;
      cmsEvent.cmsId = componentConfig.cmsId;
      const componentProperties = componentConfig.properties;
      const cmsAttrs = {
        title: componentProperties ? componentProperties.title : "",
        category: componentProperties ? componentProperties.category : "",
        id: componentConfig.cmsId,
        desc: componentProperties ? componentProperties.desc : "",
      };
      if (componentConfig.category) {
        cmsEvent.tags = [componentConfig.category];
      }
      cmsEvent.attributes = cmsAttrs;
      this.props.dispatch(dispatchEvent(cmsEvent));
    };

    handleActions = (event, actions = [], payload) => {
      const { actionsToDispatch = [] } =
        findActionByEvent(event)(actions) || {};

      actionsToDispatch.forEach(action => {
        const staticPayload = action.payload || {};
        this.props.dispatch({
          ...action,
          payload: { ...staticPayload, ...payload },
        });
      });
    };

    eventHandler = (event, payload = {}) => {
      this.captureCmsEvent(this.props);
      this.handleActions(event, this.props.actions, payload);
    };

    render() {
      return <WrappedComponent {...this.props} handler={this.eventHandler} />;
    }
  }

  PruComponent.propTypes = {
    actions: PropTypes.shape({
      on: PropTypes.string,
      actionsToDispatch: PropTypes.array,
    }),
    dispatch: PropTypes.func,
  };

  PruComponent.displayName = getDisplayName(WrappedComponent);

  return connect()(PruComponent);
};

export default WithPruComponent;
