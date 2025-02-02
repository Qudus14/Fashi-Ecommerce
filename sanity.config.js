"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

// import { apiVersion, dataset, projectId } from "./sanity/env" //Removed as per instructions
import { schema } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"

export default defineConfig({
  basePath: "/studio",
  projectId: "6fcpa5u2",
  dataset: "production",
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2023-05-03" })],
})

