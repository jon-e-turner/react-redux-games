export default function GameTile({
  isSelected,
  onClick,
  iconName,
}: {
  isSelected: boolean;
  onClick: () => void;
  iconName: string;
}) {
  const className = `game-tile ${isSelected ? 'game-tile-selected' : ''}`;

  return (
    <div
      className={className}
      onClick={onClick}
      draggable={true}
      onDragStart={(e) => console.log('onDragStart')}
      onDragEnd={(e) => console.log('onDragEnd')}
    >
      <span className="material-symbols-rounded">{iconName}</span>
    </div>
  );
}
