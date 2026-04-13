export default function TetrisBlock({ color }: { color: number }) {
  const classes = `${color === 0 ? 'blank-' : ''}tetris-block color-${color}`;
  return <div className={classes} />;
}
