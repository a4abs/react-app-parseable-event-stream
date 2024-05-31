import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import packageJson from "../../package.json";
import ParseableTransport from "../logger/parseable-transport";

const useTrackClicks = () => {
  const location = useLocation();

  useEffect(() => {
    // Track Click event
    const trackClick = (event) => {
      let target = event.target;
      // Traverse up the DOM tree until we find an element with the data-component-name attribute
      while (target && !target.dataset.componentName) {
        target = target.parentElement;
      }
      let componentName = "NA";
      if (target) {
        componentName = target.dataset.componentName;
      }

      const { innerText, className } = event.target;
      ParseableTransport.event({
        event: "click",
        component: componentName,
        class: className,
        content: innerText,
        appVersion: packageJson.version,
        userAgent: navigator.userAgent,
        pathname: location.pathname, // use react-router-dom
        level: "info",
        appId: "",
        IP: "", // You can add IP address of client (optional)
        message: `User Clicked on ${componentName} component`,
      });
    };

    // Add event listener for click events
    document.addEventListener("click", trackClick);

    return () => {
      document.removeEventListener("click", trackClick);
    };
  }, []);

  useEffect(() => {
    ParseableTransport.event({
      event: "pageview",
      appVersion: packageJson.version,
      userAgent: navigator.userAgent,
      pathname: location.pathname, // use react-router-dom
      level: "info",
      appId: "",
      IP: "", // You can add IP address of client (optional)
      message: `User on ${location.pathname} page`,
    });
  }, [location]);
};

export default useTrackClicks;
