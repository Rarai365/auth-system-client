import { useState } from "react";

const useLaoder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
  };
};

export default useLaoder;
