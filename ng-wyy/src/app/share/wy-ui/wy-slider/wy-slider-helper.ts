export function sliderEvent(e: Event) {
  e.stopPropagation();   //阻止冒泡
  e.preventDefault();   //阻止默认事件
}

export function getElementOffset(el : HTMLElement):{ top:number, left: number}{
  //getClientRects()  返回一个数组，每一项都是getBoundingClientRect()的成员
  if(!el.getClientRects().length){
    return {
      top: 0,
      left : 0
    }
  }

  const rect = el.getBoundingClientRect();  //返回dom的位置信息
  const win = el.ownerDocument.defaultView;  //返回Document所在的window对象
  return {
    top: rect.top + win!.pageYOffset,
    left: rect.left + win!.pageXOffset
  }

}