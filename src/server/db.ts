let count = 0;

export const db = {
  async getCount() {
    return count;
  },
  async setCount(nextCount: number) {
    console.log(nextCount);
    return (count = nextCount);
  },
};
