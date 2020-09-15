import { Once } from '../utils/once';

const once = new Once();
let registered = false;

/**
 * online になったらコールされる関数を登録する
 */
export function onOnline(defaultView: Window | null, callback: Function) {
  once.add(callback);
  if (registered || !defaultView) return;
  defaultView.addEventListener('online', () => {
    once.emit();
  });
  registered = true;
}
