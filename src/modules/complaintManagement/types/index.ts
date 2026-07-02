// src/modules/complaintBook/types.ts

export type ComplaintEntryType = "claim" | "complaint";

export type DocumentType = "dni" | "ce" | "passport" | "ruc" | string;

export interface ComplaintBookPayload {
    entry_type: ComplaintEntryType;

    consumer_name: string;
    document_type: DocumentType;
    document_number: string;
    email: string;
    phone?: string | null;
    address?: string | null;

    is_minor?: boolean | null;
    representative_name?: string | null;
    representative_document_type?: DocumentType | null;
    representative_document_number?: string | null;
    representative_phone?: string | null;
    representative_email?: string | null;

    product_or_service: string;
    claimed_amount?: number | null;

    description: string;
    customer_request?: string | null;
}

export interface ComplaintBookEntry extends ComplaintBookPayload {
    uuid?: string;
    id?: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ComplaintBookResponse {
    success?: boolean;
    message?: string;
    data?: ComplaintBookEntry;
}