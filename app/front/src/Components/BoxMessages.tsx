export type TypeMessage = "warning" | "sucess" | "error"
export type TypeMessageParams = (params: { content: string; type: TypeMessage }) => void;