import React, { Component } from "react";

import ParseableTransport from "../logger/parseable-transport";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    ParseableTransport.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ color: "#FFFFFF" }}>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
