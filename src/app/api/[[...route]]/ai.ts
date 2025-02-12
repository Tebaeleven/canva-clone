import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { replicate } from "@/lib/replicate";

const app = new Hono()
  .post(
    "/remove-bg",
    zValidator("json", z.object({ image: z.string() })),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image: image,
      };
      const output = await replicate.run(
        "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        {
          input: input,
        }
      );
      console.log(output);

      //@ts-ignore
      return c.json({ data: output.url() });
    },
  )
  .post(
    "/generate-image",
    zValidator("json", z.object({ prompt: z.string() })),
    async (c) => {
      console.log("generate-image");
      const { prompt } = c.req.valid("json");

      const model = "stability-ai/stable-diffusion-3";
      const input = {
        cfg: 3.5,
        steps: 28,
        prompt: prompt,
        aspect_ratio: "3:2",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      };

      //@ts-ignore
      const [output] = await replicate.run(model, { input });

      // console.log("URL:", output.url());

      return c.json({ data: output.url() });
    },
  );

export default app;
