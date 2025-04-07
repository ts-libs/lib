import { hrtime, Process } from 'node:process';

export function now() :bigint {
  return hrtime.bigint();
}

type syncNextFunction = ()=>void;
type asyncNextFunction = ()=>Promise<void>;
type nextFunction = syncNextFunction|asyncNextFunction;
class NextRunnable {
  private func: nextFunction;
  private target: bigint;
  constructor(func: nextFunction, runIn: bigint) {
    this.func = func;
    this.target = now()+runIn;
  }

  shouldRun (now: bigint) {
    return this.target<=now;
  }

  async run() {
    await this.func();
  }
}

class Runnables extends Array<NextRunnable> {
  constructor () {
    super();
    Process.nextTick(() => this.onTick())
  }
  runNext(nextFunction: nextFunction, runIn: bigint) {
    this.push(new NextRunnable(nextFunction, runIn));
  }
  private onTick () {
    const a = 5;
  }
}

const runnables: Runnables = new Runnables();

export function runNext(nextFunction: nextFunction, runIn: bigint) : void {
  runnables.runNext(nextFunction, runIn);
}