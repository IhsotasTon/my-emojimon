import { useComponentValue } from '@latticexyz/react';
import { useMUD } from './MUDContext';
import { useEffect } from 'react';
import { useKeyboardMovement } from './useKeyboardMovement';
import { useMapConfig } from './useMapConfig';
import { twMerge } from 'tailwind-merge';
export const GameBoard = () => {
  const { width, height, terrainValues } = useMapConfig();
  const rows = new Array(height).fill(0).map((_, i) => i);
  const columns = new Array(width).fill(0).map((_, i) => i);

  const {
    playerEntity,
    components: { Position, Player },
    api: { joinGame },
  } = useMUD();
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        moveBy(0, -1);
      }
      if (e.key === 'ArrowDown') {
        moveBy(0, 1);
      }
      if (e.key === 'ArrowLeft') {
        moveBy(-1, 0);
      }
      if (e.key === 'ArrowRight') {
        moveBy(1, 0);
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);
  useKeyboardMovement();
  const playerPosition = useComponentValue(Position, playerEntity);
  const canJoinGame = useComponentValue(Player, playerEntity)?.value !== true;
  return (
    <div className="inline-grid p-2 bg-lime-500">
      {rows.map((y) =>
        columns.map((x) => {
          const terrain = terrainValues.find(
            (t) => t.x === x && t.y === y
          )?.type;

          return (
            <div
              key={`${x},${y}`}
              className={twMerge(
                'w-8 h-8 flex items-center justify-center',
                canJoinGame ? 'cursor-pointer hover:ring' : null
              )}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={(event) => {
                event.preventDefault();
                if (canJoinGame) {
                  joinGame(x, y);
                }
              }}
            >
              <div className="flex flex-wrap gap-1 items-center justify-center relative">
                {terrain ? (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">
                    {terrain.emoji}
                  </div>
                ) : null}
                <div className="relative">
                  {playerPosition?.x === x && playerPosition?.y === y ? (
                    <>🤠</>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
