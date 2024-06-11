import { io } from 'socket.io-client';

export const socket = io('https://apimmievent.alwaysdata.net', {
  autoConnect: true,
});

socket.onAny((event, ...args) => {
  console.log('event received', event, args);
});
