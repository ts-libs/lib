import { Future, Defer } from "./defer.ts";

export abstract class Job<T> extends Defer<T> {
  async go() {
    try {
      this.resolve(await this.main());
    }
    catch (e) {
      this.reject(e);
    }
  }
  abstract main() : Promise<T>;
}

export class Queue {
  private q: Future[] = [];
  private notifierForNext: {():void} = () => this.doNext();
  run<T>(job: Job<T>): Promise<T> {
    job.setNotifiers(this.notifierForNext, this.notifierForNext);
    this.q.push(job);
    if (this.q.length == 1) {
      job.go();
    }
    return job.promise;
  }

  private doNext() {
    this.q.pop();
    if (this.q.length>0) {
      this.q[0].go();
    }
  }
}