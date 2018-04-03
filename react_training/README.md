# Advanced React Training Notes

### Implicit state with Compound Components and cloneElement


If you have a return like this –

```js
return (
	<div className="tabs">
		{tabs} // <~ some function that returns jsx
		{panel}
	</div>	
)
```

`{tabs}` and `{panel}` can be replaced with an array like so –

```js
return (
	<div className="tabs">
		{[tabs, panel]}
	</div>	
)
```

This looks nice when you conditionally render elements –

```js
return (
	<div className="tabs">
		{tabsOnBottom ? [panel, tabs] : [tabs, panel]}
	</div>	
)
```

**Problem**: You have a component where everytime you use it you are adding a new prop. It's constantly getting tweaked to accomidate another use case.

Instead of making a component that takes a bunch of props perhaps we can **compose** the UI together. Rather than having one big component we can have a bunch of small components when compounded together give us the result we're looking for.

SO, instead of rendering the `Tabs` component like this –

```js

<Tabs
  data={tabData}
  tabsOnBottom={true}
  disabled={[1]}
/>

```

We could do something like this –

```
<Tabs>
  <TabList>
    <Tab><FaAutomobile/></Tab>
    <Tab><FaPlane/></Tab>
    <Tab><FaSpaceShuttle/></Tab>
  </TabList>
  <TabPanels>
    <TabPanel>{text.cars}</TabPanel>
  </TabPanels>
</Tabs>
```

This makes it really easy to, say, move your `TabList` to the bottom if you want.

```
<Tabs>
  <TabPanels>
    <TabPanel>{text.cars}</TabPanel>
  </TabPanels>
  <TabList>
  <Tab><FaAutomobile/></Tab>
  <Tab><FaPlane/></Tab>
  <Tab><FaSpaceShuttle/></Tab>
  </TabList>
</Tabs>
```

If you want to disable a tab, rather than indirectly passing in a array of indecies you could just put it on the `<Tab>`.

```html
<TabList>
  <Tab><FaAutomobile/></Tab>
  <Tab isDisabled><FaPlane/></Tab>
  <Tab><FaSpaceShuttle/></Tab>
</TabList>
```
**Implicit State** – state that lives within a UI component which the app developer using the component doesn't need to see.

The `Tabs` component will look something like this —

```jsx
class Tabs extends Component {
  state = {
    activeIndex: 0
  }

  selectTabIndex(activeIndex) {
    this.setState({ activeIndex })
  }

  render() {
    return (
     <div className="tabs">
      {this.props.children}
     </div>
    )
  }
}

```

We will need to pass the `activeIndex` state down from the `Tabs` component to the `Tab` component

You can do this by modifying your children to include the `activeIndex` state. using `Children.map` and `React.cloneElement`


```js
class Tabs extends Component {
  state = {
    activeIndex: 0
  }

  selectTabIndex(activeIndex) {
    this.setState({ activeIndex })
  }

  render() {
    const children = React.Children.map(this.props.children, {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex  
      })
    })

    return (
     <div className="tabs">
      {children}
     </div>
    )
  }
}

```

We are cloning the children (`TabList` and `TabPanels`) in `Tabs` and **implicitly** passing the activeIndex state down to them.

You can do something similar in `TabList` to pass the activeIndex to the `Tab` component.

```js
class TabList extends Component {
  render() {
    const { activeIndex } = this.props
    const children = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          onSelect: () => this.props.OnSelectTab(index) // <~ You can also implicitly pass click handlers
        })  
      }
    )
    return (
      <div className="tabs">
        {children}  
      </div>
    )
  }
}

```

Then modify the click handler in `Tabs` to change state – 

```js
class Tabs extends Component {
  state = {
    activeIndex: 0
  }

  selectTabIndex = (activeIndex) => { // <~ change this to a instance method making this correct. Class property initializer
    this.setState({ activeIndex })
  }

  render() {
    const children = React.Children.map(this.props.children, {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        onSelectTab: this.selectTabIndex // <~ pass callback down
      })
    })

    return (
     <div className="tabs">
      {children}
     </div>
    )
  }
}

```

This pattern is called **compound components**. Allows you to create reusable components with **decomposable** pieces.
