# Todo List with TDD

Create react template with `typescript` and modules
```sh
# app project tdd-todo-list is written in typescript
npx create-react-app /app --template=typescript

cd app

# to use styled-components instead of css
npm install --save styled-components

# for development
# unit test for styled-components by jest
npm install --save-dev @types/styled-components jest-styled-components
# install husky(to use git-hook), lint-stated(to lint code), prettier (to manager source code format).
npm install --save-dev husky lint-staged prettier
```

Type a `.prettierrc.js` for `prettier`
* `prettier` is an opinionated code formatter
```js
module.exports = {
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
}
```
 
Edit `package.json`
```json
"...": {"...": "..."},
"script": {
  "..."
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "prettier --write"
  ]
},
"...": {"...": "..."},
```

Edit `tsconfig.json`
```json
{
  "compilerOptions": {
    "...": "...",
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "...": {"...": "..."}
}
```