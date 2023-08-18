import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useConnection = () => {
  const [connected, setConnectionState] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionState(state.isConnected || false);
    });
    return () => {
      unsubscribe();
    };
  }, [setConnectionState, connected]);

  return connected;
};

export default useConnection;
