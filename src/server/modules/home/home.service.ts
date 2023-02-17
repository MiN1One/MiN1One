import { Injectable, Logger } from "@nestjs/common";
import { IHomeData } from "@shared/types/home.types";
import { readFile } from "fs/promises";

const resources: (keyof IHomeData)[] = [
  'contact',
  'links',
  'experience',
  'sections',
  'ui',
  'skills',
  'portfolio',
  'education',
  'urls',
  'general',
];

@Injectable()
export class HomeService {

  async getHomeData() {
    try {
      const resourcesMap = {};
      await Promise.all(
        resources.map(async (resource) => {
          const data = await readFile(`static/config/${resource}.json`);
          resourcesMap[resource] = JSON.parse(data.toString());
          return data;
        })
      );
      return resourcesMap;
    } catch (er) {
      Logger.error(er, 'HomeService:getHomeData');
      return {};
    }
  }
}