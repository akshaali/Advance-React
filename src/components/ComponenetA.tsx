import React from "react";

interface ComponentAState {
  hasError: boolean;
}

interface ComponentAProps {
  children: React.ReactNode;
}

class ComponentA extends React.Component<ComponentAProps, ComponentAState> {
  state: ComponentAState = { hasError: false };

  static getDerivedStateFromError(error: Error): ComponentAState {
    console.log("getDerivedStateFromError called in ComponentA:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Error caught in ComponentA:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong in a child component.</div>;
    }

    return <div>Hellllooooo component A{this.props.children}</div>;
  }
}

export default ComponentA;

// also export the inner component so it can be wrapped by the boundary from outside
export { ComponentB };

// this component will intentionally throw during render when the "explode" state flips
interface ComponentBState {
  explode: boolean;
}

class ComponentB extends React.Component<{}, ComponentBState> {
  state: ComponentBState = { explode: false };

    static getDerivedStateFromError(error: Error): ComponentBState {
    console.log("getDerivedStateFromError called in ComponentB:", error);
    return { explode: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Error caught in ComponentB:", error, errorInfo);
  }

  render() {
    if (this.state.explode) {
      // this error happens during render, so it *will* be caught by the nearest error boundary
      throw new Error("ComponentB crashed during render");
    }

    return (
      <div
        onClick={() => this.setState({ explode: true })}
        style={{ cursor: "pointer", border: "1px solid #ccc", padding: "8px" }}
      >
        Click me to make B explode (render error)
      </div>
    );
  }
}
