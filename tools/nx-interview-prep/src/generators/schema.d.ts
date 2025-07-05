export interface NewProblemGeneratorSchema {
  name: string
  language: "react" | "typescript"
  skipGh?: boolean
}
