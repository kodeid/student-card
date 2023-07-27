export default function ScoreCard({ el, score }) {
  const generateClass = (score) => {
    if (score < 50) {
      return `#fed7aa`;
    } else if (score < 80) {
      return `#fdba74`;
    } else if (score < 90) {
      return `#fb923c`;
    }
    return `#f97316`;
  };
  const percentage = (scoreObj) => {
    return Math.round((scoreObj.studentScore / scoreObj.rubricScore) * 10000) / 100;
  };

  return (
    <div className="bg-white rounded-md shadow text-center overflow-hidden">
      <h2
        className={`text-xs font-bold px-1 py-4 text-white h-12 flex items-center justify-center`}
        style={{ backgroundColor: `${generateClass(percentage(score))}` }}
      >
        {el}
      </h2>
      <div className="p-2">
        <span className="font-bold text-xl block">{percentage(score)} %</span>
        <span className="text-xs opacity-50">
          <span className="hidden md:inline">avg.</span>
          {Math.round(score.studentScore * 100) / 100} / {Math.round(score.rubricScore * 100) / 100}
        </span>
      </div>
    </div>
  );
}
