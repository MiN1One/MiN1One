import { ProficiencyTypes, skillLevelToProficiencyMap } from "@shared/types/skill.types";

const MY_BIRTH_DATE = '06-02-2001';

export const calculateMyAge = (bd: string | Date = MY_BIRTH_DATE) => {
  const currentDateMs = (new Date()).getTime();
  const myBirthDateMs = (new Date(bd)).getTime();
  return Math.floor((currentDateMs - myBirthDateMs) / 1000 / 60 / 60 / 24 / 365);
};

export const matchSkillLevelToProficiency = (level: number): ProficiencyTypes => {
  if (level.toString() in skillLevelToProficiencyMap) {
    return skillLevelToProficiencyMap[level];
  }
  const matchingLevel = Object.keys(skillLevelToProficiencyMap)
    .sort((a, b) => +a - +b)
    .find(lvl => +lvl >= level);
  return skillLevelToProficiencyMap[matchingLevel];
};