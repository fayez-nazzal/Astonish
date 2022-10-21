// recursive function that get children of all nest levels
export const getReactDeepNestedChildren = (children: any) => {
  if (children && children.props && children.props.children) {
    return [children, ...getReactDeepNestedChildren(children.props.children)];
  }

  return [children];
};
