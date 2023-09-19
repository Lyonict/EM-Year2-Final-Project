import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export default function useFetch(url: string) {
  const [data, setData] = useState<AxiosResponse | null>(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      const fetchData = () => {
        axios.get(url)
        .then((response) => {
          setData(response)
        })
        .catch((err) => {
          setError(err)
        })
      }

      fetchData()
    }
  }, [url])

  return {data, error}
}
