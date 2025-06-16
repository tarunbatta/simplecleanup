import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  FormGroup,
} from '@mui/material';

import CheckboxList from './CheckboxList';
import Button from './Button';
import AlertMessage from './AlertMessage';

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

const CleanUpApp: React.FC = () => {
  const startTime: number = new Date('01 January, 1970').getTime();
  const [badgeCounter, setBadgeCounter] = useState<number>(0);
  const [originTypes, setOriginTypes] =
    useState<chrome.browsingData.OriginTypes | null>(null);
  const [dataTypeSet, setDataTypeSet] = useState<DataTypeSet | null>(null);
  const [message, setMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState({
    bh: false,
    ca: false,
    co: false,
    dh: false,
    pd: false,
  });
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
    if (message.length === 0) {
      setShowAlert(false);
    }

    setCheckboxes({
      bh: false,
      ca: false,
      co: false,
      dh: false,
      pd: false,
    });

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
    if (typesToClean.hasOwnProperty('cacheStorage')) {
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
          setShowAlert(true);
          setMessage('Cleanup successful!!');
          init();
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

  const setObjectFlag = (obj: DataTypeSet, flag: boolean): DataTypeSet => {
    const newObj: DataTypeSet = { ...obj };
    Object.keys(newObj).forEach((key) => {
      if (key in newObj) {
        newObj[key as keyof DataTypeSet] = flag;
      }
    });
    return newObj;
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const handleCleanClick = () => {
    const selectedCheckboxes = Object.keys(checkboxes).filter(
      (key) => checkboxes[key as keyof typeof checkboxes],
    );

    if (selectedCheckboxes.length > 0 && dataTypeSet) {
      let typesToClean: DataTypeSet = setObjectFlag(dataTypeSet, false);

      selectedCheckboxes.forEach((checkboxValue) => {
        switch (checkboxValue) {
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
    } else if (selectedCheckboxes.length === 0) {
      setShowAlert(true);
      setMessage('Please select at least one option to clean');
    }
  };

  const handleCleanAllClick = () => {
    if (dataTypeSet) {
      const typesToClean: DataTypeSet = setObjectFlag(dataTypeSet, true);
      cleanCookie();
      cleanByType(typesToClean);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setMessage('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Simple CleanUp
      </Typography>
      <FormControl component="fieldset">
        <FormGroup>
          <CheckboxList
            checkboxes={checkboxes}
            historyCount={historyCount}
            cookieCount={cookieCount}
            downloadCount={downloadCount}
            handleCheckboxChange={handleCheckboxChange}
          />
          <Box mt={2}>
            <Button
              text="Clean"
              onClick={handleCleanClick}
              fullWidth
              sx={{ mb: 1 }}
            />
          </Box>
          <Box>
            <Button text="Clean All" onClick={handleCleanAllClick} fullWidth />
          </Box>
        </FormGroup>
      </FormControl>
      <AlertMessage
        message={message}
        show={showAlert}
        onClose={handleAlertClose}
      />
    </Container>
  );
};

export default CleanUpApp;
