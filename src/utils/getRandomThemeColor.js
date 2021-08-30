const colorArray = ["#E64A19", "#17bf63", "#e0245e", "#9C27B0", "#FFA333"];

function getRandomInt(n) {
  const max = n;
  return Math.floor(Math.random() * max);
}

export default function getRandomColor() {
  return colorArray[getRandomInt(colorArray.length)];
}
