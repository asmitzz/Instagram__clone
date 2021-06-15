export type ServerError = {
    message:string;
}

export type Status = "idle" | "pending" | "succeeded" | "failed";