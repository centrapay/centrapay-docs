export default function getElement(
  selector,
  Constructor,
  parent,
) {
  const element = parent.querySelector(selector);
  if (!(element instanceof Constructor)) {
    throw new Error(`Element is not of type ${Constructor.name}: ${selector}`);
  }
  return element;
}
