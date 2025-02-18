'use client';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

const LenisPrevent = () => {
  const lenis = useLenis();
  useEffect(() => {
    // Function to handle adding attributes and event listeners
    const handleElementFound = (element: Element) => {
      const el = document.createAttribute('data-lenis-prevent');
      element.setAttributeNode(el);
    };

    // Function to handle removing attributes and event listeners
    const handleElementCleanup = (element: Element) => {
      element.removeAttribute('data-lenis-prevent');
    };

    const observer = new MutationObserver(() => {
      const element = document.querySelector('.rizzui-select-options');

      if (element) {
        handleElementFound(element);
      } else {
        // If element is removed, clean up
        const previousElement = document.querySelector('[data-lenis-prevent]');
        if (previousElement) {
          handleElementCleanup(previousElement);
        }
      }
    });

    // Observe the body for added/removed child elements
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [lenis]);

  return null;
};

export default LenisPrevent;
