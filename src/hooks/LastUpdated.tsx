import {useDeferredValue, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function useLastUpdated(lastFetched: Date): string | null {
  const [lastUpdate, setLastUpdated] = useState<null | string>(null);

  useEffect(() => {
    let timer = setInterval(() => {
      var today = dayjs(new Date());

      setLastUpdated(dayjs(lastFetched).from(today));
    }, 15000);

    return () => clearInterval(timer);
  }, [lastFetched]);

  return useDeferredValue(lastUpdate);
}

export default useLastUpdated;
