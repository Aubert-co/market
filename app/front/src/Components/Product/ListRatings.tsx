type Props = {
  ratings: {
    _avg: {
      rating?: number;
    };
    _count: {
      rating: number;
    };
  };
};
export const ListRatings = ({ ratings }:Props) => {
  const average = ratings._avg.rating ?? 0;
  const total = ratings._count.rating;

  return (
    <div className="rating">
      <div>Média: {average.toFixed(1)} ⭐</div>
      <div>Total de avaliações: {total}</div>
    </div>
  );
};