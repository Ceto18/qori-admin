import ResetPasswordForm from "@/modules/auth/components/ResetPasswordForm";


type PasswordResetPageProps = {
    params: Promise<{
        token: string;
    }>;

    searchParams: Promise<{
        email?: string;
    }>;
};

export default async function PasswordResetPage({
    params,
    searchParams,
}: PasswordResetPageProps) {
    const { token } = await params;
    const { email } = await searchParams;

    return (
        <ResetPasswordForm
            token={token}
            email={email ?? ""}
        />
    );
}