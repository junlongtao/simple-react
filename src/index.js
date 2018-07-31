const React = {
  createElement
}

const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = "";
    return render(vnode, container);
  }
}

function createElement(tag, attrs, ...children) {
  return { tag, attrs, children };
}

function render(vnode, container) {
  if(typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  const dom = document.createElement(vnode.tag);

  if(vnode.attrs) {
    Object.keys(node.attrs).forEach(key => {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value);
    });
  }

  vnode.children.forEach(child => {
    render(child, dom);
  });
  
  return container.appendChild(dom);
}

function setAttribute(dom, name, value) {
  
}

function tick() {
  const element = (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
