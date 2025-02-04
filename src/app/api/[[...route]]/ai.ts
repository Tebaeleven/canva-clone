import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { replicate } from "@/lib/replicate";

const app = new Hono().post(
  "/generate-image",
  zValidator("json", z.object({ prompt: z.string() })),
  async (c) => {
    console.log("generate-image");
    const { prompt } = c.req.valid("json");

    const model =
      "stability-ai/stable-diffusion-3";
    const input = {
      cfg: 3.5,
      steps: 28,
      prompt: prompt,
      aspect_ratio: "3:2",
      output_format: "webp",
      output_quality: 90,
      negative_prompt: "",
      prompt_strength: 0.85
    };

    //@ts-ignore
    const [output] = await replicate.run(model, { input });

    // console.log("URL:", output.url());

    return c.json({ data: output.url() });
  },
);

export default app;
