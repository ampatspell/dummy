export const getActiveHTMLElement = () => {
  const el = document.activeElement;
  if (el instanceof HTMLElement) {
    return el;
  }
};

export const isInputElement = (el: HTMLElement): el is HTMLInputElement | HTMLTextAreaElement => {
  if (el instanceof HTMLInputElement) {
    return true;
  }
  if (el instanceof HTMLTextAreaElement) {
    return true;
  }
  return false;
};

export const getActiveInputElement = () => {
  const el = getActiveHTMLElement();
  if (el && isInputElement(el)) {
    return el;
  }
};
