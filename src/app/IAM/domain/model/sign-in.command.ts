export interface SignInCommand {
    email: string; // OJO: Tu swagger dice "email", no "username"
    password: string;
}