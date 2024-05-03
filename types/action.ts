export interface ActionResponse {
    success: boolean;
    message?: string;
    data?: object;
    errors?: { [key: string]: any };
}