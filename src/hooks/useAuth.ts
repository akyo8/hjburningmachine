import { useWeb3React } from '@web3-react/core';
import { connectorsByName } from '../utils/web3React';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = async (connectorID: any) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
      activate(connector, (error: Error) => {
        console.log(error.name, error.message);
      });
    } else {
      console.log("Can't find connector", 'The connector config is wrong');
    }
  };

  return { login, logout: deactivate };
};

export default useAuth;
