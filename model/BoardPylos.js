
/*const fourSquares = ([h,i,j]) => (
  [
    [[h,i,j], [h,i+1,j], [h,i+1,j+1], [h,i,j+1]],
    [[h,i,j], [h,i-1,j], [h,i-1,j+1], [h,i,j+1]],
    [[h,i,j], [h,i-1,j], [h,i-1,j-1], [h,i,j-1]],
    [[h,i,j], [h,i+1,j], [h,i+1,j-1], [h,i,j-1]]
  ]
)*/



/*background.onload = function(){
    ctx.drawImage(background,0,0);   
}*/


/*const beginPath = ctx => {
  ctx.beginPath()
  return ctx
}
const closePath = ctx => {
  ctx.closePath()
  return ctx
}
const rect = (startX, startY, width, height) => ctx => {
  ctx.rect(startX, startY, width, height)
  return ctx
}
const arc = (centerX, centerY, radius, startingAngle = 0, endingAngle = 2 * Math.PI, counterclockwise = false) => ctx => {
    ctx.arc(centerX, centerY, radius, startingAngle, endingAngle, counterclockwise);
    return ctx
}
const fill = color => ctx => {
  ctx.fillStyle = color
  ctx.fill()
  return ctx
}
const stroke = (strokeStyle, lineWidth = 1) => ctx => {
  const backups = [ctx.strokeStyle, ctx.lineWidth]
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke()
  ctx.strokeStyle = backups[0];
  ctx.lineWidth = backups[1];
  return ctx
}
const font = fnt => ctx => {
    ctx.font = fnt
    return ctx
}
const fillText = (text, x, y) => ctx => {
    ctx.fillText(text, x, y)
    return ctx
}
const textAlign = align => ctx => {
    ctx.textAlign = align
    return ctx
}
const textBaseline = baseline => ctx => {
    ctx.textBaseline = baseline
    return ctx
}

const translate = (dx, dy) => ctx => {
  ctx.translate(dx, dy)
  return ctx
}

const clear = ctx => {
  const canvas = ctx.canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return ctx
}

const drawText = ({ text, x, y, fnt, align = 'center', baseline = 'middle', color = '#000' }) => R.pipe(
    beginPath,
    textAlign(align),
    textBaseline(baseline),
    font(fnt),
    fill(color),
    fillText(text, x, y),
    closePath
)

const circle = ({ centerX, centerY, radius, color, strokeColor, strokeWidth }) => R.pipe(
    beginPath,
    arc(centerX, centerY, radius),
    fill(color),
    strokeColor && strokeWidth ? stroke(strokeColor, strokeWidth) : R.identity,
    closePath
)

const rectangle = ({ startX, startY, width, height, color, strokeColor, strokeWidth }) => R.pipe(
    beginPath,
    rect(startX, startY, width, height),
    fill(color),
    strokeColor && strokeWidth ? stroke(strokeColor, strokeWidth) : R.identity,
    closePath
)

const roundRectangle = ({ startX, startY, width, height, radius, color }) => R.pipe(
    circle({
        centerX: startX + radius,
        centerY: startY + radius,
        radius,
        color
    }),
    circle({
        centerX: startX + width - radius,
        centerY: startY + radius,
        radius,
        color
    }),
    circle({
        centerX: startX + width - radius,
        centerY: startY + height - radius,
        radius,
        color
    }),
    circle({
        centerX: startX + radius,
        centerY: startY + height - radius,
        radius,
        color
    }),
    rectangle({
        startX: startX + radius,
        startY,
        width: width - 2*radius,
        height,
        color
    }),
    rectangle({
        startX,
        startY: startY + radius,
        width,
        height: height - 2*radius,
        color
    })
)

const dimensions = ctx => ({ width: ctx.canvas.width/window.devicePixelRatio, height: ctx.canvas.height/window.devicePixelRatio })
*/