export function getNextItemIndex(currentActiveItem, totalNumberOfItems) {
    let nextActiveItem = -1;
    do {
        nextActiveItem = Math.floor(Math.random() * totalNumberOfItems);
    } while (currentActiveItem === nextActiveItem);
    return nextActiveItem;
}
