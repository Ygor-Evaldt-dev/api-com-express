const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let page = 0;
let take = 4;

const isZeroPage = page <= 0;

const begin = page * take;
const end = (page + 1) * take;

console.log(list.slice(begin, end));
