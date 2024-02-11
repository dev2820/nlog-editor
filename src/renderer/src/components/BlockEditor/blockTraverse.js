export function blockTraverse(
  maybeBlocks,
  cb,
  options = { recursive: false, onlyType: [] }
) {
  if (Array.isArray(maybeBlocks)) {
    const blockList = maybeBlocks;
    blockList.forEach((block) => {
      if (options.onlyType.length === 0) {
        cb(block);
      } else if (!options.onlyType.includes(block.type)) {
        return;
      } else {
        cb(block);
      }

      if (options.recursive && Array.isArray(block.children)) {
        blockTraverse(block, cb);
      }
    });
  } else {
    const block = maybeBlocks;
    if (options.onlyType.length === 0) {
      cb(block);
    } else if (!options.onlyType.includes(block.type)) {
      return;
    } else {
      cb(block);
    }

    if (options.recursive && Array.isArray(block.children)) {
      block.children.forEach((child) => {
        blockTraverse(child, cb);
      });
    }
  }
}
