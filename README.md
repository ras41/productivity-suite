# Enterprise Productivity Suite - A React Native Todo & Checklist Application

ShopCardd is a mobile application built with React Native for managing tasks and checklists. It provides a clean interface to keep track of your to-dos and shopping lists, with support for light and dark themes.

## Features

- **Task Management**: Create, view, and manage your daily tasks.
- **Checklist Management**: Create and manage checklists for various purposes (e.g., shopping lists).
- **Theme Support**: Switch between light and dark themes for a comfortable viewing experience.
- **User Profile**: A dedicated screen for user profile information.
- **Settings**: Configure application settings.
- **Cross-Platform**: Runs on both Android and iOS devices.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Clone the repository

```sh
git clone https://github.com/ras41/productivity-suite.git
cd productivity-suite
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the Metro server & run Application

```sh
npx react-native run-android
```

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **Styling**: Styled Components (inferred from component structure)

## Project Structure and Design Principles

The project follows a modular architecture to separate concerns, making the codebase easier to navigate, maintain, and scale. The structure is influenced by principles like Atomic Design and the Container/Presentational pattern.

```
ShopCardd/
├── android/              # Android native project
├── ios/                  # iOS native project
├── src/
│   ├── components/
│   │   ├── atoms/        # Basic UI elements (e.g., Button, Input, Text)
│   │   ├── molecules/    # Combinations of atoms (e.g., FormField, SearchBar)
│   │   ├── organisms/    # Complex components using atoms and molecules (e.g., Header, TodoCard)
│   │   └── templates/    # Reusable screen layout structures (e.g., ScreenTemplate)
│   ├── hooks/            # Custom React hooks for reusable logic (e.g., useTheme, useFetchTodos)
│   ├── navigation/       # Navigation configuration using React Navigation
│   ├── screens/          # Application screens, separated by feature
│   ├── services/         # API layer for external communication
│   ├── store/            # Zustand stores for global state management
│   └── utils/            # Utility functions, constants, and helpers
├── App.tsx               # Root component of the application
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

### Design Principles

- **Atomic Design**: The `src/components` directory is organized based on the Atomic Design methodology to promote reusability and a consistent design system.

  - **Atoms**: The smallest possible components, such as buttons, text inputs, and labels. They are the foundational building blocks of the application.
  - **Molecules**: Simple combinations of atoms that form a functional unit. For example, a search bar molecule might consist of an input atom and a button atom.
  - **Organisms**: More complex UI components composed of molecules and/or atoms to form a distinct section of an interface, like a page header or a task card.
  - **Templates**: Define the layout and structure of a screen, providing a context for the components.

- **Container/Presentational Pattern**: Screens are often divided into two types of components:

  - **Container Components** (e.g., `TasksContainer.tsx`): Responsible for data fetching, state management, and other logic. They pass data and functions down to presentational components.
  - **Presentational Components** (e.g., `TasksScreen.tsx`): Focused solely on the UI and how data is displayed. They are "dumb" components that receive props and render UI accordingly.

- **Centralized State Management**: [Zustand](https://github.com/pmndrs/zustand) is used for managing global application state in a simple and scalable way. Each store (e.g., `tasksStore`, `themeStore`) handles a specific slice of the application's state.

- **Custom Hooks**: Reusable logic, such as form validation or data fetching, is extracted into custom hooks to keep components clean and adhere to the "Don't Repeat Yourself" (DRY) principle.
