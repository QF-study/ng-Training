export function sliderEvent(e: Event) {
  e.stopPropagation();   //阻止冒泡
  e.preventDefault();   //阻止默认事件
}