# FileTree Explorer

Frontend application for visualizing and navigating a file tree structure provided as JSON.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

🧠 Architecture Decisions

1. Data Model

Tree is modeled as a discriminated union:

```typescript
type FileNode = {
  name: string;
  type: 'file';
  size: number;
};

type FolderNode = {
  name: string;
  type: 'folder';
  children: TreeNode[];
};

type TreeNode = FileNode | FolderNode;
```

This allows:

- type-safe narrowing
- clean recursion
- no unsafe casting

2. Recursive Rendering

Tree is rendered using a recursive component (TreeNode), which handles:

- folder expansion
- child rendering
- path propagation

Same recursion pattern is reused for:

search (DFS)
folder size calculation
node lookup

3. Node Identification

Each node is identified by its full path, e.g.: root/src/components/Button.tsx

4. Routing Strategy

Routes:

```code
/ → input
/tree → tree view
/tree/* → node details
```

Splat route is used to support nested paths with /.

6. Search

Search is implemented using DFS traversal.

Characteristics:

case-insensitive
matches by node name
returns full path for each result

Search results are derived from tree + query

### Known limitations

- Node path uniqueness depends on unique names within the same folder
- Very large trees are not optimized (no virtualization)
- a11y not implemented which could be not optimal 
  - aria-expanded for folder toggles
  - semantic buttons and labels
  - keyboard navigation (not implemented)

### What I Would Improve With More Time

- Add virtualization for large trees (performance)
- Implemented full a11y
- Improved UX by more UI functions ( total storage etc. )
