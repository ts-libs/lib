import {removeItemFrom} from './array.ts';

type AllexEventHandler<T> = (args:T) => void | Promise<void>;

export class AllexEventItem<T> {
  private event: AllexEvent<T>;
  private handler: AllexEventHandler<T>;
  constructor(event: AllexEvent<T>,handler:AllexEventHandler<T>) {
    this.event = event;
    this.handler = handler;
  }
  destroy () {
    this.event.remove(this);
  }
  async invoke(args: T) {
    await this.handler(args);
  }  
}

export class AllexEvent<T> {
  private items: Array<AllexEventItem<T>> = new Array<AllexEventItem<T>>;
  constructor() {}
  attach(handler: AllexEventHandler<T>) : AllexEventItem<T> {
    const returnValue = new AllexEventItem<T>(this, handler);
    this.items.push(returnValue);
    return returnValue
  }
  remove(item: AllexEventItem<T>) {
    removeItemFrom(this.items, item);
  }
  async fire (args: T) {
    for(const item of this.items) {
      await item.invoke(args);
    }
  }
}