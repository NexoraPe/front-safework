export interface SignUpCommand {
    companyId: number; // Veo que tu swagger lo pide
    fullName: string;
    emailAddress: string;
    password: string;
    roles: string[];
}