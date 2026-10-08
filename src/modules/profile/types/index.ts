export type UserProfile = {
    name: string;
    last_name: string;
    type_document: string;
    document: string;
    country_code: string;
    phone: string;
    address: string;
    district_id: number | null;
    province_id: number | null;
    department_id: number | null;
    country_id: number | null;
};

export type ProfileData = {
    uuid: string;
    email: string;
    email_verified_at: string | null;
    role: "user" | "admin" | "superadmin";
    profile: UserProfile;
};

export type ProfileResponse = {
    success: boolean;
    message: string;
    data: ProfileData;
};