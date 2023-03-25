import { useEffect, useRef, useState } from "react"

export const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const activeHttpRequests = useRef<AbortController[]>([]);
  const sendRequest = async (
    url: string,
    method: 'POST' | 'GET' = 'GET',
    body?: BodyInit,
    headers: HeadersInit = {},
  ) => {
    setIsLoading(true);
    const httpAbortController = new AbortController();
    activeHttpRequests.current.push(httpAbortController);
    try {
      const response = await fetch(url, {
        method, body, headers,
        signal: httpAbortController.signal,
      });
      const data = await response.json();
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortController
      );
      if (!response.ok) {
        alert(data.message);
        throw new Error(data.messsage);
      }

      setIsLoading(false);
      return data;

    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);

      throw error;
    }
  };
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(val => val.abort());
    }
  }, []);
  const clearError = () => setError(undefined);
  return { isLoading, error, sendRequest, clearError };
}