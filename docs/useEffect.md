# useEffect hook

## How to way to use like the lifecycle of class component
### Use like `compomentDidMount`
```js
/* When second argument is empty array. */
useEffect(()=>{/* do something */}, []);
```

### Use like `compomentDidMount` and `compomentDidUpdate`
```js
/* When second argument is none */
useEffect(()=>{/* do something */});
```

### Use like `componentWillUnmount`
```js
/* When second argument is none and return the function */
useEffect(()=>{
  /* do something */
  return () => {
    /**
     * possible to return the function. 
     * do something like 'componentWillUnmount'.
     */
  };
});
```

## Unique feature of useEffect
* Call function when only specific variable(or `State`) modified.
```js
useEffect( () => {
  /* This function is called when update the 'toDoList' only.
  /* do something */
}, [toDoList]);
```

## Etc.
* Can declare/use `useEffect` severally in a component. Thus, can use `useEffect` for `componentDidMount`, to used callback for specific `State`.
