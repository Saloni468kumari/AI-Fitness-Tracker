import { Context } from "koa";
import { analyzeImage } from "../services/gemini";

export default {
  async analyze(ctx: Context) {
    try {
      const file = ctx.request.files?.image as any;

      if (!file) {
        return ctx.badRequest("No image uploaded");
      }

      console.log("Uploaded file:", file);

      const filePath = file.filePath || file.path;

      if (!filePath) {
        return ctx.badRequest("Unable to locate uploaded image");
      }

      const result = await analyzeImage(filePath);

      return ctx.send({
        success: true,
        result,
      });
    } catch (error: any) {
      console.error("Analysis failed:", error);

      return ctx.internalServerError("Analysis failed", {
        error: error.message,
      });
    }
  },
};
