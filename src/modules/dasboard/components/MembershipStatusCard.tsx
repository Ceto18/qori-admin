import Link from "next/link";

import { CheckIcon, LockIcon } from "./icons/DashboardIcons";

type Props = {
  hasActiveMembership: boolean;
};

const membershipHref = "/membership";

export default function MembershipStatusCard({ hasActiveMembership }: Props) {
  return (
    <div
      className={`h-full rounded-2xl border p-6 ${
        hasActiveMembership
          ? "border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10"
          : "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          hasActiveMembership
            ? "bg-green-100 text-green-600 dark:bg-green-500/20"
            : "bg-amber-100 text-amber-600 dark:bg-amber-500/20"
        }`}
      >
        {hasActiveMembership ? <CheckIcon /> : <LockIcon className="h-6 w-6" />}
      </div>

      <h2 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        {hasActiveMembership ? "Membresía activa" : "Membresía requerida"}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {hasActiveMembership
          ? "Ya puedes crear, editar y usar tus tarjetas digitales sin restricciones."
          : "Para usar las tarjetas digitales debes activar una membresía. Puedes ver los diseños disponibles, pero estarán bloqueados hasta completar el pago."}
      </p>

      {!hasActiveMembership && (
        <Link
          href={membershipHref}
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900"
        >
          Desbloquear ahora
        </Link>
      )}
    </div>
  );
}