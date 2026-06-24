import Link from "next/link";

type Props = {
  hasActiveMembership: boolean;
};

const membershipHref = "/membership";

export default function DashboardHero({ hasActiveMembership }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute -bottom-20 left-20 h-48 w-48 rounded-full bg-brand-300/10 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
          Qori ID
        </span>

        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90 md:text-3xl">
          Centro de tarjetas digitales
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Administra tus tarjetas digitales, revisa los diseños disponibles y
          activa tu membresía para empezar a usarlas.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {hasActiveMembership ? (
            <Link
              href="/cards"
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
            >
              Ir a mis tarjetas
            </Link>
          ) : (
            <Link
              href={membershipHref}
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
            >
              Activar membresía
            </Link>
          )}

          <Link
            href={membershipHref}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
          >
            Ver membresías
          </Link>
        </div>
      </div>
    </div>
  );
}