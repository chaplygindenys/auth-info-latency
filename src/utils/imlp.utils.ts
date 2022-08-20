import { inspect } from 'util';

interface SetGet {
  get(): string;
  set(data: string): void;
}

abstract class Utils implements SetGet {
  private data: string;
  constructor(data: string) {
    this.data = data;
  }
  get() {
    return this.data;
  }
  set(data: string): void {
    this.data = data;
  }
  show(data: any) {
    console.log(typeof data);

    if (typeof data === 'undefined') {
      console.log('undefinet');
      data = this.data;
    }
    if (typeof data === 'function') {
      console.log('function');

      const resaalt = async () => {
        const resalt = await data();
        return resalt;
      };
      show(resaalt);
    } else if (typeof data === 'object') {
      console.log(inspect(data, true, null, true));
      const values = async () => {
        const resalt = await data;
        console.log(inspect(resalt, true, null, true));
        return resalt;
      };
      if (typeof values === 'function') {
        values();
      }
    } else {
      console.log(data);
    }
  }
}

class Log extends Utils {}
const tolls = new Log('data');

export const show = (data: any) => tolls.show(data);
