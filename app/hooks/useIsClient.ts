import { useEffect, useState } from 'react';

/**
 * Function from: https://medium.com/@szz185/fixing-react-hydration-mismatch-with-redux-in-next-js-app-router-28e5118b8f0f
 */

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}
