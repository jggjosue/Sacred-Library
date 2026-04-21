'use server';
/**
 * @fileOverview A Genkit flow that generates insightful reflection prompts based on a daily verse.
 *
 * - generateReflectionPrompts - A function that handles the generation of reflection prompts.
 * - GenerateReflectionPromptsInput - The input type for the generateReflectionPrompts function.
 * - GenerateReflectionPromptsOutput - The return type for the generateReflectionPrompts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReflectionPromptsInputSchema = z.object({
  dailyVerse: z
    .string()
    .describe('The daily scripture or inspiring quote for which to generate reflection prompts.'),
});
export type GenerateReflectionPromptsInput = z.infer<typeof GenerateReflectionPromptsInputSchema>;

const GenerateReflectionPromptsOutputSchema = z.object({
  prompts: z.array(z.string()).describe('An array of thought-provoking reflection prompts.'),
});
export type GenerateReflectionPromptsOutput = z.infer<typeof GenerateReflectionPromptsOutputSchema>;

export async function generateReflectionPrompts(
  input: GenerateReflectionPromptsInput
): Promise<GenerateReflectionPromptsOutput> {
  return generateReflectionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reflectionPromptGenerator',
  input: { schema: GenerateReflectionPromptsInputSchema },
  output: { schema: GenerateReflectionPromptsOutputSchema },
  prompt: `You are a spiritual guide assistant specializing in generating insightful reflection prompts.

Based on the following daily verse, generate 3-5 thought-provoking reflection prompts or questions to guide a user in their journaling process.
Ensure the prompts encourage deep personal introspection and connection to the verse's themes.

Daily Verse: "{{{dailyVerse}}}"`,
});

const generateReflectionPromptsFlow = ai.defineFlow(
  {
    name: 'generateReflectionPromptsFlow',
    inputSchema: GenerateReflectionPromptsInputSchema,
    outputSchema: GenerateReflectionPromptsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate reflection prompts.');
    }
    return output;
  }
);
