type IconProps = {
  className?: string;
};

export function LockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.75 1.75 0 0119 12.25v7A1.75 1.75 0 0117.25 21H6.75A1.75 1.75 0 015 19.25v-7a1.75 1.75 0 011.75-1.75z"
      />
    </svg>
  );
}

export function CheckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function CardIcon() {
  return (
    <svg
      className="h-6 w-6 text-brand-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 7A2.25 2.25 0 016 4.75h12A2.25 2.25 0 0120.25 7v10A2.25 2.25 0 0118 19.25H6A2.25 2.25 0 013.75 17V7z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 9.5h5.5M7.5 13h9M7.5 16h6"
      />
    </svg>
  );
}