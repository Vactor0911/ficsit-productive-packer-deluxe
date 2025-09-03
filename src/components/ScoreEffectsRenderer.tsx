import { useAtomValue } from "jotai";
import { scoreEffectsAtom } from "../states";
import ScoreEffect from "./ScoreEffect";

const ScoreEffectsRenderer = () => {
  const scoreEffects = useAtomValue(scoreEffectsAtom);

  return (
    <>
      {scoreEffects.map((effect, index) => (
        <ScoreEffect
          key={`score-effect-${index}`}
          score={effect.score}
          x={effect.x}
          y={effect.y}
        />
      ))}
    </>
  );
};

export default ScoreEffectsRenderer;
