// src/modules/dashboard/components/AvailableCardsSection.tsx

import type { Card } from "@/modules/cards/types";
import AvailableCardItem from "./AvailableCardItem";

type Props = {
  cards: Card[];
  organizationUuid: string;
  hasActiveMembership: boolean;
};

export default function AvailableCardsSection({
  cards,
  organizationUuid,
  hasActiveMembership,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Tarjetas de presentación
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Estas son las tarjetas creadas en tu organización.
          </p>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {cards.length} tarjetas creadas
        </span>
      </div>

      {cards.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aún no tienes tarjetas creadas.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <AvailableCardItem
              key={card.uuid}
              card={card}
              organizationUuid={organizationUuid}
              hasActiveMembership={hasActiveMembership}
            />
          ))}
        </div>
      )}
    </div>
  );
}