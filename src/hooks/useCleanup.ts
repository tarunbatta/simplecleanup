import { useState, useEffect } from 'react';

type DataTypeSet = {
  appcache?: boolean;
  cache?: boolean;
  cacheStorage?: boolean;
  cookies?: boolean;
  downloads?: boolean;
  fileSystems?: boolean;
  formData?: boolean;
  history?: boolean;
  indexedDB?: boolean;
  localStorage?: boolean;
  passwords?: boolean;
  pluginData?: boolean;
  serverBoundCertificates?: boolean;
  serviceWorkers?: boolean;
  webSQL?: boolean;
};

export const useCleanup = () => {
  const startTime: number = new Date('01 January, 1970').getTime();
  const [badgeCounter, setBadgeCounter] = useState<number>(0);
  const [originTypes, setOriginTypes] =
    useState<chrome.browsingData.OriginTypes | null>(null);
  const [dataTypeSet, setDataTypeSet] = useState<DataTypeSet | null>(null);
  const [historyCount, setHistoryCount] = useState<number>(0);
  const [cookieCount, setCookieCount] = useState<number>(0);
  const [downloadCount, setDownloadCount] = useState<number>(0);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    updateBadge();
  }, [badgeCounter]);

  const init = () => {
    setBadgeCounter(0);
    chrome.browsingData.settings((response) => {
      if (response.options.originTypes) {
        setOriginTypes(response.options.originTypes);
      }
      setDataTypeSet(response.dataRemovalPermitted as DataTypeSet);
    });
    getBrowsingHistory();
    getCookie();
    getDownloadHistory();
  };

  const cleanByType = (typesToClean: DataTypeSet) => {
    if (Object.prototype.hasOwnProperty.call(typesToClean, 'cacheStorage')) {
      delete typesToClean.cacheStorage;
    }

    if (dataTypeSet && originTypes) {
      chrome.browsingData.remove(
        {
          since: startTime,
          originTypes: originTypes,
        },
        typesToClean,
        () => {
          setBadgeCounter(0);
          setTimeout(() => {
            init();
          }, 100);
        },
      );
    }
  };

  const cleanCookie = () => {
    chrome.cookies.getAll({}, (cookies: chrome.cookies.Cookie[]) => {
      cookies.forEach((cookie) => {
        if (cookie) {
          const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
          chrome.cookies.remove({ url, name: cookie.name });
        }
      });
    });
  };

  const updateBadge = () => {
    if (chrome.action) {
      chrome.action.setBadgeText({ text: badgeCounter.toString() });
    }
  };

  const getBrowsingHistory = () => {
    chrome.history.search(
      {
        text: '',
        startTime: startTime,
      },
      (results: chrome.history.HistoryItem[]) => {
        setHistoryCount(results.length);
        setBadgeCounter((prevCount) => prevCount + results.length);
      },
    );
  };

  const getCookie = () => {
    chrome.cookies.getAll({}, (cookies: chrome.cookies.Cookie[]) => {
      setCookieCount(cookies.length);
      setBadgeCounter((prevCount) => prevCount + cookies.length);
    });
  };

  const getDownloadHistory = () => {
    chrome.downloads.search({}, (results: chrome.downloads.DownloadItem[]) => {
      setDownloadCount(results.length);
      setBadgeCounter((prevCount) => prevCount + results.length);
    });
  };

  const setObjectFlag = (obj: DataTypeSet, flag: boolean): DataTypeSet => {
    const newObj: DataTypeSet = { ...obj };
    Object.keys(newObj).forEach((key) => {
      if (key in newObj) {
        newObj[key as keyof DataTypeSet] = flag;
      }
    });
    return newObj;
  };

  const handleCleanup = (selectedTypes: string[]) => {
    if (selectedTypes.length > 0 && dataTypeSet) {
      const typesToClean: DataTypeSet = setObjectFlag(dataTypeSet, false);

      selectedTypes.forEach((type) => {
        switch (type) {
          case 'bh':
            typesToClean.history = true;
            break;
          case 'ca':
            typesToClean.appcache = true;
            typesToClean.cache = true;
            typesToClean.cacheStorage = true;
            break;
          case 'co':
            cleanCookie();
            typesToClean.cookies = true;
            break;
          case 'dh':
            typesToClean.downloads = true;
            break;
          case 'pd':
            typesToClean.fileSystems = true;
            typesToClean.formData = true;
            typesToClean.indexedDB = true;
            typesToClean.localStorage = true;
            typesToClean.passwords = true;
            typesToClean.pluginData = true;
            typesToClean.serverBoundCertificates = true;
            typesToClean.serviceWorkers = true;
            typesToClean.webSQL = true;
            break;
        }
      });

      cleanByType(typesToClean);
      return true;
    }
    return false;
  };

  const handleCleanAll = () => {
    if (dataTypeSet) {
      const typesToClean: DataTypeSet = setObjectFlag(dataTypeSet, true);
      cleanCookie();
      cleanByType(typesToClean);
      return true;
    }
    return false;
  };

  const refreshCounts = () => {
    setBadgeCounter(0);
    getBrowsingHistory();
    getCookie();
    getDownloadHistory();
  };

  return {
    historyCount,
    cookieCount,
    downloadCount,
    handleCleanup,
    handleCleanAll,
    refreshCounts,
  };
};
