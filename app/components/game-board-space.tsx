export default function GameBoardSpace({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      className="board-space"
      onDragEnter={(e) => console.log('onDragEnter')}
      onDragLeave={(e) => console.log('onDragLeave')}
      onDragOver={(e) => {
        e.preventDefault();
        console.log('onDragOver');
      }}
      onDrop={(e) => console.log('onDrop')}
    >
      {children}
    </div>
  );
}
