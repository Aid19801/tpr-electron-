import { INET_CONNECTED, INET_DISCONNECTED } from './types';

export const isDisconnected = () => {
    return {
      type: INET_DISCONNECTED,
    }
}
export const isConnected = () => {
    return {
      type: INET_CONNECTED,
    }
}
