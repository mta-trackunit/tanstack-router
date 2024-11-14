import { act } from "@testing-library/react";

/**
 * Flushes all promises in the queue.
 * This is useful when testing async code.
 *
 * @param waitTimeInMS - The amount of time to wait before resolving the promise.
 * @returns {Promise<void>} - Returns a promise that resolves after the wait time.
 */
export const flushPromises = (waitTimeInMS = 0) => {
  return new Promise(resolve => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((global as any).ORG_setTimeout) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (global as any).ORG_setTimeout(() => (global as any).ORG_setTimeout(resolve, waitTimeInMS), 1);
    } else {
      setTimeout(() => setTimeout(resolve, waitTimeInMS), 1);
    }
  });
};

/**
 * Flushes all promises in the queue.
 * This is useful when testing async code.
 *
 * @param waitTimeInMS - The amount of time to wait before resolving the promise.
 * @returns {Promise<void>} - Returns a promise that resolves after the wait time.
 */
export const flushPromisesInAct = (waitTimeInMS = 0) => {
  return act(() => {
    return new Promise(resolve => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((global as any).ORG_setTimeout) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (global as any).ORG_setTimeout(() => (global as any).ORG_setTimeout(resolve, waitTimeInMS), 1);
      } else {
        setTimeout(() => setTimeout(resolve, waitTimeInMS), 1);
      }
    });
  });
};