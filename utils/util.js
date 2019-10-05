const formatDateAndTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/');
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':') ;
}

const greetings = () =>{
  var date = new Date();
  const hour = date.getHours();
  if(6<=hour&&hour<9)
  return "早上好";
  if (9 <= hour && hour<11)
  return "上午好";
  if (11 <= hour && hour<13)
  return "午安"
  if (13 <= hour && hour<18)
  return "下午好"
  if ((18 <= hour && hour <= 23))
  return "晚上好"
  if (0 <= hour && hour < 6)
  return "夜深了"
}

module.exports = {
  formatTime: formatTime,
  formatDateAndTime: formatDateAndTime,
  formatDate: formatDate,
  greetings: greetings
}
