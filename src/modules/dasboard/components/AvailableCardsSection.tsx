// src/modules/dashboard/components/AvailableCardsSection.tsx

import type { Card } from "@/modules/cards/types";
import type { Organization } from "@/modules/organizations/types";
import AvailableCardItem from "./AvailableCardItem";

type Props = {
  cards: Card[];
  organizations: Organization[];
  organizationUuid: string;
  hasActiveMembership: boolean;
  loadingOrganizations?: boolean;
  onOrganizationChange: (organizationUuid: string) => void;
};

export default function AvailableCardsSection({
  cards,
  organizations,
  organizationUuid,
  hasActiveMembership,
  loadingOrganizations = false,
  onOrganizationChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Tarjetas de presentación
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Selecciona una organización para ver sus tarjetas creadas.
          </p>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {cards.length} tarjetas creadas
        </span>
      </div>

      <div className="mt-5 max-w-md">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Organización
        </label>

        <select
          value={organizationUuid}
          onChange={(event) => onOrganizationChange(event.target.value)}
          disabled={loadingOrganizations}
          className="
            h-11
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-brand-500
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-gray-700
            dark:bg-gray-900
            dark:text-white
          "
        >
          <option value="">
            {loadingOrganizations
              ? "Cargando organizaciones..."
              : "Selecciona una organización"}
          </option>

          {organizations.map((organization) => (
            <option key={organization.uuid} value={organization.uuid}>
              {organization.name}
            </option>
          ))}
        </select>
      </div>

      {!organizationUuid ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selecciona una organización para ver sus tarjetas.
          </p>
        </div>
      ) : cards.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Esta organización aún no tiene tarjetas creadas.
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