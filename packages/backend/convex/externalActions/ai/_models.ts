import {google} from "@ai-sdk/google"

export const MODELS = {
    PAPER_SUMMARY: google("gemini-2.5-flash"),
    STUDY_SNAPSHOT: google("gemini-2.5-flash"),       
    SUGGESTED_QUERY: google("gemini-2.5-flash"),
    TRANSFORM_QUERY: google("gemini-2.5-flash"),
}