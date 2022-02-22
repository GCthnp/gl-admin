export function formetDate(time) {
 if(!time) return;
 let data = new Date(time)
 return (data.getFullYear() + "-" +
  (data.getMonth() + 1) + "-" +
  data.getDay() + " " +
  data.getHours() + ":" +
  data.getMinutes() + ":" +
  data.getSeconds())
}