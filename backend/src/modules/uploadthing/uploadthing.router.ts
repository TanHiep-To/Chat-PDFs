import { Router } from "express";

import { createRouteHandler } from "uploadthing/express";
import { routeHandlerConfig, uploadRouter } from "../../config/uploadthing";

const router = Router();

router.use(
  "/upload",
  createRouteHandler({
    router: uploadRouter,
    config: routeHandlerConfig,
  })
);
