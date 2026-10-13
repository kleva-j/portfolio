import type {
  Arena as ArenaDocument,
  Author as AuthorDocument,
  Career as CareerDocument,
  Project as ProjectDocument,
} from "content-collections";

import {
  allProjects,
  allAuthors,
  allCareers,
  allArenas,
} from "content-collections";

export type Author = AuthorDocument["items"][number];
export type Project = ProjectDocument["items"][number];
export type ArenaShowcase = ArenaDocument["items"][number];
export type CareerItem = CareerDocument["items"][number];

function singletonItems<T extends { items: unknown[] }>(
  collection: T[],
  name: string,
): T["items"] {
  const [document] = collection;
  if (!document) {
    throw new Error(`Missing ${name} content collection document.`);
  }
  return document.items;
}

function byOrder<T extends { order: number }>(a: T, b: T) {
  return a.order - b.order;
}

export const authors = singletonItems(allAuthors, "authors").sort(byOrder);

export const projects = singletonItems(allProjects, "projects").sort(byOrder);

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.featuredOrder ?? a.order) - (b.featuredOrder ?? b.order));

export const arenaShowcases = singletonItems(allArenas, "arena")
  .filter((showcase) => showcase.status === "published")
  .sort(byOrder);

export const careerItems = singletonItems(allCareers, "career").sort(byOrder);

export const timelineCareerItems = careerItems.filter(
  (item) => item.showInTimeline,
);

export const aboutExperience = careerItems.filter((item) => item.showInAbout);
