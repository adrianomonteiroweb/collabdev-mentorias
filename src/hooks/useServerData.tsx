"use client";

import { useCallback, useEffect, useState } from "react";

export function useServerData(serverAction: any, params: any = {}) {
  const [data, setData]: any = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const params_data = JSON.stringify(params);

  const fetchData = useCallback(() => {
    serverAction(JSON.parse(params_data))
      .then(({ data, count }: any) => {
        setData(data);
        setCount(count);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serverAction, params_data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = () => {
    setLoading(true);
    fetchData();
  };

  return { ...data, count, loading, refresh };
}

export default useServerData;
