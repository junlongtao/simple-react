import Component from '../react/Component';

export function createElement(tag, attrs, ...children) {
  return { tag, attrs, children };
}

export function renderComponent(component) {
  let base;
  const renderer = component.render();
 
  //更新前生命周期
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = _render(renderer);

  if (component.base) {
    //更新后生命周期
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    //挂载后生命周期
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }
  
  component.base = base;
  //为何记录base._component
  base._component = component; 
}

function setComponentProps(component, props){
  if(!component.base){
    //挂载前生命周期
    if(component.componentWillMount) component.componentWillMount();
  } else {
    //props更新前生命周期
    component.componentWillReceiveProps(props);
  }

  component.props = props;
  renderComponent(component);
}

function createComponent(component, props){
  let inst;
  if(component.prototype && component.prototype.render){
    inst = new component(props);
  } else {
    inst = new Component(props);
    inst.constructor = component;
    inst.render = function() {
      return this.constructor(props);
    }
  }
  return inst;
}

function setAttribute(dom, name, value) {
  if(name === 'className') name = 'class';

  if(/on\w+/.test(name)){
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if(name==='style') {
    if(!value || typeof value === 'string'){
      dom.style.cssText = value||'';
    } else if(value && typeof value === 'object'){
      for(let name in value) {
        dom.style[name] = value[name];
      }
    } else {
      if(name in dom){
        dom[name] = value||'';
      }
      if(value){
        dom.setAttribute(name, value);
      } else {
        dom.removeAttribute(name, value);
      }
    }
  }
}

function _render(vnode) {
  
  if(vnode===undefined||vnode===null||typeof vnode==='boolean') vnode ='';

  if(typeof vnode === 'number' || typeof vnode === 'string') {
    return document.createTextNode(String(vnode));
  }

  if(typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  const dom = document.createElement(vnode.tag);

  if(vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value);
    });
  }

  vnode.children.forEach(child => {
    render(child, dom);
  });
  
  return dom;
}

export function render(vnode, container){
  const dom = _render(vnode);
  return container.appendChild(dom);
}
