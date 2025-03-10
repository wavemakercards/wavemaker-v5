import { toRaw, isRef, isReactive, isProxy } from "vue";
import { MoveMutation, TreeItem, TreeItemId } from "vue-tree-dnd";

export function deepToRaw<T extends Record<string, any>>(sourceObj: T): T {
  const objectIterator = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map((item) => objectIterator(item));
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (input && typeof input === "object") {
      return Object.keys(input).reduce((acc, key) => {
        acc[key as keyof typeof acc] = objectIterator(input[key]);
        return acc;
      }, {} as T);
    }
    return input;
  };

  return objectIterator(sourceObj);
}

const validateTree: (tree: TreeItem[]) => boolean = (tree: TreeItem[]) => {
  tree.forEach((item) => {
    if (!item?.id) {
      throw new Error("Tree item must have an id");
    }
    if (!item?.children) {
      throw new Error("Tree item must have children");
    }
    return validateTree(item.children);
  });
  return true;
};

const findParentOf: (
  parentId: TreeItemId,
  children: TreeItem[],
  id: string | number
) => TreeItemId | null = (
  parentId: TreeItemId,
  children: TreeItem[],
  id: string | number
) => {
  for (const node of children) {
    if (node.id === id) {
      return parentId;
    }
    const found = findParentOf(node.id, node.children, id);
    if (found) {
      return found;
    }
  }
  return null;
};
const findNode: (tree: TreeItem[], id: string | number) => TreeItem | null = (
  tree: TreeItem[],
  id: string | number
) => {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    const found = findNode(node.children, id);
    if (found) {
      return found;
    }
  }
  return null;
};
export const deleteNode = (tree: TreeItem[], id: string | number) => {
  for (const node of tree) {
    if (node.id === id) {
      tree.splice(tree.indexOf(node), 1);
      return;
    }
    deleteNode(node.children, id);
  }
};

export const moveMutation: (
  tree: TreeItem[],
  mutation: MoveMutation
) => TreeItem[] = (tree: TreeItem[], mutation: MoveMutation) => {
  const { id, targetId, position } = mutation;

  validateTree(tree);
  let newTree = structuredClone(deepToRaw(tree));
  // Find the source node, and remove it from the tree making a copy
  const sourceNode = structuredClone(findNode(newTree, id));
  if (!sourceNode) {
    throw new Error(`Could not find source node with id: ${id}`);
  }
  deleteNode(newTree, id);

  if (position === "LAST_CHILD" || position === "FIRST_CHILD") {
    const targetNode = findNode(newTree, targetId);
    if (!targetNode) {
      throw new Error(`Could not find target node with id: ${targetId}`);
    }
    targetNode.children = [
      ...(position === "FIRST_CHILD" ? [sourceNode] : []),
      ...(targetNode?.children || []),
      ...(position === "LAST_CHILD" ? [sourceNode] : []),
    ];
  } else if (position === "LEFT" || position === "RIGHT") {
    const parentNodeId = findParentOf("root", newTree, targetId);
    if (!parentNodeId) {
      throw new Error(`Could not find target node with id: ${targetId}`);
    }
    if (parentNodeId === "root") {
      const targetNodeIndex = newTree.findIndex((node) => node.id === targetId);
      if (targetNodeIndex === -1) {
        throw new Error(`Could not find target node with id: ${targetId}`);
      }
      if (position === "LEFT") {
        newTree.splice(targetNodeIndex, 0, sourceNode);
      } else {
        newTree.splice(targetNodeIndex + 1, 0, sourceNode);
      }
    } else {
      const parentNode = findNode(newTree, parentNodeId);
      if (!parentNode) {
        throw new Error(`Could not find target node with id: ${parentNodeId}`);
      }

      const targetNodeIndex =
        parentNode.children.findIndex((node) => node.id === targetId) +
        (position === "LEFT" ? 0 : 1);
      parentNode.children = [
        ...parentNode.children.slice(0, targetNodeIndex),
        sourceNode,
        ...parentNode.children.slice(targetNodeIndex),
      ];
    }
  } else {
    throw new Error(`Unknown position: ${position}`);
  }
  validateTree(newTree);
  return newTree;
};

export const deleteNodeFromTree: (
  tree: TreeItem[],
  id: string | number
) => TreeItem[] = (tree: TreeItem[], id: string | number) => {
  const newTree = structuredClone(deepToRaw(tree));
  deleteNode(newTree, id);
  return newTree;
};
