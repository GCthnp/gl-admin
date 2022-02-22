


export default function debounce(fun, wait) {
 let time;
 return args => {
  if (time) clearTimeout(time)
  time = setTimeout(fun, wait);
 }
} 