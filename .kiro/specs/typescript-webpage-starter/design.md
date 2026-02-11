# Design Document: TypeScript Webpage Starter

## Overview

The TypeScript Webpage Starter is a minimal, beginner-friendly project template that demonstrates TypeScript fundamentals in a web context. The design prioritizes simplicity and educational value over production features, using standard Node.js tooling (TypeScript compiler, simple HTTP server) without complex bundlers or frameworks.

### Design Goals

- **Simplicity First**: Minimal dependencies, transparent build process
- **Educational**: Clear examples with explanatory comments
- **Standard Tooling**: Use TypeScript compiler directly, avoid magic
- **Optional Containerization**: Docker support without requiring it

## Architecture

### High-Level Structure

```
typescript-webpage-starter/
├── src/
│   └── main.ts              # TypeScript entry point
├── public/
│   ├── index.html           # Main HTML page
│   └── styles.css           # Stylesheet
├── dist/                    # Compiled output (generated)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── Dockerfile               # Docker container definition
├── docker-compose.yml       # Docker orchestration
└── README.md                # Documentation
```

### Build Pipeline

1. **Development Mode**: TypeScript watch mode + Node.js HTTP server
2. **Build Mode**: TypeScript compilation to dist/ directory
3. **Docker Mode**: Containerized development environment (optional)

### Technology Stack

- **TypeScript**: Type-safe JavaScript with compiler (tsc)
- **Node.js**: Runtime for development server and build scripts
- **http-server**: Simple, zero-configuration HTTP server (npm package)
- **Docker**: Optional containerization for environment consistency

## Components and Interfaces

### 1. TypeScript Configuration (tsconfig.json)

**Purpose**: Configure TypeScript compiler for beginner-friendly development

**Configuration**:
```typescript
{
  "compilerOptions": {
    "target": "ES2020",           // Modern JavaScript
    "module": "ES2020",           // ES modules
    "lib": ["ES2020", "DOM"],     // Include DOM types
    "outDir": "./dist",           // Output directory
    "rootDir": "./src",           // Source directory
    "strict": true,               // Enable all strict checks
    "esModuleInterop": true,      // CommonJS compatibility
    "skipLibCheck": true,         // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true             // Enable debugging
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Key Decisions**:
- `strict: true` enables all type checking for learning proper patterns
- `sourceMap: true` enables browser debugging
- `ES2020` target for modern browser features

### 2. Package Configuration (package.json)

**Purpose**: Define dependencies and npm scripts

**Dependencies**:
- `typescript`: TypeScript compiler
- `http-server`: Simple static file server
- `concurrently`: Run multiple commands simultaneously (for dev mode)

**Scripts**:
```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "serve": "http-server dist -p 3000 -o",
    "dev": "concurrently \"npm run watch\" \"npm run serve\""
  }
}
```

**Script Behavior**:
- `build`: Compile TypeScript once
- `watch`: Compile TypeScript on file changes
- `serve`: Start HTTP server on port 3000
- `dev`: Run watch and serve simultaneously

### 3. HTML Structure (public/index.html)

**Purpose**: Provide semantic HTML structure with TypeScript integration

**Structure**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Webpage Starter</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>TypeScript Webpage Starter</h1>
        <p>A simple starter project for learning TypeScript</p>
        
        <!-- Interactive elements for TypeScript examples -->
        <div class="demo-section">
            <input type="text" id="nameInput" placeholder="Enter your name">
            <button id="greetButton">Greet Me</button>
            <p id="greeting"></p>
        </div>
        
        <div class="demo-section">
            <button id="counterButton">Click Count: 0</button>
        </div>
    </div>
    
    <!-- Load compiled TypeScript -->
    <script type="module" src="main.js"></script>
</body>
</html>
```

**Key Features**:
- Semantic HTML5 structure
- Viewport meta tag for responsive design
- Module script loading for ES modules
- Interactive elements (input, buttons) for TypeScript examples

### 4. TypeScript Application (src/main.ts)

**Purpose**: Demonstrate TypeScript fundamentals with DOM manipulation

**Core Concepts Demonstrated**:
1. Type annotations
2. DOM element selection with null checking
3. Event listeners
4. Function types
5. Basic state management

**Implementation Structure**:
```typescript
// Type definitions
interface GreetingConfig {
    name: string;
    prefix: string;
}

// DOM element selection with null checking
function getElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element as T;
}

// Greeting functionality
function setupGreeting(): void {
    const nameInput = getElement<HTMLInputElement>('nameInput');
    const greetButton = getElement<HTMLButtonElement>('greetButton');
    const greetingDisplay = getElement<HTMLParagraphElement>('greeting');
    
    greetButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const greeting = createGreeting({ name, prefix: 'Hello' });
        greetingDisplay.textContent = greeting;
    });
}

function createGreeting(config: GreetingConfig): string {
    return config.name 
        ? `${config.prefix}, ${config.name}!` 
        : 'Please enter your name';
}

// Counter functionality
function setupCounter(): void {
    let count = 0;
    const counterButton = getElement<HTMLButtonElement>('counterButton');
    
    counterButton.addEventListener('click', () => {
        count++;
        counterButton.textContent = `Click Count: ${count}`;
    });
}

// Initialize application
function init(): void {
    setupGreeting();
    setupCounter();
    console.log('TypeScript application initialized!');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

**Educational Elements**:
- Inline comments explaining each concept
- Type-safe DOM manipulation
- Proper null checking patterns
- Event handling with closures
- Interface usage for structured data

### 5. Styling (public/styles.css)

**Purpose**: Provide clean, modern styling with CSS best practices

**Features**:
- CSS custom properties (variables)
- Responsive design with flexbox
- Mobile-first approach
- Clean, readable typography

**Structure**:
```css
:root {
    --primary-color: #3b82f6;
    --text-color: #1f2937;
    --bg-color: #f9fafb;
    --border-radius: 8px;
    --spacing: 1rem;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    padding: var(--spacing);
}

.container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Interactive elements */
button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    transition: opacity 0.2s;
}

button:hover {
    opacity: 0.9;
}

input[type="text"] {
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: var(--border-radius);
    font-size: 1rem;
    width: 100%;
    margin-bottom: var(--spacing);
}

.demo-section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
}

/* Responsive design */
@media (max-width: 640px) {
    .container {
        padding: 1rem;
    }
}
```

### 6. Development Server Setup

**Purpose**: Serve static files during development

**Implementation**: Use `http-server` npm package
- Zero configuration required
- Automatic MIME type detection
- CORS enabled for local development
- Serves from dist/ directory after compilation

**Server Configuration**:
- Port: 3000 (configurable)
- Auto-open browser on start
- Serves compiled JavaScript and static assets

### 7. Docker Configuration

**Purpose**: Provide optional containerized development environment

**Dockerfile**:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose development server port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  dev:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
```

**Key Features**:
- Node.js 18 Alpine (lightweight)
- Volume mounting for live code editing
- Port mapping for localhost access
- Preserves node_modules in container

## Data Models

### TypeScript Type Definitions

**GreetingConfig Interface**:
```typescript
interface GreetingConfig {
    name: string;
    prefix: string;
}
```
- Represents configuration for greeting generation
- Used to demonstrate interface usage

**DOM Element Types**:
- `HTMLInputElement`: Text input fields
- `HTMLButtonElement`: Interactive buttons
- `HTMLParagraphElement`: Text display elements

All DOM types are provided by TypeScript's built-in DOM library.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

