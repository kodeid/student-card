import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import http from '../helper/http';

export default function useFetch(url, payload) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const options = {
        method: 'get',
        url: url,
      };

      if (payload) {
        options.method = payload.method;
        if (payload.data) {
          options.data = payload.data;
        }
      }

      const {
        data: { data },
      } = await http(options);

      if (data) {
        setData(data);
        setIsLoading(false);
        return data;
      } else {
        throw new Error('no data');
      }
    } catch (error) {
      let msg = error?.response?.data?.message || 'Ups Error';
      toast(msg, { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (url && !payload) {
      fetchData();
    }
  }, [url]);

  return {
    data,
    isLoading,
    fetchData,
  };
}
