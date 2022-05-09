import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const NOTION_KEY = process.env.NOTION_KEY;

export const notion = new Client({ auth: NOTION_KEY });
