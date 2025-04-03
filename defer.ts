type VoidFunctionType = {():void};
export class Future {
  protected onResolved:VoidFunctionType|undefined;
  protected onRejected:VoidFunctionType|undefined;
  setNotifiers(onResolved?:VoidFunctionType, onRejected?:VoidFunctionType) {
    this.onResolved = onResolved;
    this.onRejected = onRejected;
  }
  go(){}
}

export class Defer<T> extends Future {
  promise: Promise<T>;
  resolver: (r: T)=>void;
  rejecter: (e: any)=>void;
  constructor() {
    super();
    this.promise = new Promise<T>((resolver, rejecter) => {
      this.resolver = resolver;
      this.rejecter = rejecter;
    })
  }
  resolve(r:T): void {
    this.resolver(r);
    this.onResolved?.();    
  }
  reject(e:any): void {
    this.rejecter(e);
    this.onRejected?.();
  }
}