import { DashboardCard } from "../types";
import AvailableCardItem from "./AvailableCardItem";

type Props = {
  cards: DashboardCard[];
  hasActiveMembership: boolean;
};

export default function AvailableCardsSection({
  cards,
  hasActiveMembership,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Cards disponibles
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Estos son los tipos de tarjeta que podrás usar con tu membresía.
          </p>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {cards.length} diseños disponibles
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <AvailableCardItem
            key={card.id}
            card={card}
            hasActiveMembership={hasActiveMembership}
          />
        ))}
      </div>
    </div>
  );
}