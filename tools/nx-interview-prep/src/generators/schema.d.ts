export interface NewProblemGeneratorSchema {
  name: string
  language: "react" | "typescript" | "web component"
  skipGh?: boolean
}
