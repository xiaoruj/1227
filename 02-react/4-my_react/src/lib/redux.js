export function createElement(reducers) {
  props.children = children;
  let $$typeof;
  if (typeof type === "string") {
    $$typeof = 1;
  }
  if (typeof type === "function") {
    $$typeof = type.isReactComponent ? 3 : 2;
  }
  return {
    $$typeof,
    type,
    props,
  };
}
export class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
  }
}
export default {
  createElement,
  Component,
};
