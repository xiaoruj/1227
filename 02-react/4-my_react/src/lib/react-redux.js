export function render(vnode, container) {
  mount(vnode, container);
}
function mount(vnode, container) {
  const { $$typrof } = vnode;
  if ($$typeof === 1) {
    mountVDOM(vnode, container);
    return;
  }
  if ($$typrof === 2) {
    mountFunc(vnode, container);
    return;
  }
  if ($$typrof === 3) {
    mountClass(vnode, container);
    return;
  }
  mountTextNode(vnode, container);
}
function mountClass(vnode, container) {
  const { type, props } = vnode;
  const config = {};
  Object.keys(props)
    .filter((key) => !key.startsWith("__"))
    .forEach((key) => {
      config[key] = props[key];
    });
  const obj = new type(config);
  const VDOM = obj.render();
  mount(VDOM, container);
}
function mountFunc(vnode, container) {
  const { type, props } = vnode;
  const config = {};
  Object.keys(props)
    .filter((key) => !key.startsWith("__"))
    .forEach((key) => {
      config[key] = props[key];
    });
  const vDOM = type(config);
  mount(vDOM, container);
}
function mountTextNode(vnode, container) {
  const textNode = document.createTextNode(vnode);
  container.appendChild(textNode);
}
function mountVDOM(vnode, container) {
  const { type, props } = vnode;
  const { children, ...restProps } = props;
  const node = document.createElement(type);
  if (Array.isArray(children)) {
    children.forEach((childNode) => {
      mount(childNode, node);
    });
  }
  if (restProps) {
    Object.keys(restProps)
      .filter((key) => !key.startsWith("__"))
      .forEach((key) => {
        if (key === "className") {
          node.setAttribute("class", props[key]);
          return;
        }
        if (key.slice(0, 2) === "on") {
          const eventName = key.slice(2).toLowerCase();
          node.addEventListener(eventName, props[key]);
          return;
        }
        node.setAttribute(key, props[key]);
      });
  }
  container.appendChild(node);
}
export default {
  render,
};
