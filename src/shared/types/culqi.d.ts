export {};

declare global {
    interface Window {
        Culqi?: {
            publicKey: string;
            settings: (settings: {
                title: string;
                currency: string;
                amount: number;
                description?: string;
            }) => void;
            options?: (options: {
                lang?: string;
                installments?: boolean;
                paymentMethods?: {
                    tarjeta?: boolean;
                    yape?: boolean;
                    bancaMovil?: boolean;
                    agente?: boolean;
                    billetera?: boolean;
                    cuotealo?: boolean;
                };
            }) => void;
            open: () => void;
            token?: {
                id: string;
                email?: string;
            };
            error?: {
                code?: string;
                message?: string;
            };
        };

        culqi?: () => void;
    }
}