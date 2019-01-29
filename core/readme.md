### Development Workflow

#### 1. Run Dev Server

```bash
# Move to the core folder
cd core

# Run dev server
npm start
```

You should be able to navigate to `http://localhost:3333` which will look like a file browser.

E2E tests are located inside the `src/component` folder, in the following way: `http://localhost:3333/src/components/{COMPONENT}/test/`


**Path examples:**

- ActionSheet basic test: http://localhost:3333/src/components/action-sheet/test/basic
- Nav basic test: http://localhost:3333/src/components/nav/test/basic
- Button basic test:
http://localhost:3333/src/components/button/test/basic


**IMPORTANT**

Leave the dev server running in the background while you make changes. The dev server listen for changes and automatically recompile Ionic for you.



#### 2. Open `core` folder in your IDE

Components implementations live inside the `core/src/components` folder.

You can find each ionic component inside their directory.
