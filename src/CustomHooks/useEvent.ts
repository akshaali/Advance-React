import { EventEmitters } from "../EventEmitters/EventEmitters";
const eventEmitter = new EventEmitters();

export const useEvent = () => {
  const addEventListener = (eventname: string, callback: (data: any) => void) => {
    eventEmitter.addEventListener(eventname, callback);
  };
  const removeEventListener = (eventname: string, callback: (data: any) => void) => {
    eventEmitter.removeEventListener(eventname, callback);
  };
  const emitEvent = (eventname: string, data?: any) => {
    eventEmitter.emitEvent(eventname, data);
  };
  return { addEventListener, removeEventListener, emitEvent };
};
