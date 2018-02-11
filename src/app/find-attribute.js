export function findAttribute(htmlElement, attribute) {
    let current = htmlElement;
    while(current != null && !current.hasAttribute(attribute)) {
        current = current.parentElement;
    }
    
    return current != null ? current.attributes[attribute] : null;
}