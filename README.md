# JSON Tree Visualizer

An interactive web application that **transforms raw JSON data into an intuitive hierarchical tree structure**, allowing users to explore, search, and interact with data visually — in real time.

## 🔗 Live Demo

[https://json-visualizer-mu.vercel.app/](https://json-visualizer-mu.vercel.app/) 

---

## 📘 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Getting Started](#getting-started)
* [How It Works](#how-it-works)
* [Component Structure](#component-structure)
* [React Flow Implementation](#react-flow-implementation)
* [Usage Guide](#usage-guide)
* [Future Enhancements](#future-enhancements)
* [License](#license)

---

## 🧩 Overview

**JSON Tree Visualizer** is a browser-based tool that helps developers, data scientists, and analysts **understand and debug complex JSON structures** with ease.
It automatically parses and validates JSON, then renders a **node-based tree graph** using React Flow — where each key, value, and nested object becomes an interactive visual node.

---

## ⚙️ Features

### 🔍 Core Functionality

* **Real-time JSON Validation** — Instantly detect syntax errors and receive friendly error messages.
* **Interactive Tree Rendering** — Explore your JSON through a clear, node-based tree layout powered by React Flow.
* **JSONPath Search** — Quickly locate nodes using JSONPath-like queries with instant highlighting.
* **Dark/Light Mode** — Seamless theme toggle for all-day coding comfort.
* **Copy Node Path** — Click any node to copy its JSON path to clipboard.
* **Zoom & Pan Controls** — Effortlessly navigate even the largest data structures.

### 🎨 Visual Differentiation

* **Objects** → Blue/Indigo gradient
* **Arrays** → Green/Emerald gradient
* **Primitives** → Orange/Amber gradient (for strings, numbers, booleans, null)
* **Search Highlights** → Bright yellow glow + scale animation

---

## 🛠️ Tech Stack

### Frontend

* **React 19.1.1** – Component-based UI framework
* **Vite 7.1.7** – Fast development server and bundler

### Visualization

* **React Flow 11.11.4** – Interactive graph visualization library

### Styling

* **Tailwind CSS 3.4.1** – Utility-first styling framework
* **PostCSS & Autoprefixer** – CSS transformations and cross-browser compatibility

### Icons

* **Lucide React 0.548.0** – Modern, clean icon library

---

## 🧠 Architecture

### Application Flow

```
![JSON Visualization Process](https://github.com/Adyasha56/JSON_Visualizer/blob/main/src/assets/json-tree-visualization.png?raw=true)


```

### Data Flow

1. **Input Stage** – User pastes or types JSON.
2. **Validation Stage** – JSON.parse() ensures correct syntax.
3. **Transformation Stage** – Tree builder recursively constructs nodes and edges.
4. **Rendering Stage** – React Flow renders a visual graph.
5. **Interaction Stage** – Search, zoom, pan, and node interactions are handled dynamically.

---

## 🚀 Getting Started

### Prerequisites

* Node.js v16+
* npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd json-tree-visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build

# Preview production build
npm run preview
```

Server runs at `http://localhost:5173` by default.

---

## 🧩 How It Works

### 1. JSON Parsing & Validation

Validates user input before visualization:

```javascript
try {
  const data = JSON.parse(jsonInput);
} catch (err) {
  setError('Invalid JSON: ' + err.message);
}
```

### 2. Tree Construction Algorithm

The `buildTree` function recursively processes JSON:

* Identify node type (object, array, primitive)
* Assign unique IDs
* Establish parent-child connections
* Position nodes hierarchically

### 3. Layout Strategy

```
- Y-axis → Depth Level
- X-axis → Child Distribution
- Parent Centered above children
```

### 4. Edge Creation

Each edge links parent and child:

```javascript
{
  id: 'edge-parent-child',
  source: 'parent-id',
  target: 'child-id',
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed }
}
```

---

## 🧱 Component Structure

```
src/
├── components/
│   ├── CustomNode.jsx
│   ├── JsonInput.jsx
│   ├── SearchPanel.jsx
│   ├── TreeView.jsx
│   └── JsonTreeVisualizer.jsx
├── utils/
│   └── treeBuilder.js
├── App.jsx
└── main.jsx
```

### Responsibilities

* **CustomNode.jsx** – Node rendering, type-based styling, and interaction handling
* **JsonInput.jsx** – JSON input + validation controls
* **SearchPanel.jsx** – Search interface and logic
* **TreeView.jsx** – React Flow setup and event handling
* **JsonTreeVisualizer.jsx** – Core orchestrator, state manager

---

## 🌐 React Flow Implementation

* Custom node types via `useMemo`
* Edge definitions with smooth transitions
* Built-in controls for zoom and view management
* Highlighted node animation during search

---

## 🧭 Usage Guide

1. **Input JSON** → Paste or write your JSON.
2. **Visualize** → Click *View* to render.
3. **Navigate** → Scroll to zoom, drag to pan.
4. **Search** → Type JSONPath (e.g., `$.user.name`).
5. **Interact** → Click nodes to copy path.
6. **Toggle Theme** → Use the light/dark switch.

### Example JSONPath Queries

```
$.user.name           → user’s name  
$.items[0].price      → price of first item  
$.address.city        → nested object property  
```

---

## 🧩 Supported Data Types

* Objects `{ }`
* Arrays `[ ]`
* Strings `"text"`
* Numbers `42`
* Booleans `true / false`
* Null `null`
* Nested combinations

---

## ⚡ Performance Notes

* Handles up to ~1000 nodes smoothly
* Deeply nested (>20 levels) JSONs may impact render speed
* Search optimized using in-memory data indexing

---

## 🌱 Future Enhancements

* Export tree as PNG/SVG
* Collapsible node groups
* Node filtering by type
* In-tree JSON editing
* Schema validation
* JSON comparison mode

---

## 🙌 Acknowledgments

* **React Flow** for visualization backbone
* **Tailwind CSS** for sleek styling
* **Lucide React** for icons


